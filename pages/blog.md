# Blog

Just my personal, poorly researched thoughts and opinions.

<ul>
${(mdPageDir "blog").files
    |> map (f: let cfg = getPageConfig f; in
      partials.card {
        link = getLink f;
        title = cfg.config.title;
        description = if cfg.config ? description then cfg.config.description else null;
      }
    )
    |> builtins.concatStringsSep ""}
</ul>
