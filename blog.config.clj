{:output-dir "build"
 :pages-dir "pages"
 :static-dir "static"
 :title-prefix "Akshay"
 :headers ["header.html"]
 :template "template.html"
 :stylesheets ["/style.css"]
 :routes {:home {:output "index.html"}
          :projects {:type :articles :article-pages? false}
          :creative-coding {:type :articles}
          :coding4fun {:type :articles}
          :tools {:type :articles}
          :games {:type :articles}
          :hardware {:type :articles}
          :music {:type :articles}
          :random {:type :articles}
          :blog {:type :articles}}}

