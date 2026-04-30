# Creative coding

<ul>
  ${(mdPageDir "creative-coding").files
      |> map (f: partials.inline-card {
          contents = getPageContents f;
          link = getLink f;
          linkText = "Comment >>";
        })
      |> builtins.concatStringsSep ""}
</ul>
