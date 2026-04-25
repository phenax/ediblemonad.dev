# Blog

Just my personal, poorly researched thoughts and opinions.

<ul>
${(mdPageDir "blog").files
    |> map (f: let cfg = getPageConfig f; in
      partials.card {
        link = getLink f;
        title = cfg.title;
        description = if cfg ? description then cfg.description else null;
      }
    )
    |> builtins.concatStringsSep ""}
</ul>
