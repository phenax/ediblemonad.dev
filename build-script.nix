{ pkgs, ... }:
with pkgs.lib;
let
  templateInjections = {
    inherit mdPageDir getLink;
    foobar = 123;
    partials = {
      card = f: ''<a href="${getLink f}" class="card"><div>Blog ${getLink f}</div></a>'';
    };
  };
  getLink = path: path |> replaceString "${./pages}" "" |> replaceString ".md" ".html";
  evalNixExpr = expr: toFile "eval.nix" expr |> scopedImport templateInjections;
  mdPageDir =
    dir: filesystem.listFilesRecursive "${./pages}/${dir}" |> filter (strings.hasSuffix ".md");
  mdPage = path: "${./pages}/${path}";
  evaluateTemplate = file: "''${readFile file}''" |> evalNixExpr |> pkgs.writeText "${file}";
  buildPage = file: outfile: ''
    pandoc \
      --shift-heading-level-by=-1 --standalone --from=gfm \
      -c /style.css --template ${./template.html} \
      --include-after-body ./footer.html \
      --from markdown --to html \
      ${evaluateTemplate file} \
      -o "${outfile}";
  '';
  buildPageFiles = files: outdir: ''
    mkdir -p output/${outdir};
    ${
      files
      |> map (file: buildPage file "output/${outdir}${baseNameOf file |> replaceString ".md" ".html"}")
      |> concatStringsSep ""
    }
  '';
  getBuildScript =
    templates:
    mapAttrs (
      name: files: if isList files then buildPageFiles files name else buildPage files "output/${name}"
    ) templates
    |> attrValues
    |> concatStringsSep "\n";
in
{
  inherit mdPageDir mdPage;

  createPkg =
    { name, templates }:
    pkgs.stdenv.mkDerivation {
      pname = name;
      version = "0.0.0";
      src = ./.;
      buildInputs = [ pkgs.pandoc ];
      buildPhase = ''
        mkdir -p output
        cp ./style.css output/
        ${getBuildScript templates}
      '';
      installPhase = ''
        mkdir -p $out
        cp -r output/* $out
      '';
    };
}
