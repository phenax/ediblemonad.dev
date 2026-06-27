# Kakoune: snippets

Kakoune doesn't have built-in support for snippets. You can use plugins like ${partials.linkExternal "https://github.com/occivink/kakoune-snippets" "occivink/kakoune-snippets"} to have that in the editor but you could also have a much simpler setup for snippets with a few lines of scripting.

My first iteration of snippets was just to use commands and prompt for input like so:

```sh
declare-option -hidden str-list snippets_list

define-command snippets-insert %{
  prompt -menu 'Snippets: ' \
    -shell-script-candidates 'echo "$kak_opt_snippet_list"' \
    %{ evaluate-commands %val{text} }
}
define-command define-snippet -params 2 %{
  set-option -add %arg{1} snippets_list %sh{ echo -e "$2\n" }
}
```

```sh
hook global BufSetOption filetype=(?:ruby) %{
  define-snippet buffer snip-rails-class
}

define-command snip-rails-class %{
  eval %sh{
    class_name=$(basename "$kak_bufname" .rb | sed -e 's/[^A-Za-z0-9]\(\w\)/\U\1/g' -e 's/^\w/\U\0/g')
    echo "set-register c $class_name"
  }
  execute-keys '<esc>,i# frozen_string_literal: true<ret><ret>'
  execute-keys 'class <c-r>c<ret>'
  execute-keys 'end'
}
```

Here, it parses the ruby class name from the file name to generate the snippet but this could also just be a `prompt` command instead.

This worked okay but it was pretty hard to maintain. Would be much easier if the snippets themselves were easier to create and read.
So, that eventually evolved into this:

```sh
declare-option str snippets_dir "%val{config}/snippets"

define-command snippets-insert -docstring 'Snippets' %{
  prompt -menu "Snippets: " -init "%opt{filetype}/" \
    -shell-script-candidates %{ fd --type file --base-directory "$kak_opt_snippets_dir" } \
     %{
      evaluate-commands %sh{
        case "$kak_text" in
          *.snip.kak) cat "$kak_opt_snippets_dir/$kak_text" ;;
          *) echo "insert-text-snippet %{$kak_text}" ;;
        esac
      }
    }
}

define-command -hidden insert-text-snippet -params 1 %{
  execute-keys ",|cat ""%opt{snippets_dir}/%arg{1}""<ret>"
  execute-keys -save-regs '' "s[$]\d+<ret>"
  execute-keys "%sh{echo $((kak_selection_count + 1))}n"
}
```

Now each snippet is a file placed in `~/.config/kak/snippets/`.
The files in my case are organized by filetype in directories as `{filetype}/snippetname.{ext}` or `{filetype}/snippetname.snip.kak`.
The prompt is filled with `{filetype}/` so at first you see the snippets for the current filetype but you can delete that in the prompt to see all.

If it's a .snip.kak file, it is evaluated as a kakoune script which is the same as the commands from before.
Otherwise the contents of the snippet file is inserted into the buffer directly and any `$n` (`$1`, `$2`, ...) will be added as a selection.
Example:

```ruby
# frozen_string_literal: true

class $1
  def initialize
    $2
  end

  $3
end
```

The above snippet, `$1` is automatically selected first. You can press `c` to change it and `Esc` to go back to normal mode. Then when you press `n`, it jumps to the next `$n`.

I know this already exists for every other editor out of the box and is much more fleshed out but the experience of understanding a system and defining a feature within it, in it's simplest form, is a really pleasant.

