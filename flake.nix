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
            stylesheet = ./style.css;
            pages = {
              "index.html" = build.mdPage "home.md";
              "blog/index.html" = build.mdPage "blog.md";
              "blog" = build.mdPageDir "blog";
              "obsessions" = build.mdPage "obsessions.md";
              "hardware/index.html" = build.mdPage "hardware.md";
              "hardware" = build.mdPageDir "hardware";
            };
          };
        }
      );
    };
}
