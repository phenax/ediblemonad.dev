# RSS

RSS feeds for the things I do here.

<%= (let [excluded [:projects]]
  (->> (load-file "blog.config.clj")
       :routes
       seq
       (filter #(= (:type (second %)) :articles))
       (filter (fn [[route _]] (nil? (some #{route} excluded))))
       (map #(-> % first name))
       (sort)
       (map #(str "- " (external-link (str "/" % ".xml") %)))
       (clojure.string/join "\n"))) %>
