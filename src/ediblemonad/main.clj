(ns ediblemonad.main
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [ediblemonad.template]
   [ediblemonad.types :refer [mk-page mk-route-config mk-configuration]]
   [clojure.java.shell :refer [sh]])
  (:import [ediblemonad.types RouteConfig Configuration Page]))

(def reserved-path? #(str/ends-with? % "+index.md"))

(defn route->pages-standalone [^String route ^RouteConfig route-cfg ^Configuration config]
  [(ediblemonad.template/load-page-template config
                                            (mk-page {:output (or (:output route-cfg) (str route "/index.html"))
                                                      :source (str (:pages-dir config) "/" route ".md")
                                                      :route route
                                                      :route-cfg route-cfg}))])

(defn route->pages-articles [^String route ^RouteConfig route-cfg ^Configuration config]
  (let [{:keys [pages-dir]} config
        page-for (fn [src out]
                   (let [source-path (str src)
                         source-name (str/replace (fs/file-name source-path) #".md$" "")
                         date (re-find #"\d{4}-\d{2}-\d{2}" source-name)]
                     (mk-page {:output (str out) :source source-path :source-name source-name
                               :date date :route-cfg route-cfg :route route})))
        existing #(when (fs/exists? %) %)
        layouts {:before (some->> (str pages-dir "/" route "/+before.html") existing)
                 :after (some->> (str pages-dir "/" route "/+after.html") existing)}
        articles (->>
                  (fs/glob (str pages-dir "/" route) "*.md")
                  (remove reserved-path?)
                  (map #(page-for % (str route "/" (str/replace (fs/file-name %) #".md$" ".html"))))
                  (map #(merge % {:layouts layouts}))
                  (map #(ediblemonad.template/load-page-template config %)))
        index-page (->>
                    (page-for (str pages-dir "/" route "/+index.md") (str route "/index.html"))
                    (#(merge % {:articles articles}))
                    (ediblemonad.template/load-page-template config))
        pages (if (:article-pages? route-cfg) (concat [index-page] articles) [index-page])]
    (into [] pages)))

(defn route->pages [^String route ^RouteConfig route-cfg ^Configuration config]
  (cond
    (= :articles (:type route-cfg)) (route->pages-articles route route-cfg config)
    :else (route->pages-standalone route route-cfg config)))

(defn config->pages [^Configuration config]
  (->> (seq (:routes config))
       (map (fn [[route route-cfg]] (route->pages (name route) (mk-route-config route-cfg) config)))
       flatten))

(defn exec-pandoc [^String inputfile ^String outputfile ^Configuration {:keys [title-prefix template headers footers stylesheets metadata]}]
  (println "Generating" outputfile "...")
  (let [mkargs (fn [arg vals] (->> (remove nil? vals) (map #(conj [arg] %)) flatten))
        args (flatten ["--shift-heading-level-by=-1" "--standalone" "--from=gfm" "--to=html"
                       (mkargs "--title-prefix" [title-prefix])
                       (mkargs "--css" stylesheets)
                       (mkargs "--template" [template])
                       (mkargs "--include-before-body" (or headers []))
                       (mkargs "--include-after-body" (or footers []))
                       (mkargs "--metadata" (map (fn [[k v]] (str (name k) ":" v)) metadata))
                       (str inputfile) "--output" (str outputfile)])
        {:keys [exit err]} (apply sh "pandoc" args)]
    (when (not (zero? exit))
      (println "Failed with exit code" exit ":" err)
      (System/exit exit))))

(defn gen-page [^Page page ^Configuration config ^String tmp-dir]
  (let [outpath (str (:output-dir config) "/" (:output page))
        templatepath (str (fs/create-temp-file {:dir tmp-dir}))
        before-template (str (fs/create-temp-file {:dir tmp-dir}))
        after-template (str (fs/create-temp-file {:dir tmp-dir}))
        layouts (:layouts page)]
    (fs/create-dirs (fs/parent outpath))
    (spit templatepath (:content page))
    (some->> layouts :before (#(ediblemonad.template/eval-template-file % config {})) :content (spit before-template))
    (some->> layouts :after (#(ediblemonad.template/eval-template-file % config {})) :content (spit after-template))
    (exec-pandoc templatepath outpath
                 (merge config {:headers (concat (:headers config) [before-template])
                                :footers (concat [after-template] (:footers config))
                                :metadata @(:meta page)}))))

(defn gen-site [^Configuration config]
  (let [pages (config->pages config)]
    (fs/delete-tree (:output-dir config))
    (fs/copy-tree (:static-dir config) (:output-dir config))
    #_{:clj-kondo/ignore [:invalid-arity]}
    (fs/with-temp-dir [tmp-dir {}]
      (run! #(gen-page % config tmp-dir) pages))))

(defn -main []
  (->> (load-file "blog.config.clj") mk-configuration gen-site))
