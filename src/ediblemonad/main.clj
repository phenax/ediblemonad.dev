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

(defn get-link [route route-cfg & [subroute]]
  (cond
    (nil? route-cfg) "/"
    (= (:type route-cfg) :articles) (str "/" (name route) (if (nil? subroute) "" (str "/" (name subroute))))
    :else (if (nil? (:output route-cfg)) (name route) (:output route-cfg))))

(defn definition->pages-standalone [route route-cfg config]
  [{:output (or (:output route-cfg) (str route "/index.html"))
    :source (str (:pages-dir config) "/" route ".md")
    :route-cfg route-cfg}])

(defn definition->pages-indexed [route route-cfg config]
  (let [reserved-path? #(str/ends-with? % "+index.md")
        mkpage (fn [src out]
                 {:output out :source (str src) :route-cfg route-cfg})
        pages (->>
               (fs/glob (str (:pages-dir config) "/" route) "*.md")
               (remove reserved-path?)
               (map #(mkpage % (str route "/" (str/replace (fs/file-name %) #".md$" ".html")))))
        index-page (mkpage
                    (str (:pages-dir config) "/" route "/+index.md")
                    (str route "/index.html"))]
    (->> pages (concat [index-page]) (into []))))

(defn definition->pages [route route-cfg config]
  (cond
    (= :articles (:type route-cfg)) (definition->pages-indexed route route-cfg config)
    :else (definition->pages-standalone route route-cfg config)))

(defn config->pages [config]
  (->> (seq (:routes config))
       (map (fn [[route route-cfg]] (definition->pages (name route) route-cfg config)))
       flatten))

(def ->absolute-path #(str (fs/absolutize %)))

#_(if (nil? (:meta config)) "" ["--include-in-header" (:meta config)])
(defn exec-pandoc [inputfile outputfile {:keys [title-prefix template headers footers stylesheets]}]
  (println "Generating" outputfile "...")
  (let [multi-args (fn [arg vals] (flatten (map #(conj [arg] %) vals)))
        args (flatten ["--shift-heading-level-by=-1" "--standalone" "--from=gfm" "--to=html"
                       (if (nil? title-prefix) [] ["--title-prefix" title-prefix])
                       (multi-args "-c" stylesheets) (->> [template] (filter fs/exists?) (multi-args "--template"))
                       (->> (or headers []) (filter fs/exists?) (multi-args "--include-before-body"))
                       (->> (or footers []) (filter fs/exists?) (multi-args "--include-after-body"))
                       (str inputfile) "-o" (str outputfile)])
        {:keys [exit err]} (apply sh "pandoc" args)]
    (when (not (zero? exit))
      (println "Failed with exit code" exit ":" err)
      (System/exit exit))))

(def default-bindings {:link (fn [s & args]
                               (apply get-link s (get (:routes configuration) s) args))
                       :external-link (fn [href text]
                                        (str "<a href=\"" href "\" target=\"_blank _parent\" rel=\"noopener\">" text "</a>"))})

(defn template-file [inputfile outputfile]
  (->> (slurp inputfile)
       (#(comb/eval % default-bindings))
       (spit outputfile)))

(defn gen-page [page config tmp-dir]
  (let [outpath (str (:output-dir config) "/" (:output page))
        templatepath (str (fs/create-temp-file {:dir tmp-dir}))]
    (fs/create-dirs (fs/parent outpath))
    (template-file (:source page) templatepath)
    (exec-pandoc templatepath outpath config)))

(defn -main []
  (let [pages (config->pages configuration)]
    (fs/delete-tree (:output-dir configuration))
    (fs/copy-tree (:static-dir configuration) (:output-dir configuration))
    #_{:clj-kondo/ignore [:invalid-arity]}
    (fs/with-temp-dir [tmp-dir {}]
      (run! #(gen-page % configuration tmp-dir) pages))))

