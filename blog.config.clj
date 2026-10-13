{:output-dir "build"
 :pages-dir "pages"
 :static-dir "static"
 :title-prefix "Akshay"
 :headers ["pages/header.html"]
 :footers ["pages/footer.html"]
 :template "pages/template.html"
 :stylesheets ["/style.css"]
 :routes {:home {:output "index.html"}
          :rss {}
          :blog {:type :articles}
          :coding4fun {:type :articles}
          :creative-coding {:type :articles :article-slug #"^\d+-(.*)"}
          :games {:type :articles}
          :hardware {:type :articles}
          :music {:type :articles}
          :projects {:type :articles :article-pages? false}
          :random {:type :articles}
          :tools {:type :articles}}}

#_(comment desmos)
#_(comment whittling)
#_(comment hardware builds)
