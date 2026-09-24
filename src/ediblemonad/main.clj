(ns ediblemonad.main
  (:require
   [babashka.fs :as fs]
   [clojure.string :as str]
   [comb.template :as comb]
   [clojure.java.shell :refer [sh]]
   [clojure.java.io :as io]
   [clojure.set :as set]))

(defn definition->pages-standalone [route route-cfg config]
  [{:output (str (or (:route route-cfg) (name route)) "/index.html")
    :source (str (:source config) "/" (name route) ".md")
    :route-cfg route-cfg}])

(defn definition->pages-indexed [route route-cfg config]
  (let [reserved-path? #(str/ends-with? % "+index.md")
        mkpage (fn [src out]
                 {:output out :source src :route-cfg route-cfg})
        pages (->>
               (fs/glob (str (:source config) "/" (name route)) "*.md")
               (remove reserved-path?)
               (map #(mkpage % (str route "/" (str/replace (fs/file-name %) #".md$" ".html")))))
        index-page [(mkpage
                     (str (:source config) "/" (name route) "/+index.md")
                     (str (name route) "/index.html"))]]
    (->> pages
         (concat index-page)
         (into []))))

(defn definition->pages [route route-cfg config]
  (cond
    (= :pages (:type route-cfg)) (definition->pages-indexed route route-cfg config)
    :else (definition->pages-standalone route route-cfg config)))

(defn config->pages [config]
  (->> (seq (:routes config))
       (map (fn [[route route-cfg]] (definition->pages route route-cfg config)))
       flatten))

(defn gen-page [page config]
  (let [outpath (str (:output config) "/" (:output page))]
    (fs/create-dirs (fs/parent outpath))
    (fs/copy (:source page) outpath)))

(def configuration {:output "/home/imsohexy/dump/ediblemonad-out"
                    :source "pages"
                    :routes {:blog {:type :pages}
                             :games {:type :pages}
                             :home {:out ""}}})

(defn -main []
  (let [pages (config->pages configuration)]
    (println pages)
    (run! #(gen-page % configuration) pages)))

