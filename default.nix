with (import <nixpkgs> { });
mkShell {
  buildInputs = [
    nodejs_23
    nodePackages.pnpm
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];
}
