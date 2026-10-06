# Sokaros website (v1)

Static site for **Sokaros**, Sean's gaming brand. Plain HTML + CSS + vanilla JS:
no build step, no dependencies. Upload the folder to any static host
(GitHub Pages, Netlify, Cloudflare Pages, itch.io HTML page, S3...) and it works.

## Structure

```
sokaros-site/
├── index.html          Home / creator hub: hero, featured games, Streams, latest 3 Videos, Socials
├── games.html          Game cards + Play window (embeds the itch.io build)
├── videos.html         Featured video, category filters, video grid + player window
├── community.html      News feed, Events, Crew, Discord call-to-action
├── about.html          About Sokaros: Sean's bio card + links to the games
├── css/style.css       All styling (colours are CSS variables at the top)
├── js/
│   ├── site-config.js  Social / Discord / itch profile links  <- EDIT
│   ├── games.js        Game data + itch.io IDs                <- EDIT
│   ├── news.js         News posts                              <- EDIT
│   ├── events.js       Events                                  <- EDIT
│   ├── videos.js       Videos                                  <- EDIT
│   └── main.js         Shared logic (nav, rendering, Play window). Normally no edits needed.
├── assets/covers/      Game cover images (630x500)
└── screenshots/        Preview screenshots (not needed on the live site; safe to delete)
```

Search the project for `TODO (Sean)` and `SEAN: EDIT` to find every spot meant for editing.

## Where to edit things

### Social links (Twitch, YouTube, X, Discord, TikTok, itch.io)
Edit **`js/site-config.js`** only. Every link with `data-social="..."` across all
pages (home Socials tiles, Streams/Videos buttons, Discord buttons, footer icons)
is filled in from there. An empty string keeps the `href="#"` placeholder.

### Games
Edit **`js/games.js`**. The Home "Featured" strip and the Games page are both
generated from it. Each entry:

| field         | meaning |
|---------------|---------|
| `id`          | slug; `games.html#play-<id>` opens that game's Play window directly |
| `title`, `genre`, `description` | card text |
| `features`    | optional bullets shown in the Play window |
| `controls`    | list of `[keys, action]` pairs |
| `cover`       | image path, e.g. `assets/covers/my-game.png` |
| `itchUrl`     | itch.io page URL -> shows the **Play on itch.io** button (`""` hides it) |
| `itchEmbedId` | itch.io **upload ID** of the HTML5 build -> embeds `https://itch.io/embed-upload/<id>?color=0b0b0f` (`""` shows an "itch.io embed goes here" placeholder) |
| `itchGameId`  | itch.io **game ID** -> shows itch's small buy/info widget `https://itch.io/embed/<id>` (`""` hides it) |

Current itch.io data:

| game | itchUrl | itchGameId | itchEmbedId (upload) |
|------|---------|-----------:|---------------------:|
| Robot Snowball | https://sokaros.itch.io/snowball | 5103294 | 19592375 |
| Planet Zorb    | https://sokaros.itch.io/planet-zorb | 5104206 | 19571825 |
| Circuit Siege  | https://sokaros.itch.io/circuit-siege | 5107439 | 19582940 |

**Important:** the upload ID changes if you delete and re-upload a game's build
zip on itch.io. If an embed suddenly shows an error, grab the new ID from
itch.io -> Edit game -> Distribute -> Embed game (the number in `.../embed-upload/<ID>`)
and update `itchEmbedId`.

How Play works: the game iframe is only created when the visitor clicks **Play**
(nothing heavy loads with the page), it is shown 16:9 in a neon frame with a
**Fullscreen** button and a **Play on itch.io** fallback, and it's removed again
when the window closes so the game and its audio stop.

To add a game: copy its cover into `assets/covers/`, then copy one entry in
`js/games.js` and change the fields.

### Videos
Edit **`js/videos.js`** only. It feeds `videos.html` (featured video, category
filters, grid) and the home page's Videos section (newest 3). It ships **empty**,
so both places show a "No videos yet, check back soon" message until you add one.

- **Add a video:** copy the commented `EXAMPLE BLOCK` at the bottom of `js/videos.js`
  (from `{` to `},`), paste it inside the `[ ]` list near the top, and change the fields.
- **Edit a video:** change any field in its `{ ... }` block.
- **Remove a video:** delete its whole block, from `{` through `},`.

Order in the file doesn't matter; the site sorts newest first by `date`.

| field | meaning |
|-------|---------|
| `id` | unique slug; `videos.html#watch-<id>` opens it directly |
| `title`, `description` | card text |
| `url` | paste the link as-is: YouTube (`watch?v=`, `youtu.be/`, `/shorts/`), Twitch (`twitch.tv/videos/<id>`, `clips.twitch.tv/<slug>`, `twitch.tv/<channel>/clip/<slug>`), or an `.mp4` (e.g. `assets/videos/clip.mp4` or a full https link) |
| `date` | `"YYYY-MM-DD"` |
| `category` | any label (`Devlog`, `Gameplay`, `Trailer`, `Stream highlight`...); filter buttons are built from the categories in use (shown when there are 2+) |
| `game` | optional game id from `js/games.js` (`robot-snowball`, `planet-zorb`, `circuit-siege`) -> adds a game tag linking to it |
| `thumbnail` | optional custom thumbnail. YouTube thumbnails are automatic (`i.ytimg.com/vi/<id>/hqdefault.jpg`); Twitch/MP4 have none, so set one or a styled placeholder shows |
| `featured` | optional `true` -> shown big at the top of `videos.html` (if several are featured, the newest featured one; if none, the newest video) |

Playback: the player is only created when a video is clicked and is removed on
close. YouTube uses the privacy-friendly `youtube-nocookie.com` embed (Shorts get a
vertical frame); MP4s use a `<video>` player. Every video also gets a "Watch on
YouTube/Twitch" fallback button. **Twitch embeds** require `parent=<your domain>`,
which the site fills in automatically from the address it's served from; they work
on a real domain over https (or on localhost), not when opening files from disk.
Some YouTube videos have embedding disabled by their owner; those show
"unavailable" in the player, and the fallback button still works.

### News
Edit **`js/news.js`** (newest first). The two current posts are marked
`example: true` and show an "EXAMPLE POST" badge; delete them when you add real posts.

### Events
Edit **`js/events.js`**. One example event is included. An empty list shows
"No events scheduled yet".

### Other placeholders
- **Home**: tagline (hero) and the Twitch player embed (Streams); the HTML comment shows the embed code to paste. The home Videos section fills itself from `js/videos.js`.
- **Community**: Crew cards are plain HTML in `community.html`; copy a card to add a member.
- **About**: Sean's bio is in `about.html` (edit the paragraphs in the bio card). The game thumbnails below it come from `js/games.js`; the pixel "S" badge can be swapped for an avatar image (see the TODO comment).
- **Colours / fonts**: CSS variables at the top of `css/style.css`. Headings use Google Fonts "Press Start 2P", body text uses "Inter".
- **Favicon**: none yet; see the comment in each page's `<head>`.

Header and footer markup is repeated in each of the 5 HTML files (no build step),
so a nav change has to be made in all five.

## Run locally

```
cd sokaros-site
python3 -m http.server 8000
# open http://localhost:8000
```

Opening the files straight from disk (file://) mostly works, but itch.io embeds
behave best when served over http(s).
