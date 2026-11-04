# Flow <%= (if embedded? (embedded-article-link page "(collection)") "(collection)") %>

<% (when embedded? %>
  <div class="img-table">
    <div><h4>Flames</h4><%= (image "/cc/flow/flow.FlowProgram.flames.png" "Flames") %></div>
    <div><h4>Gentle</h4><%= (image "/cc/flow/flow.FlowProgram.gentle.png" "Gentle") %></div>
  </div>
<% ) %>

<% (when (not embedded?) %>
  <div class="img-table">
    <div><h4>Flames</h4><%= (image "/cc/flow/flow.FlowProgram.flames.png" "Flames") %></div>
    <div><h4>Gentle</h4><%= (image "/cc/flow/flow.FlowProgram.gentle.png" "Gentle") %></div>
    <div><h4>Now and then</h4><%= (image "/cc/flow/flow.FlowProgram.nowandthen.png" "Now and then") %></div>
    <div><h4>Stuck in beetween</h4><%= (image "/cc/flow/flow.FlowProgram.stuckinbetween.png" "Stuck in between") %></div>
    <div><h4>Fibers</h4><%= (image "/cc/flow/flow.FlowProgram.flow.png" "Fibers") %></div>
    <div><h4>Doorway</h4><%= (image "/cc/flow/flow.FlowProgram.hollow.png" "Doorway") %></div>
  </div>
<% ) %>

<%= (external-link "https://git.ediblemonad.dev/art-playground-openrndr/tree/src/main/kotlin/flow/FlowProgram.kt" "code") %>

<% (when (not embedded?) %>
All about the flo, bro
<% ) %>
