# Hardware

I like electronics although the number of burned ICs during my first few years with it would suggest otherwise.

<ul>
  ${(mdPageDir "hardware").files
      |> map (f: partials.inline-card { contents = getPageContents f; })
      |> builtins.concatStringsSep ""}
</ul>
