/* =====================================================================
   SOKAROS VIDEOS  (one file for every video on the site)
   ---------------------------------------------------------------------
   SEAN: EDIT HERE. This list feeds:
     - videos.html  (featured video, category filters, video grid)
     - index.html   (the "Videos" section shows the newest 3)
   Order doesn't matter: the site sorts newest first by `date`.
   An empty list shows a "No videos yet, check back soon" message.

   HOW TO ADD A VIDEO
     1. Copy the example block at the bottom of this file (from { to },).
     2. Paste it inside the [ ] brackets below. (Only copy the { ... }, block,
        not the "EXAMPLE BLOCK" comment lines above and below it.)
     3. Change the fields. Keep the quotes "..." and the comma after },
   HOW TO EDIT A VIDEO
     Change any field inside its { ... } block and save.
   HOW TO REMOVE A VIDEO
     Delete its whole block, from the opening { through the closing },

   FIELDS
     id           unique short name, lowercase-with-dashes, e.g. "zorb-devlog-1".
                  (videos.html#watch-<id> opens that video directly)
     title        video title
     description  one or two sentences ("" is fine)
     url          paste the link exactly as you copy it. Supported:
                    YouTube:  https://www.youtube.com/watch?v=XXXXXXXXXXX
                              https://youtu.be/XXXXXXXXXXX
                              https://www.youtube.com/shorts/XXXXXXXXXXX
                    Twitch:   https://www.twitch.tv/videos/123456789      (past broadcast)
                              https://clips.twitch.tv/SomeClipName         (clip)
                              https://www.twitch.tv/<channel>/clip/SomeClipName
                    MP4 file: "assets/videos/my-video.mp4" (put the file in
                              that folder) or a full https://... .mp4 link
     date         "YYYY-MM-DD" (used for sorting, newest first)
     category     any label, e.g. "Devlog", "Gameplay", "Trailer",
                  "Stream highlight". Filter buttons are made automatically
                  from the categories you use.
     game         (optional) id of a game from js/games.js, e.g. "planet-zorb".
                  Shows a game tag linking to that game. Leave it out or "".
     thumbnail    (optional) image path/URL to use instead of the automatic one.
                  YouTube thumbnails are automatic. Twitch and MP4 videos have
                  no automatic thumbnail, so add one here (or a styled
                  placeholder is shown).
     featured     (optional) true = show this video big at the top of
                  videos.html. If none is featured, the newest one is used.

   Tips: Twitch embeds only work once the site is on a real domain
   (or localhost); opening the files directly from disk can't show them.
   ===================================================================== */

window.SOKAROS_VIDEOS = [

  // Paste your video blocks here (newest or oldest first, either is fine).

];

/* ---------------- EXAMPLE BLOCK: copy from { to }, into the list above ----------------

  {
    id: "my-first-video",
    title: "My first video",
    description: "A short description of what's in the video.",
    url: "https://www.youtube.com/watch?v=VIDEO_ID_HERE",
    date: "2026-10-06",
    category: "Devlog",
    game: "planet-zorb",          // optional: robot-snowball / planet-zorb / circuit-siege
    thumbnail: "",                // optional: custom thumbnail image
    featured: true                // optional: show big at the top of videos.html
  },

-------------------------------------------------------------------------------------- */
