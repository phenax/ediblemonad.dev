{ pkgs, ... }:
with pkgs.lib;
let
  html = contents: replaceString "\n" " " contents;
  templateInjections = {
    inherit
      mdPageDir
      getLink
      getPageConfig
      getPageContents
      ;
    partials = rec {
      inline-card =
        {
          contents,
          link ? null,
          linkText ? "see more",
        }:
        html ''
          <li class="inline-card">
            ${contents}
            ${
              if link == null then
                ""
              else
                ''
                  <div class="inline-card-footer">
                    <a href="${link}">
                      ${linkText}
                    </a>
                  </div>
                ''
            }
          </li>
        '';
      card =
        {
          title,
          link,
          description,
        }:
        html ''
          <li>
            <a href="${link}" class="card">
              <div class="card-title">${title}</div>
              ${
                if description == null || description == "" then
                  ""
                else
                  ''<div class="card-description">${description}</div>''
              }
            </a>
          </li>
        '';
      linkExternal =
        link: text: html ''<a href="${link}" target="_blank _parent" rel="noopener">${text}</a>'';
      commentEmbed = html ''
        <script src="https://utteranc.es/client.js" repo="phenax/ediblemonad.dev" issue-term="pathname" label="comment" theme="github-dark" crossorigin="anonymous" async></script>
      '';
      linkRss = link: text: ''
        <link rel="alternate" type="application/rss+xml" href="${link}" title="${text}" />
        <div style="text-align: right;">
          ${linkExternal link "RSS"}
        </div>
      '';
    };
  };
  getPageContents =
    inject: file:
    let
      renderedFile = evaluateTemplateFile inject file;
      html-out = pkgs.runCommandLocal "build-html" { } ''
        ${pkgs.pandoc}/bin/pandoc --from=gfm --to=html --shift-heading-level-by=1 ${renderedFile} -o "$out";
      '';
    in
    readFile html-out;
  getPageConfig =
    path:
    let
      nixFile = replaceString ".md" ".nix" path;
    in
    {
      inherit path;
      link = getLink path;
      config = if pathExists nixFile then import nixFile else null;
    };
  getLink = path: path |> replaceString "${./pages}" "" |> replaceString ".md" ".html";
  mdPageDir = dir: rec {
    type = "page";
    path = "${./pages}/${dir}";
    files = filesystem.listFilesRecursive path |> filter (strings.hasSuffix ".md") |> reverseList;
    after = if pathExists "${path}/+after.html" then "${path}/+after.html" else null;
    before = if pathExists "${path}/+before.html" then "${path}/+before.html" else null;
  };
  rssDir = dir: options: rec {
    type = "rss";
    path = "${./pages}/${dir}";
    files = filesystem.listFilesRecursive path |> filter (strings.hasSuffix ".md") |> reverseList;
    inherit options;
  };
  mdPage = path: "${./pages}/${path}";

  evalNixExpr = injections: expr: toFile "eval.nix" expr |> scopedImport injections;
  evaluateTemplate =
    inject: contents:
    "''${contents |> replaceStrings [ "''" "'''" ] [ "'''" "''''" ]}''"
    |> evalNixExpr (templateInjections // inject);
  evaluateTemplateFile =
    inject: file: readFile file |> evaluateTemplate inject |> pkgs.writeText "${file}";
in
{
  inherit mdPageDir mdPage rssDir;

  createPkg =
    {
      titlePrefix,
      pages,
      baseUrl ? "",
      template ? "template.html",
      header ? null,
      footer ? null,
      staticDir ? "static",
    }:
    let
      pageInjections = { inherit baseUrl; };

      buildPage =
        file: outfile: parent:
        let
          config = getPageConfig file;
          renderedFile = evaluateTemplateFile pageInjections file;
          hasBefore = parent ? before && !(parent.before == null);
          hasAfter = parent ? after && !(parent.after == null);
          afterFile = evaluateTemplateFile pageInjections parent.after;
          beforeFile = evaluateTemplateFile pageInjections parent.before;
        in
        ''
          pandoc \
            --shift-heading-level-by=-1 --standalone --from=gfm --to=html \
            -c /style.css --template '${./.}/${template}' \
            --title-prefix='${titlePrefix}' \
            ${if header == null then "" else "--include-before-body '${./.}/${header}'"} \
            ${if hasBefore then "--include-before-body '${beforeFile}'" else ""} \
            ${if hasAfter then "--include-after-body '${afterFile}'" else ""} \
            ${if footer == null then "" else "--include-after-body '${./.}/${footer}'"} \
            ${if config ? meta then "--include-in-header '${pkgs.writeText "" config.meta}'" else ""} \
            ${renderedFile} \
            -o "${outfile}";
        '';

      buildRss =
        dir: outfile:
        let
          varJson = dir.options // {
            items =
              dir.files
              |> map (
                file:
                let
                  contents = getPageContents pageInjections file;
                  heading = readFile file |> strings.splitString "\n" |> findFirst (hasPrefix "#") (baseNameOf file);
                  date = baseNameOf file |> match ".*([[:digit:]]{4}-[[:digit:]]{2}-[[:digit:]]{2})-.*";
                in
                {
                  id = getLink file;
                  title = heading;
                  link = "${baseUrl}${getLink file}";
                  date = if date != null then elemAt date 0 else null;
                  description = contents;
                }
              );
          };
          rssFileContents = pkgs.writeText "rss" ''
            <?xml version="1.0" encoding="utf-8" standalone="yes"?>
            <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
              <channel>
                <title>${varJson.title}</title>
                <link>${varJson.link}</link>
                ${if varJson ? description then "<description>${varJson.description}</description>" else ""}
                ${concatMapStrings (item: ''
                  <item>
                    <guid>${item.id}</guid>
                    <title>${item.title}</title>
                    <link>${item.link}</link>
                    <comments>${item.link}</comments>
                    ${if item ? date then "<pubDate>${item.date}</pubDate>" else ""}
                    <description>
                      <![CDATA[${item.description}]]>
                    </description>
                  </item>
                '') varJson.items}
              </channel>
            </rss>
          '';
        in
        ''
          cp ${rssFileContents} ${outfile};
        '';

      buildPageFiles = dir: outdir: ''
        mkdir -p ${outdir};
        ${concatMapStrings (
          file:
          buildPage file "${outdir}/${baseNameOf file |> replaceString ".md" ".html" |> removePrefix "/"}" dir
        ) dir.files}
      '';

      getBuildScript =
        pages:
        mapAttrs (
          name: file:
          if isString file then
            buildPage file "output/${name}" null
          else if file ? type && file.type == "rss" then
            buildRss file "output/${name}"
          else
            buildPageFiles file "output/${name}"
        ) pages
        |> attrValues
        |> concatStringsSep "\n";
    in
    pkgs.stdenv.mkDerivation {
      name = "ediblemonad-dev-site";
      version = "0.0.0";
      src = ./.;
      buildInputs = [ pkgs.pandoc ];
      buildPhase = ''
        mkdir -p output
        cp -r ${staticDir}/* output/
        ${getBuildScript pages}
      '';
      installPhase = ''
        mkdir -p $out
        cp -r output/* $out
      '';
    };
}
