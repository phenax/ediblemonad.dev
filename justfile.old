default: build

build:
  nix build -L;
  rm -rf .build/;
  mkdir -p .build/;
  cp --no-preserve=mode,ownership -r result/* -t .build/

serve:
  npx serve -p 5000 .build/

proj:
  #!/usr/bin/env sh
  set -eu
  title=$(bash -c 'read -e -p "title > " result; echo "$result"' | tail -n 1)
  lastnum="$(ls ./pages/projects/*.md | sed -E 's|.*/([0-9]+)-[^/]+.md$|\1|' | sort | tail -n1 | xargs -i echo "{} + 1" | bc | xargs -i printf "%03g" {})"
  postfile="./pages/projects/${lastnum}-$(echo "$title" | sed 's/[^A-Za-z0-9]/-/g' | tr '[A-Z]' '[a-z]').md"
  if ! [ -f "$postfile" ]; then
    echo "## $title" > "$postfile";
    echo -e '\n\n${partials.linkExternal "https://github.com/phenax/something" "Github"}' >> "$postfile";
  fi
  "$EDITOR" "$postfile";

post dir:
  #!/usr/bin/env sh
  set -eu
  title=$(bash -c 'read -e -p "title > " result; echo "$result"' | tail -n 1)
  postfile="./pages/{{dir}}/$(date +'%F')-$(echo "$title" | sed 's/[^A-Za-z0-9]/-/g' | tr '[A-Z]' '[a-z]').md"
  if ! [ -f "$postfile" ]; then
    echo "# $title" > "$postfile";
  fi
  "$EDITOR" "$postfile";

blog:
  #!/usr/bin/env sh
  set -eu
  title=$(bash -c 'read -e -p "title > " result; echo "$result"' | tail -n 1)
  path="./pages/blog/$(date +'%F')-$(echo "$title" | sed 's/[^A-Za-z0-9]/-/g' | tr '[A-Z]' '[a-z]')"
  postfile="${path}.md"
  nixfile="${path}.nix"
  if ! [ -f "$postfile" ]; then
    echo "# $title" > "$postfile";
  fi
  if ! [ -f "$nixfile" ]; then
    echo "{ title = \"$title\"; }" > "$nixfile";
  fi
  "$EDITOR" "$postfile";

publish: build
  #!/usr/bin/env sh
  set -eu
  ref=$(git rev-parse HEAD)
  builddir=$(readlink result)
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
