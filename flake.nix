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
                title = "Akshay likes hardware and embedded systems";
                link = "https://ediblemonad.dev/hardware";
              };

              "tools/index.html" = ssg.mdPage "tools.md";
              "tools" = ssg.mdPageDir "tools";
              "tools.xml" = ssg.rssDir "tools" {
                title = "Akshay likes simple tools";
                link = "https://ediblemonad.dev/tools";
              };

              "creative-coding/index.html" = ssg.mdPage "creative-coding.md";
              "creative-coding" = ssg.mdPageDir "creative-coding";
              "creative-coding.xml" = ssg.rssDir "creative-coding" {
                title = "Akshay likes creative-coding";
                link = "https://ediblemonad.dev/creative-coding";
              };

              "games/index.html" = ssg.mdPage "games.md";
              "games" = ssg.mdPageDir "games";
              "games.xml" = ssg.rssDir "games" {
                title = "Akshay likes video games";
                link = "https://ediblemonad.dev/games";
              };

              "music/index.html" = ssg.mdPage "music.md";
              "music" = ssg.mdPageDir "music";
              "music.xml" = ssg.rssDir "music" {
                title = "Akshay likes music";
                link = "https://ediblemonad.dev/music";
              };
            };
          };
        }
      );
    };
}
