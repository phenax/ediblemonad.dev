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
          ssg = import ./static-site-generator.nix { inherit pkgs; };
        in
        {
          default = ssg.createPkg {
            titlePrefix = "ediblemonad";
            header = "header.html";
            pages = {
              "index.html" = ssg.mdPage "home.md";
              "projects.html" = ssg.mdPage "projects.md";
              "blog/index.html" = ssg.mdPage "blog.md";
              "blog" = ssg.mdPageDir "blog";
              "trash" = ssg.mdPage "trash.md";
              "hardware/index.html" = ssg.mdPage "hardware.md";
              "hardware" = ssg.mdPageDir "hardware";
            };
          };
        }
      );
    };
}
