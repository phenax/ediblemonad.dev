{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" ];
    in
    {
      packages = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          evalNixExpr = expr: expr |> builtins.toFile "eval.nix" |> import;
          buildTemplate =
            file: "''${builtins.readFile file}''" |> evalNixExpr |> pkgs.writeText "template-output";
        in
        {
          default = pkgs.stdenv.mkDerivation {
            pname = "ediblemonad-dev-site";
            version = "0.0.0";
            src = ./.;
            buildInputs = [ ];
            buildPhase = "
              mkdir -p output
              cp ${buildTemplate ./home.md} ./output/index.html
            ";
            installPhase = "
              mkdir -p $out
              cp -r output/* $out
            ";
          };
        }
      );
    };
}
