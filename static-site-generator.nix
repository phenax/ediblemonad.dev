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
    partials = {
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
        <script src="https://utteranc.es/client.js" repo="phenax/ediblemonad.dev" issue-term="pathname" label="comment" theme="github-dark" crossorigin="anonymous" async>
        </script>
      '';
    };
  };
  getPageContents =
    file:
    let
      renderedFile = evaluateTemplateFile { } file;
      html-out = pkgs.runCommandLocal "build-html" { } ''
        ${pkgs.pandoc}/bin/pandoc --from=gfm --to=html ${renderedFile} -o "$out";
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
  getLink = path: path |> replaceString "${./pages}" "" |> replaceString ".md" "";
  mdPageDir = dir: rec {
    path = "${./pages}/${dir}";
    files = filesystem.listFilesRecursive path |> filter (strings.hasSuffix ".md") |> reverseList;
    after = if pathExists "${path}/+after.html" then "${path}/+after.html" else null;
    before = if pathExists "${path}/+before.html" then "${path}/+before.html" else null;
  };
  mdPage = path: "${./pages}/${path}";

  evalNixExpr = injections: expr: toFile "eval.nix" expr |> scopedImport injections;
  # TODO: escape ''
  evaluateTemplate =
    inject: contents:
    "''${contents |> replaceStrings [ "''" "'''" ] [ "'''" "''''" ]}''"
    |> evalNixExpr (templateInjections // inject);
  evaluateTemplateFile =
    inject: file: readFile file |> evaluateTemplate inject |> pkgs.writeText "${file}";
in
{
  inherit mdPageDir mdPage;

  createPkg =
    {
      titlePrefix,
      pages,
      template ? "template.html",
      header ? null,
      footer ? null,
      staticDir ? "static",
    }:
    let
      buildPage =
        file: outfile: parent:
        let
          config = getPageConfig file;
          renderedFile = evaluateTemplateFile { } file;
          hasBefore = parent ? before && !(parent.before == null);
          hasAfter = parent ? after && !(parent.after == null);
          afterFile = evaluateTemplateFile { } parent.after;
          beforeFile = evaluateTemplateFile { } parent.before;
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

      buildPageFiles = dir: outdir: ''
        mkdir -p ${outdir};
        ${
          dir.files
          |> map (
            file:
            buildPage file "${outdir}/${baseNameOf file |> replaceString ".md" ".html" |> removePrefix "/"}" dir
          )
          |> concatStringsSep ""
        }
      '';

      getBuildScript =
        pages:
        mapAttrs (
          name: file:
          if isString file then buildPage file "output/${name}" null else buildPageFiles file "output/${name}"
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
