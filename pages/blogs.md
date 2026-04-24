# List of blogs babey

${mdPageDir "blogs"
    |> map partials.card
    |> builtins.concatStringsSep ""}

ehy
