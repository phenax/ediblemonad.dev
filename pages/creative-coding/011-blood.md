# Blood <%= (if embedded? (embedded-article-link page "(collection)") "(collection)") %>

<% (when embedded? %>
  <div class="img-table">
    <div><h4>Coral</h4><%= (video "/cc/blood/blood.BloodProgram.coral.mp4") %></div>
    <div><h4>Mitosis</h4><%= (video "/cc/blood/blood.BloodProgram.mitosis.mp4") %></div>
  </div>
<% ) %>

<% (when (not embedded?) %>
  <div class="img-table">
    <div><h4>Coral</h4><%= (video "/cc/blood/blood.BloodProgram.coral.mp4") %></div>
    <div><h4>Mitosis</h4><%= (video "/cc/blood/blood.BloodProgram.mitosis.mp4") %></div>
    <div><h4>Waves</h4><%= (video "/cc/blood/blood.BloodProgram.waves.mp4") %></div>
    <div><h4>Rangoli</h4><%= (video "/cc/blood/blood.BloodProgram.pulseSettled1.mp4") %></div>
    <div><h4>Worms</h4><%= (video "/cc/blood/blood.BloodProgram.worms.mp4") %></div>
    <div><h4>Popping bubbles</h4><%= (video "/cc/blood/blood.BloodProgram.bubbles.mp4") %></div>
    <div><h4>Cross</h4><%= (video "/cc/blood/blood.BloodProgram.pulseSettled2.mp4") %></div>
    <div><h4>Holes</h4><%= (video "/cc/blood/blood.BloodProgram.holey.mp4") %></div>
    <div><h4>Explosions</h4><%= (video "/cc/blood/blood.BloodProgram.explosions.mp4") %></div>
  </div>
<% ) %>

<%= (external-link "https://git.ediblemonad.dev/art-playground-openrndr/tree/src/main/kotlin/blood/BloodProgram.kt" "code") %>
