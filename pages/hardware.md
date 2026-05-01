# Hardware & embedded

${partials.linkRss "${baseUrl}/hardware.xml" "Akshay's hardware and embedded posts"}

<ul>
  ${(mdPageDir "hardware").files
      |> map (f: partials.inline-card {
          contents = getPageContents {} f;
          link = getLink f;
          linkText = "Comment >>";
        })
      |> builtins.concatStringsSep ""}
</ul>
