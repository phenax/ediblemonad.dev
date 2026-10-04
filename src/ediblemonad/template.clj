(ns ediblemonad.template
  (:require
   [clojure.string :as str]
   [ediblemonad.types]
   [comb.template :as comb])
  (:import [ediblemonad.types RouteConfig Configuration Page]))

(defn get-page-link [^RouteConfig route-cfg route & [subroute]]
  (cond
    (nil? route-cfg) "/"
    (= (:type route-cfg) :articles) (str "/" (name route)
                                         (if (nil? subroute) "" (str "/" (if (symbol? subroute) (name subroute) subroute))))
    :else (if (nil? (:output route-cfg)) (name route) (str "/" (str/replace (:output route-cfg) #"/?index[.]html$" "")))))

(def attrs->html #(reduce-kv (fn [acc key val] (str acc " " (name key) "=\"" val "\"")) "" %))

(defn elem [tag attrs & children]
  (str "<" (name tag) (attrs->html attrs) ">" (str/join "\n" children) "</" (name tag) ">"))

(defn make-link [href text & [attrs]] (elem :a (merge (or attrs {}) {:href href}) text))

(defn gen-rss-xml [page]
  (let [meta @(:meta page)
        title (:title meta)
        description (:description meta)
        link (str "https://ediblemonad.dev/" (name (:route page)))
        article-link #(str link "/" (:source-name %))
        article-title (fn [article] (or (:title @(:meta article)) (:source-name article)))]
    (str
     "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>\n"
     (elem :rss {:version "2.0" :xmlns:atom "http://www.w3.org/2005/Atom"}
           (elem :channel {}
                 (elem :title {} title)
                 (elem :link {} link)
                 (if description (elem :description {} description) "")
                 (->> (:articles page)
                      (map (fn [article]
                             (elem :article {}
                                   (elem :guid {} (:source-name article))
                                   (elem :title {} (article-title article))
                                   (elem :link {} (article-link article))
                                   (elem :comments {} (article-link article))
                                   (if (:date article) (elem :pubDate {} (:date article)) "")
                                   (elem :description {}
                                         (str "<![CDATA[" (:content article) "]]>")))))
                      (str/join "\n")))))))

(defn external-link [href text] (make-link href text {:target "_blank _parent" :rel "noopener"}))

(defn default-bindings [^Configuration config ^hash-map context]
  {:get-link (fn [s & args]
               (apply get-page-link (get (:routes config) s) s args))
   :link (fn [route text & [attrs]]
           (let [href (get-page-link (get (:routes config) (if (list? route) (first route) route)) route)]
             (make-link href text attrs)))
   :external-link external-link
   :meta (fn
           ([meta] (swap! (:meta context) (fn [m] (merge m meta))) @(:meta context))
           ([] @(:meta context)))
   :image (fn [src title & [attrs]]
            (elem :div {:class "image-container"}
                  (elem :img (merge attrs {:src src :alt title}))))
   :audio (fn [src & [attrs]]
            (elem :div {:class "image-container"}
                  (elem :audio (merge attrs {:src src :controls true}))))
   :video (fn [src & [attrs]]
            (elem :div {:class "image-container"}
                  (elem :video (merge attrs {:src src :controls true :autoplay "autoplay" :muted "true" :loop "loop"}))))
   :inline-article-card (fn [{:keys [open-text]} ^Page {:keys [route route-cfg source-name content date]}]
                          (let [href (get-page-link route-cfg route source-name)]
                            (elem :li {:class "inline-card"}
                                  "\n\n" content "\n\n" (elem :div {:class "post-date"} date)
                                  (elem :div {:class "inline-card-footer text-sm"}
                                        (when (:article-pages? route-cfg)
                                          (make-link href (or open-text "leave a comment") {}))))))
   :link-article-card (fn [_opts ^Page {:keys [meta route output route-cfg source-name date]}]
                        (let [{:keys [title description]} @meta
                              href (get-page-link route-cfg route source-name)]
                          (elem :li {}
                                (elem :a {:href href :class "card"}
                                      (elem :div {:class "card-title"} (or title output))
                                      (if (not-empty description)
                                        (elem :div {:class "card-description"} description)
                                        "")
                                      (if (not-empty date)
                                        (elem :span {:class "card-date"} date)
                                        "")))))
   :show-articles (fn [page render-item & [{:keys [hide-rss-link & opts]}]]
                    (let [title "RSS stuff"
                          link (str "https://ediblemonad.dev/" (name (:route page)) ".xml")]
                      (str
                       (elem :link {:rel "alternate" :type "application/rss+xml" :href link :title title})
                       (if hide-rss-link ""
                           (elem :div {:style "text-align: right;"} (external-link link "RSS")))
                       (apply elem :ul {:class "card-container"}
                              (map #(render-item opts %) (:articles page))))))
   :breadcrumbs (fn [{:keys [route route-cfg source-name index?]}]
                  (let [home-link (make-link "/" "home")
                        separator (elem :span {} "/")
                        route-link (make-link (get-page-link route-cfg route) (name route))
                        current-mark (elem :span {} (if index? (name route) (or source-name ".")))
                        wrap (fn [& args] (apply elem :div {:class "centered-content breadcrumbs"} args))]
                    (cond
                      (= :home route) ""
                      index? (wrap home-link separator current-mark)
                      :else (wrap home-link separator route-link separator current-mark))))
   :comment-section (fn []
                      (elem :div {:id "comment"}
                            (elem :script {:src "https://giscus.app/client.js"
                                           :data-repo "phenax/ediblemonad.dev"
                                           :data-repo-id "MDEwOlJlcG9zaXRvcnk3NTY4OTA5MQ=="
                                           :data-category "Announcements"
                                           :data-category-id "DIC_kwDOBILsg84C84jX"
                                           :data-mapping "pathname"
                                           :data-strict "0"
                                           :data-reactions-enabled "1"
                                           :data-emit-metadata "0"
                                           :data-input-position "bottom"
                                           :data-theme "dark"
                                           :data-lang "en"
                                           :crossorigin "anonymous"
                                           :async "async"})))})

(defn eval-template-string [^String contents ^Configuration config & [^hash-map extra-bindings]]
  (let [meta (or (:meta (or extra-bindings {})) (atom {}))
        context {:meta meta}
        bindings (merge (default-bindings config context) extra-bindings {:ctx context})
        result (comb/eval contents bindings)]
    {:content result :meta meta}))

(defn eval-template-file [^String file ^Configuration config & [^hash-map extra-bindings]]
  (let [contents (slurp file)]
    (eval-template-string contents config extra-bindings)))

(defn load-page-template [^Configuration config ^Page page & [^hash-map extra-bindings]]
  (let [bindings (merge (or extra-bindings {}) {:articles (:articles page) :page page})
        {:keys [content meta]} (eval-template-file (:source page) config bindings)]
    (merge page {:content content :meta meta})))

