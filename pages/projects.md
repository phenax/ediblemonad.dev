# Projects

Some fun things I've made

<ul>
  ${(mdPageDir "projects").files
      |> map (f: partials.inline-card { contents = getPageContents {} f; })
      |> builtins.concatStringsSep ""}
</ul>
