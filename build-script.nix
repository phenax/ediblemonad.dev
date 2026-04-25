{ pkgs, ... }:
with pkgs.lib;
let
  html = contents: replaceString "\n" "" contents;
  templateInjections = {
    inherit
      mdPageDir
      getLink
      getPageConfig
      getPageContents
      ;
    partials = {
      inline-card =
        { contents, link }:
        html ''
          <li class="inline-card">
            ${contents}
            <div class="inline-card-footer">
              <a href="${link}">
                Comment >>
              </a>
            </div>
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
              <span class="card-title">${title}</span>
              ${if isNull description then "" else ''<span class="card-description">${description}</span>''}
            </a>
          </li>
        '';
    };
  };
  getPageContents =
    file:
    let
      config = getPageConfig file;
      renderedFile = evaluateTemplateFile { } file;
      outfile = "/tmp/page-partial-out.html";
      html-out = pkgs.runCommand "build-html" { } ''
        ${pkgs.pandoc}/bin/pandoc \
          --from=gfm \
          --template '${./post-template.html}' \
          ${renderedFile} \
          -o "$out";
      '';
    in
    readFile html-out;
  getPageConfig =
    path:
    let
      nixFile = replaceString ".md" ".nix" path;
    in
    if pathExists nixFile then import nixFile else null;
  getLink = path: path |> replaceString "${./pages}" "" |> replaceString ".md" "";
  mdPageDir = dir: rec {
    path = "${./pages}/${dir}";
    files = filesystem.listFilesRecursive path |> filter (strings.hasSuffix ".md");
    after = if pathExists "${path}/+after.html" then "${path}/+after.html" else null;
    before = if pathExists "${path}/+before.html" then "${path}/+before.html" else null;
  };
  mdPage = path: "${./pages}/${path}";

  evalNixExpr = injections: expr: toFile "eval.nix" expr |> scopedImport injections;
  # TODO: escape ''
  evaluateTemplate =
    inject: contents: "''${contents}''" |> evalNixExpr (templateInjections // inject);
  evaluateTemplateFile =
    inject: file: readFile file |> evaluateTemplate inject |> pkgs.writeText "${file}";
in
{
  inherit mdPageDir mdPage;

  createPkg =
    {
      titlePrefix,
      pages,
      template,
      header,
      footer,
      stylesheet,
    }:
    let
      buildPage =
        file: outfile: parent:
        let
          config = getPageConfig file;
          renderedFile = evaluateTemplateFile { } file;
          hasBefore = parent ? before && !(isNull parent.before);
          hasAfter = parent ? after && !(isNull parent.after);
        in
        ''
          pandoc \
            --shift-heading-level-by=-1 --standalone --from=gfm \
            -c /style.css --template '${template}' \
            --title-prefix='${titlePrefix}' \
            --include-before-body '${header}' \
            ${if hasBefore then "--include-before-body '${parent.before}'" else ""} \
            ${if hasAfter then "--include-after-body '${parent.after}'" else ""} \
            --include-after-body '${footer}' \
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
        cp ${stylesheet} output/style.css
        ${getBuildScript pages}
      '';
      installPhase = ''
        mkdir -p $out
        cp -r output/* $out
      '';
    };
}
