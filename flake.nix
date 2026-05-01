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
      packages = forEachSystem (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
          ssg = import ./static-site-generator.nix { inherit pkgs; };
        in
        {
          default = ssg.createPkg {
            titlePrefix = "ediblemonad";
            header = "header.html";
            baseUrl = "https://ediblemonad.dev";
            pages = {
              "index.html" = ssg.mdPage "home.md";
              "projects.html" = ssg.mdPage "projects.md";
              "trash.html" = ssg.mdPage "trash.md";
              "blog/index.html" = ssg.mdPage "blog.md";
              "blog" = ssg.mdPageDir "blog";
              "blog.xml" = ssg.rssDir "blog" {
                title = "Akshay's blog";
                link = "https://ediblemonad.dev/blog";
              };
              "hardware/index.html" = ssg.mdPage "hardware.md";
              "hardware" = ssg.mdPageDir "hardware";
              "hardware.xml" = ssg.rssDir "hardware" {
                title = "Akshay's hardware and embedded posts";
                link = "https://ediblemonad.dev/hardware";
              };
              "creative-coding/index.html" = ssg.mdPage "creative-coding.md";
              "creative-coding" = ssg.mdPageDir "creative-coding";
              "creative-coding.xml" = ssg.rssDir "creative-coding" {
                title = "Akshay's creative-coding posts";
                link = "https://ediblemonad.dev/creative-coding";
              };
            };
          };
        }
      );
    };
}
