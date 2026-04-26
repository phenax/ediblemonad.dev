default: build

build:
  nix build -L;
  rm -rf .build/;
  mkdir -p .build/;
  cp --no-preserve=mode,ownership -r result/* -t .build/

serve:
  npx serve -p 5000 .build/

post dir:
  #!/usr/bin/env sh
  set -eu
  title=$(bash -c 'read -e -p "title > " result; echo "$result"' | tail -n 1)
  path="./pages/{{dir}}/$(date +'%F')-$(echo "$title" | sed 's/[^A-Za-z0-9]/-/g' | tr '[A-Z]' '[a-z]').md"
  if ! [ -f "$postfile" ]; then
    echo "## $title" > "$postfile";
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
    echo "## $title" > "$postfile";
  fi
  if ! [ -f "$nixfile" ]; then
    echo "{ title = \"$title\"; }" > "$nixfile";
  fi
  "$EDITOR" "$postfile";
