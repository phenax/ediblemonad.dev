# Creative coding in sqlite

Been trying out creative coding in sqlite recently ${partials.linkExternal "https://github.com/phenax/sqlite-creative-coding" "here"}. Turned out to be a lot more fun than what writing practical SQL had conditioned me to believe!

Generating images is pretty straight forward. The SQL uses ${partials.linkExternal "https://sqlite.org/lang_with.html" "recursive CTE"} to generate and store pixel rgb values in the db.
Then a bash script reads the pixel values structures them in the ppm text format which is then converted to png using imagemagick.
I was thinking of taking this a step further by converting to ppm from within sql but didn't feel like that added much except boilerplate.

Currently I've got 2 scripts image.sh and video.sh to generate images and videos respectively.
- **image.sh**: Generates a ppm from the pixels stored in the db. Uses imagemagick to convert that to a png (and also for displaying it)
- **video.sh**: Generates a ppm stream for each stored frame of the video. Uses ffmpeg to convert that to a gif (and uses ffplay for displaying it)

Here's a simplified example that generates 400x400 grid of pixels with a circle in the middle:

```sql
WITH RECURSIVE
    image(width, height, cx, cy, radius) AS
        (SELECT 400 AS width, 400 AS height, 200 AS cx, 200 AS cy, 160 AS radius),
    horizontal(x) AS
        (SELECT width FROM image
            UNION ALL
            SELECT x - 1 FROM horizontal WHERE x > 1),
    vertical(y) AS
        (SELECT height FROM image
            UNION ALL
            SELECT y - 1 FROM vertical WHERE y > 1)
SELECT x, y,
    255 * MAX(0, MIN(1, (x - cx)*(x - cx) + (y - cy)*(y - cy) - radius*radius)),
    150,
    150
    FROM vertical, horizontal, image;
```

Here, `horizontal`/`vertical` generates x and y coordinates, the final select assigns the r,g,b values for each x,y coordinate which is what allows generating the visuals.

In the repo, I'm storing the pixels instead of generating just generating them directly. I went with this approach for 2 reasons - debugging and reducing the pain of generating a video. Although, could've used materialized views but nah simpler is better.

Generating audio out of samples should also be simple with raw PCM data and then to ffmpeg to convert to wav but haven't tried that yet.
Another more ambitious idea is to build a simple snake game. The way I'm thinking is with the ppm output streaming to ffplay and using terminal raw mode for input which will update relevant values either directly or via triggers. Leaving that for future me to fuck around with.

SQL can be fun.
