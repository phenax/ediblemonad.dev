with (import <nixpkgs> { });
mkShell {
  buildInputs = [
    nodejs-18_x
    nodePackages.pnpm
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];
}
