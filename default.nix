with (import <nixpkgs> { });
mkShell {
  buildInputs = [
    nodejs_24
    nodePackages.pnpm
    nodePackages.typescript
    nodePackages.typescript-language-server
  ];
}
