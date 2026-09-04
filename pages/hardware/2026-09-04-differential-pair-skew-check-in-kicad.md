# Differential pair skew check in kicad

Love DRC. Can't live without it. Want more. But there's some things that DRC doesn't know how to do out of the box like verifying the skew in my differential pair traces or telling me I'm a good boy. Luckily custom rules makes up for it (at least the first part)!

Go to Board Setup > Design Rules > Custom Rules (or manually edit `*.kicad_dru` file, if you're not right in the head) and add the following:

```lisp
(version 1)

(rule "100Ohm differential pair skew"
    (condition "A.NetClass == '100Ohm'")
    (constraint skew (max 0.05mm) (within_diff_pairs)))
```

The above rule is specifically for a net class named `100Ohm`. This will show up as an error if your differential pairs have a skew greater than 0.05mm. You can also use `A.hasNetclass('DiffPair-*')` if you have some `DiffPair-100Ohm`, `DiffPair-90Ohm`, etc. convention going on. Or combine them as `(condition "A.hasNetclass('100Ohm') || A.hasNetclass('90Ohm')")`

There's a bunch of other constraints you can check for like diff_pair_uncoupled, diff_pair_gap, track_width, etc. Check the "Syntax Help" thing in the modal to see more stuff it comes with.

