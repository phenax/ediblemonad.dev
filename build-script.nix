{ pkgs, ... }:
with pkgs.lib;
let
  templateInjections = {
    inherit mdPageDir getLink getPageConfig;
    partials = {
      card =
        {
          title,
          link,
          description,
        }:
        ''
          <div>
            <a href="${link}" class="card">
              <span class="card-title">${title}</span>
              ${if isNull description then "" else ''<span class="card-description">${description}</span>''}
            </a>
          </div>
        ''
        |> replaceString "\n" "";
    };
  };
  getPageConfig = path: path |> replaceString ".md" ".nix" |> import;
  getLink = path: path |> replaceString "${./pages}" "" |> replaceString ".md" "";
  evalNixExpr = expr: toFile "eval.nix" expr |> scopedImport templateInjections;
  mdPageDir =
    dir: filesystem.listFilesRecursive "${./pages}/${dir}" |> filter (strings.hasSuffix ".md");
  mdPage = path: "${./pages}/${path}";
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
    }:
    let
      evaluateTemplate = file: "''${readFile file}''" |> evalNixExpr |> pkgs.writeText "${file}";
      buildPage = file: outfile: ''
        pandoc \
          --shift-heading-level-by=-1 --standalone --from=gfm \
          -c /style.css --template ${template} \
          --title-prefix="${titlePrefix}" \
          --include-before-body ${header} \
          --include-after-body ${footer} \
          --from markdown --to html \
          ${evaluateTemplate file} \
          -o "${outfile}";
      '';
      buildPageFiles = files: outdir: ''
        mkdir -p ${outdir};
        ${
          files
          |> map (file: buildPage file "${outdir}${baseNameOf file |> replaceString ".md" ".html"}")
          |> concatStringsSep ""
        }
      '';
      getBuildScript =
        pages:
        mapAttrs (
          name: files:
          if isList files then buildPageFiles files "output/${name}" else buildPage files "output/${name}"
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
        cp ./style.css output/
        ${getBuildScript pages}
      '';
      installPhase = ''
        mkdir -p $out
        cp -r output/* $out
      '';
    };
}
