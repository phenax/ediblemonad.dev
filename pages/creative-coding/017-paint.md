# Paint <%= (if embedded? (embedded-article-link page "(collection)") "(collection)") %>

<% (when embedded? %>
<div class="img-table">
  <%= (image "/cc/paint/paint.p3.webp" "Paint p3") %>
  <%= (image "/cc/paint/paint.p2.webp" "Paint p2") %>
  <%= (image "/cc/paint/paint.p1.webp" "Paint p1") %>
  <%= (image "/cc/paint/paint.p9.webp" "Paint p9") %>
</div>
<% ) %>

<% (when (not embedded?) %>
Pour some paint on it

<div class="img-table">
  <%= (image "/cc/paint/paint.p1.webp" "Paint p1") %>
  <%= (image "/cc/paint/paint.p3.webp" "Paint p3") %>
  <%= (image "/cc/paint/paint.p5.webp" "Paint p5") %>
  <%= (image "/cc/paint/paint.p2.webp" "Paint p2") %>
  <%= (image "/cc/paint/paint.p6.webp" "Paint p6") %>
  <%= (image "/cc/paint/paint.p9.webp" "Paint p9") %>
  <%= (image "/cc/paint/paint.p8.webp" "Paint p8") %>
  <%= (image "/cc/paint/paint.p7.webp" "Paint p7") %>
</div>

<br />

---

### Process

<details>
  <summary>Show process recordings</summary>
  <div class="img-table">
    <%= (video "/cc/paint/paint.p1.mp4") %>
    <%= (video "/cc/paint/paint.p2.mp4") %>
  </div>
</details>

<br />
<% ) %>

<%= (external-link "https://git.ediblemonad.dev/art-playground-love/tree/art/paint" "code") %>
