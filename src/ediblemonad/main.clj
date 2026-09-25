(ns ediblemonad.main
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [ediblemonad.template]
   [clojure.java.shell :refer [sh]]))

(def configuration {:output-dir "/tmp/ediblemonad-out"
                    :pages-dir "pages"
                    :static-dir "static"
                    :title-prefix "Akshay"
                    :headers ["header.html"]
                    :template "template.html"
                    :stylesheets ["/style.css"]
                    :routes {:home {:output "index.html"}
                             :coding4fun {:type :articles}
                             :blog {:type :articles}}})

(def reserved-path? #(str/ends-with? % "+index.md"))

(defn definition->pages-standalone [route route-cfg config]
  [(ediblemonad.template/load-page-template config {:output (or (:output route-cfg) (str route "/index.html"))
                                                    :source (str (:pages-dir config) "/" route ".md")
                                                    :source-name ""
                                                    :route route
                                                    :route-cfg route-cfg
                                                    :articles []
                                                    :layouts {}})])

(defn definition->pages-articles [route route-cfg config]
  (let [{:keys [pages-dir]} config
        mkpage (fn [src out]
                 (let [source-path (str src)
                       source-name (str/replace (fs/file-name source-path) #".md$" "")
                       date (re-find #"\d{4}-\d{2}-\d{2}" source-name)]
                   {:output (str out) :source source-path :source-name source-name
                    :date date :route-cfg route-cfg :route route :articles [] :layouts {}}))
        existing #(when (fs/exists? %) %)
        article-layouts {:before (existing (str pages-dir "/" route "/+before.html"))
                         :after (existing (str pages-dir "/" route "/+after.html"))}
        articles (->>
                  (fs/glob (str pages-dir "/" route) "*.md")
                  (remove reserved-path?)
                  (map #(mkpage % (str route "/" (str/replace (fs/file-name %) #".md$" ".html"))))
                  (map #(merge % {:layouts article-layouts}))
                  (map #(ediblemonad.template/load-page-template config %)))
        index-page (->>
                    (mkpage (str pages-dir "/" route "/+index.md") (str route "/index.html"))
                    (#(merge % {:articles articles}))
                    (ediblemonad.template/load-page-template config))]
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
        layouts (:layouts page)]
    (fs/create-dirs (fs/parent outpath))
    (spit templatepath (:content page))
    (exec-pandoc templatepath outpath (merge config {:headers (concat (:headers config) [(:before layouts)])
                                                     :footers (concat [(:after layouts)] (:footers config))
                                                     :metadata @(:meta page)}))))

(defn -main []
  (let [pages (config->pages configuration)]
    (fs/delete-tree (:output-dir configuration))
    (fs/copy-tree (:static-dir configuration) (:output-dir configuration))
    #_{:clj-kondo/ignore [:invalid-arity]}
    (fs/with-temp-dir [tmp-dir {}]
      (run! #(gen-page % configuration tmp-dir) pages))))
