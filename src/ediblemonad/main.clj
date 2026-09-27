(ns ediblemonad.main
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [ediblemonad.template]
   [ediblemonad.types :refer [mk-page mk-route-config mk-configuration]]
   [clojure.java.shell :refer [sh]])
  (:import [ediblemonad.types RouteConfig Configuration Page]))

(def reserved-path? #(str/ends-with? % "+index.md"))

(defn route->pages-standalone [^symbol route ^RouteConfig route-cfg ^Configuration config]
  [(ediblemonad.template/load-page-template config
                                            (mk-page {:output (or (:output route-cfg) (str (name route) "/index.html"))
                                                      :source (str (:pages-dir config) "/" (name route) ".md")
                                                      :route route
                                                      :route-cfg route-cfg}))])

(defn route->pages-articles [^symbol route ^RouteConfig route-cfg ^Configuration config]
  (let [{:keys [pages-dir]} config
        route-name (name route)
        page-for (fn [src out]
                   (let [source-path (str src)
                         source-name (str/replace (fs/file-name source-path) #".md$" "")
                         date (re-find #"\d{4}-\d{2}-\d{2}" source-name)]
                     (mk-page {:output (str out) :source source-path :source-name source-name
                               :date date :route-cfg route-cfg :route route})))
        existing #(when (fs/exists? %) %)
        layouts {:before (some->> (str pages-dir "/" route-name "/+before.html") existing)
                 :after (some->> (str pages-dir "/" route-name "/+after.html") existing)}
        articles (->>
                  (fs/glob (str pages-dir "/" route-name) "*.md")
                  (remove reserved-path?)
                  (sort #(compare %2 %1))
                  (map #(page-for % (str route-name "/" (str/replace (fs/file-name %) #".md$" ".html"))))
                  (map #(merge % {:layouts layouts}))
                  (map #(ediblemonad.template/load-page-template config %)))
        index-page (->>
                    (page-for (str pages-dir "/" route-name "/+index.md") (str route-name "/index.html"))
                    (#(merge % {:articles articles :index? true}))
                    (ediblemonad.template/load-page-template config))
        pages (if (:article-pages? route-cfg) (concat [index-page] articles) [index-page])]
    (into [] pages)))

(defn route->pages [^symbol route ^RouteConfig route-cfg ^Configuration config]
  (cond
    (= :articles (:type route-cfg)) (route->pages-articles route route-cfg config)
    :else (route->pages-standalone route route-cfg config)))

(defn config->pages [^Configuration config]
  (->> (seq (:routes config))
       (map (fn [[route route-cfg]] (route->pages route (mk-route-config route-cfg) config)))
       flatten))

(defn exec-pandoc [^String inputfile ^String outputfile ^Configuration {:keys [title-prefix template headers footers stylesheets metadata]} & [{:keys [shift-heading-level-by]}]]
  (println "Generating" outputfile "...")
  (let [mkargs (fn [arg vals] (->> (remove nil? vals) (map #(conj [arg] %)) flatten))
        args (flatten ["--from=gfm" "--to=html" "--standalone"
                       (str "--shift-heading-level-by=" (or shift-heading-level-by 0))
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
        rssoutpath (str (:output-dir config) "/" (name (:route page)) ".xml")
        templatepath (str (fs/create-temp-file {:dir tmp-dir}))
        before-template (str (fs/create-temp-file {:dir tmp-dir}))
        after-template (str (fs/create-temp-file {:dir tmp-dir}))
        eval-layout #(ediblemonad.template/eval-template-file % config {:page page})
        shift-heading-level-by (if (:index? page) 1 -1)]
    (fs/create-dirs (fs/parent outpath))
    (spit templatepath (:content page))
    (some->> page :layouts :before eval-layout :content (spit before-template))
    (some->> page :layouts :after eval-layout :content (spit after-template))
    (when (:index? page)
      (->> (ediblemonad.template/gen-rss-xml page) (spit rssoutpath)))
    (exec-pandoc templatepath outpath
                 (merge config {:headers (concat (:headers config) [before-template])
                                :footers (concat [after-template] (:footers config))
                                :metadata @(:meta page)})
                 {:shift-heading-level-by shift-heading-level-by})))

(defn gen-site [^Configuration config]
  (let [pages (config->pages config)]
    (fs/delete-tree (:output-dir config))
    (fs/copy-tree (:static-dir config) (:output-dir config))
    #_{:clj-kondo/ignore [:invalid-arity]}
    (fs/with-temp-dir [tmp-dir {}]
      (run! #(gen-page % config tmp-dir) pages))))

(defn -main []
  (->> (load-file "blog.config.clj") mk-configuration gen-site))
