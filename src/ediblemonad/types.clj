(ns ediblemonad.types)

(defrecord Page [output source source-name route route-cfg articles layouts content date meta index?])

(defn mk-page [map]
  (map->Page (merge {:layouts {} :articles [] :source-name "" :meta (atom {}) :index? false} map)))

#_(comment (RouteConfig. :type articles :article-pages? ?bool) | (RouteConfig :type :page :output String))
(defrecord RouteConfig [type article-pages? output])

(defn mk-route-config [map]
  (map->RouteConfig (merge {:type :page :article-pages? true} map)))

(defrecord Configuration [output-dir pages-dir static-dir title-prefix headers footers template stylesheets routes])

(defn mk-configuration [map]
  (map->Configuration (merge {:output-dir "build" :title-prefix "Web" :footers [] :headers [] :stylesheets []} map)))

