{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      forEachSystem = nixpkgs.lib.genAttrs [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
    in
    {
      devShell = forEachSystem (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
        in
        pkgs.mkShell {
          buildInputs = with pkgs; [
            openjdk
            clojure
            clojure-lsp
            clj-kondo
            bbin
            babashka
            pandoc
          ];
        }
      );
    };
}
