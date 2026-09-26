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

(defn make-elem [tag attrs & children]
  (str "<" (name tag) (attrs->html attrs) ">" (str/join "\n" children) "</" (name tag) ">"))

(defn make-link [href text & [attrs]] (make-elem :a (merge (or attrs {}) {:href href}) text))

(defn default-bindings [^Configuration config]
  {:get-link (fn [s & args]
               (apply get-page-link (get (:routes config) s) s args))
   :link (fn [route text attrs]
           (let [href (get-page-link (get (:routes config) (if (list? route) (first route) route)) route)]
             (make-link href text attrs)))
   :external-link (fn [href text] (make-link href text {:target "_blank _parent" :rel "noopener"}))
   :meta (fn [ctx meta] (swap! (:meta ctx) (fn [m] (merge m meta))))
   :inline-article-card (fn [_opts ^Page {:keys [route route-cfg source-name content date]}]
                          (let [href (get-page-link route-cfg route source-name)]
                            (make-elem :li {:class "inline-card"}
                                       "\n\n" content "\n\n" date
                                       (make-elem :div {:class "inline-card-footer"}
                                                  (when (:article-pages? route-cfg) (make-link href "read more" {}))))))
   :link-article-card (fn [_opts ^Page {:keys [meta route output route-cfg source-name date]}]
                        (let [{:keys [title description]} @meta
                              href (get-page-link route-cfg route source-name)]
                          (make-elem :li {}
                                     (make-elem :a {:href href :class "card"}
                                                (make-elem :div {:class "card-title"} (or title output))
                                                (if (not-empty description)
                                                  (make-elem :div {:class "card-description"} description)
                                                  "")
                                                (if (not-empty date)
                                                  (make-elem :span {:class "card-date"} date)
                                                  "")))))
   :show-articles (fn [articles render-item & [{:keys [_rss & opts]}]]
                    (str
                     "(TODO: rss)\n\n"
                     (apply make-elem :ul {:class "card-container"}
                            (map #(render-item opts %) articles))))
   :comment-section (fn []
                      (make-elem :div {:id "comment"}
                                 (make-elem :script {:src "https://giscus.app/client.js"
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
        bindings (merge (default-bindings config) extra-bindings {:ctx {:meta meta}})
        result (comb/eval contents bindings)]
    {:content result :meta meta}))

(defn eval-template-file [^String file ^Configuration config & [^hash-map extra-bindings]]
  (let [contents (slurp file)]
    (eval-template-string contents config extra-bindings)))

(defn load-page-template [^Configuration config ^Page page & [^hash-map extra-bindings]]
  (let [bindings (merge (or extra-bindings {}) {:articles (:articles page)})
        {:keys [content meta]} (eval-template-file (:source page) config bindings)]
    (merge page {:content content :meta meta})))

