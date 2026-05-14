# Blog

${partials.linkRss "${baseUrl}/blog.xml" "Akshay's blog"}

<ul class="card-container">
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
