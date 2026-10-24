# Blood

<%= (video "/cc/blood/blood.BloodProgram.coral.mp4") %>

<% (when embedded? %>
  <div style="text-align: right;">
    <a href="<%= (str "/" (name (:route page)) "/" (:slug page)) %>">There's more...</a>
  </div>
<% ) %>

<% (when (not embedded?) %>
  <%= (video "/cc/blood/blood.BloodProgram.mitosis.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.waves.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.pulseSettled1.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.worms.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.bubbles.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.pulseSettled2.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.holey.mp4") %>
  <%= (video "/cc/blood/blood.BloodProgram.explosions.mp4") %>
<% ) %>

<%= (external-link "https://git.ediblemonad.dev/art-playground-openrndr/tree/src/main/kotlin/blood/BloodProgram.kt" "code") %>
