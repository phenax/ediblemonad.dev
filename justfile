build:
  nix build -L;
  rm -rf build/;
  mkdir -p build/;
  cp --no-preserve=mode,ownership -r result/* -t build/

serve:
  npx serve -p 5000 ./build
