(ns ediblemonad.template
  (:require
   [clojure.string :as str]
   [comb.template :as comb]))

(defn get-page-link [route-cfg route & [subroute]]
  (cond
    (nil? route-cfg) "/"
    (= (:type route-cfg) :articles) (str "/" (name route)
                                         (if (nil? subroute) "" (str "/" (if (symbol? subroute) (name subroute) subroute))))
    :else (if (nil? (:output route-cfg)) (name route) (str "/" (str/replace (:output route-cfg) #"/?index[.]html$" "")))))

(def attrs->html #(reduce-kv (fn [acc key val] (str acc " " (name key) "=\"" val "\"")) "" %))

(defn make-elem [tag attrs & children]
  (str "<" (name tag) (attrs->html attrs) ">" (str/join "\n" children) "</" (name tag) ">"))

(defn make-link [href text & [attrs]] (make-elem :a (merge (or attrs {}) {:href href}) text))

(defn default-bindings [config]
  {:get-link (fn [s & args]
               (apply get-page-link (get (:routes config) s) s args))
   :link (fn [route text attrs]
           (let [href (get-page-link (get (:routes config) (if (list? route) (first route) route)) route)]
             (make-link href text attrs)))
   :external-link (fn [href text] (make-link href text {:target "_blank _parent" :rel "noopener"}))
   :meta (fn [ctx meta] (swap! (:meta ctx) (fn [m] (merge m meta))))
   :inline-article-card (fn [{:keys [route route-cfg source-name content date]}]
                          (let [href (get-page-link route-cfg route source-name)]
                            (make-elem :li {:class "inline-card"}
                                       "\n\n" content "\n\n" date
                                       (make-elem :div {:class "inline-card-footer"}
                                                  (make-link href "read more" {})))))
   :link-article-card (fn [{:keys [meta route output route-cfg source-name date]}]
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
   :show-articles (fn [articles render-item]
                    (str
                     "(TODO: rss)\n\n"
                     (apply make-elem :ul {:class "card-container"}
                            (map render-item articles))))})

(defn load-page-template [config page]
  (let [meta (atom {})
        extra-bindings {:ctx {:meta meta}
                        :articles (:articles page)}]
    (->> (slurp (:source page))
         (#(comb/eval % (merge (default-bindings config) extra-bindings)))
         (#(merge page {:content % :meta meta})))))
