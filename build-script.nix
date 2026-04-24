{ pkgs, ... }:
with pkgs.lib;
let
  evalNixExpr = expr: builtins.toFile "eval.nix" expr |> import;
  mdPages = dir: filesystem.listFilesRecursive dir |> filter (strings.hasSuffix ".md");
  evaluateTemplate = file: "''${builtins.readFile file}''" |> evalNixExpr |> pkgs.writeText "${file}";
  getBuildTemplateScript = file: outfile: ''
    pandoc \
      --shift-heading-level-by=-1 --standalone --from=gfm \
      -c ./style.css \
      ${evaluateTemplate file} \
      -o ${outfile};
  '';
  getBuildScript =
    templates:
    builtins.mapAttrs (
      name: files:
      if builtins.isList files then
        ''
          mkdir -p output/${name};
          ${
            builtins.map (
              file: getBuildTemplateScript file "output/${name}${baseNameOf file |> replaceString ".md" ".html"}"
            ) files
            |> concatStringsSep ""
          }
        ''
      else
        getBuildTemplateScript files "output/${name}"
    ) templates
    |> builtins.attrValues
    |> concatStringsSep "\n";
in
{
  inherit mdPages;

  createPkg = { name, templates }: pkgs.stdenv.mkDerivation {
    pname = name;
    version = "0.0.0";
    src = ./.;
    buildInputs = [ pkgs.pandoc ];
    buildPhase = ''
      mkdir -p output
      ${getBuildScript templates}
    '';
    installPhase = ''
      mkdir -p $out
      cp -r output/* $out
    '';
  };
}
