# Constraints <%= (if embedded? (embedded-article-link page "(collection)") "(collection)") %>

<% (when embedded? %>
<div class="img-table">
  <%= (image "/cc/constraints/constraints.p3.webp" "Constraints p3") %>
  <%= (image "/cc/constraints/constraints.p2.webp" "Constraints p2") %>
  <%= (image "/cc/constraints/constraints.p6.webp" "Constraints p6") %>
  <%= (image "/cc/constraints/constraints.p5.webp" "Constraints p5") %>
</div>
<% ) %>

<% (when (not embedded?) %>
My hands are tied as I hit a brick wall and get stuck between a rock and a hard place

<div class="img-table">
  <%= (image "/cc/constraints/constraints.p1.webp" "Constraints p1") %>
  <%= (image "/cc/constraints/constraints.p2.webp" "Constraints p2") %>
  <%= (image "/cc/constraints/constraints.p3.webp" "Constraints p3") %>
  <%= (image "/cc/constraints/constraints.p4.webp" "Constraints p4") %>
  <%= (image "/cc/constraints/constraints.p5.webp" "Constraints p5") %>
  <%= (image "/cc/constraints/constraints.p6.webp" "Constraints p6") %>
  <%= (image "/cc/constraints/constraints.p7.webp" "Constraints p7") %>
  <%= (image "/cc/constraints/constraints.p8.webp" "Constraints p8") %>
</div>
<% ) %>

<%= (external-link "https://git.ediblemonad.dev/art-playground-love/tree/art/constraints" "code") %>
