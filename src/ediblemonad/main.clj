(ns ediblemonad.main
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [comb.template :as comb]
   [clojure.java.shell :refer [sh]]))

(def configuration {:output-dir "/tmp/ediblemonad-out"
                    :pages-dir "pages"
                    :static-dir "static"
                    :title-prefix "Akshay"
                    :headers ["header.html"]
                    :template "template.html"
                    :stylesheets ["/style.css"]
                    :routes {:home {:output "index.html"}
                             :blog {:type :articles}
                             :games {:type :articles}}})

(defn get-page-link [route-cfg route & [subroute]]
  (cond
    (nil? route-cfg) "/"
    (= (:type route-cfg) :articles) (str "/" (name route) (if (nil? subroute) "" (str "/" (if (symbol? subroute) (name subroute) subroute))))
    :else (if (nil? (:output route-cfg)) (name route) (str "/" (str/replace (:output route-cfg) #"/?index[.]html$" "")))))

(def reserved-path? #(str/ends-with? % "+index.md"))

(def attrs->html #(reduce-kv (fn [acc key val] (str acc " " (name key) "=\"" val "\"")) "" %))

(defn make-elem [tag attrs & children]
  (str "<" (name tag) (attrs->html attrs) ">" (str/join "\n" children) "</" (name tag) ">"))

(defn make-link [href text & [attrs]] (make-elem :a (merge (or attrs {}) {:href href}) text))

(defn default-bindings [_config]
  {:get-link (fn [s & args]
               (apply get-page-link (get (:routes configuration) s) s args))
   :link (fn [route text attrs]
           (let [href (get-page-link (get (:routes configuration) (if (list? route) (first route) route)) route)]
             (make-link href text attrs)))
   :external-link (fn [href text] (make-link href text {:target "_blank _parent" :rel "noopener"}))
   :meta (fn [ctx meta] (swap! (:meta ctx) (fn [m] (merge m meta))))
   :inline-article-card (fn [article]
                          (make-elem :li {:class "inline-card"}
                                     (str article)
                                     "(TODO: date)"
                                     (make-link "" "read more")))
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

(defn load-template [config page]
  (let [meta (atom {})
        extra-bindings {:ctx {:meta meta}
                        :articles (:articles page)}]
    (->> (slurp (:source page))
         (#(comb/eval % (merge (default-bindings config) extra-bindings)))
         (#(merge page {:content % :meta meta})))))

(defn definition->pages-standalone [route route-cfg config]
  [(load-template config {:output (or (:output route-cfg) (str route "/index.html"))
                          :source (str (:pages-dir config) "/" route ".md")
                          :source-name ""
                          :route route
                          :route-cfg route-cfg
                          :articles []})])

(defn definition->pages-articles [route route-cfg config]
  (let [{:keys [pages-dir]} config
        mkpage (fn [src out]
                 (let [source-path (str src)
                       source-name (str/replace (fs/file-name source-path) #".md$" "")
                       date (re-find #"\d{4}-\d{2}-\d{2}" source-name)]
                   {:output (str out) :source source-path :source-name source-name
                    :date date :route-cfg route-cfg :route route :articles []}))
        articles (->>
                  (fs/glob (str pages-dir "/" route) "*.md")
                  (remove reserved-path?)
                  (map #(mkpage % (str route "/" (str/replace (fs/file-name %) #".md$" ".html"))))
                  (map #(load-template config %)))
        index-page (->>
                    (mkpage (str pages-dir "/" route "/+index.md") (str route "/index.html"))
                    (#(merge % {:articles articles}))
                    (load-template config))]
    (->> articles (concat [index-page]) (into []))))

(defn definition->pages [route route-cfg config]
  (cond
    (= :articles (:type route-cfg)) (definition->pages-articles route route-cfg config)
    :else (definition->pages-standalone route route-cfg config)))

(defn config->pages [config]
  (->> (seq (:routes config))
       (map (fn [[route route-cfg]] (definition->pages (name route) route-cfg config)))
       flatten))

(defn exec-pandoc [inputfile outputfile {:keys [title-prefix template headers footers stylesheets metadata]}]
  (println "Generating" outputfile "...")
  (let [multi-args (fn [arg vals] (flatten (map #(conj [arg] %) vals)))
        args (flatten ["--shift-heading-level-by=-1" "--standalone" "--from=gfm" "--to=html"
                       (if (nil? title-prefix) [] ["--title-prefix" title-prefix])
                       (multi-args "-c" stylesheets) (->> [template] (filter fs/exists?) (multi-args "--template"))
                       (->> (or headers []) (filter fs/exists?) (multi-args "--include-before-body"))
                       (->> (or footers []) (filter fs/exists?) (multi-args "--include-after-body"))
                       (multi-args "-M" (map (fn [[k v]] (str (name k) ":" v)) metadata))
                       (str inputfile) "-o" (str outputfile)])
        {:keys [exit err]} (apply sh "pandoc" args)]
    (when (not (zero? exit))
      (println "Failed with exit code" exit ":" err)
      (System/exit exit))))

(defn gen-page [page config tmp-dir]
  (let [outpath (str (:output-dir config) "/" (:output page))
        templatepath (str (fs/create-temp-file {:dir tmp-dir}))
        sourcebasepath (fs/parent (:source page))
        index? (and (= (:route-cfg (:type page)) :articles) (str/ends-with? (:source page) "+index.md"))
        before (if index? [] [(str sourcebasepath "/+before.html")])
        after (if index? [] [(str sourcebasepath "/+after.html")])]
    (fs/create-dirs (fs/parent outpath))
    (spit templatepath (:content page))
    (exec-pandoc templatepath outpath (merge config {:headers (concat (:headers config) [before])
                                                     :footers (concat (:footers config) [after])
                                                     :metadata @(:meta page)}))))

(defn -main []
  (let [pages (config->pages configuration)]
    (fs/delete-tree (:output-dir configuration))
    (fs/copy-tree (:static-dir configuration) (:output-dir configuration))
    #_{:clj-kondo/ignore [:invalid-arity]}
    (fs/with-temp-dir [tmp-dir {}]
      (run! #(gen-page % configuration tmp-dir) pages))))

