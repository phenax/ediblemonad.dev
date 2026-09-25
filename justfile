build:
  bb r

serve:
  npx serve -p 5000 ./build

publish: build
  #!/usr/bin/env sh
  set -eu
  ref=$(git rev-parse HEAD)
  builddir="./build/"
  if ! (git rev-parse --verify gh-pages); then
    git worktree add --orphan gh-pages
  else
    git worktree add gh-pages
  fi
  trap 'git worktree remove gh-pages' EXIT
  cd gh-pages
  cp --no-preserve=mode,ownership -r $builddir/* .
  echo "$ref: $(date)" > .ref
  git add -A
  git commit -m "Update gh-pages from $ref"
  git push -f -u origin gh-pages

