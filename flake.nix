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
          pkgs = import nixpkgs { inherit system; };
          build = import ./build-script.nix { inherit pkgs; };
          templates = {
            "index.html" = ./pages/home.md;
            "blogs/index.html" = ./pages/blogs.md;
            "blogs/" = build.mdPages ./pages/blogs;
          };
        in
        {
          default = build.createPkg {
            name = "ediblemonad-dev-site";
            inherit templates;
          };
        }
      );
    };
}
