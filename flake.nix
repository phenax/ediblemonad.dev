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
        in
        {
          default = build.createPkg {
            titlePrefix = "ediblemonad";
            header = ./header.html;
            footer = ./footer.html;
            template = ./template.html;
            pages = {
              "index.html" = build.mdPage "home.md";
              "blogs/index.html" = build.mdPage "blogs.md";
              "blogs/" = build.mdPageDir "blogs";
            };
          };
        }
      );
    };
}
