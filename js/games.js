/* =====================================================================
   SOKAROS GAME DATA  (single source of truth for every game on the site)
   ---------------------------------------------------------------------
   SEAN: EDIT HERE. Both the Home "Featured games" strip and the Games page
   are built from this list, so you only ever change game info in this file.

   Fields:
     id           unique slug, lowercase-with-dashes (also used in URLs:
                  games.html#play-<id> opens that game's Play window)
     title        display name
     genre        short genre label
     description  1-3 sentence pitch
     features     (optional) short bullet points shown in the Play window
     controls     list of [keys, action] pairs
     cover        path to the cover image (630x500 works best)
     itchUrl      full itch.io page URL, e.g. "https://sokaros.itch.io/<game>".
                  When set, Play also shows a "Play on itch.io" button.
                  Leave "" for unreleased games.
     itchEmbedId  the numeric UPLOAD ID of the HTML5 build. The game is embedded
                  with https://itch.io/embed-upload/<itchEmbedId>?color=0b0b0f
                  (find it on itch.io: Edit game -> Distribute -> Embed game,
                  "Embed game" tab, the number in ".../embed-upload/<ID>").
                  NOTE: it changes if you delete and re-upload the build file!
                  Leave "" to show the "itch.io embed goes here" placeholder.
     width,height native size of the game's embed in pixels, exactly as set on
                  the itch.io page (Edit game -> "Embed options" -> Viewport
                  dimensions). The Play window renders the game at this size and
                  scales it to fit, so it is never cropped. Default 1280 x 720
                  if left out. Get these right for every new game!
     commentsTerm (optional) comment thread name for this game. By default every
                  game automatically gets the thread "Game: <title>" (prefix set
                  in js/site-config.js). If you RENAME a game, set this to the
                  old name (e.g. "Game: Old Title") to keep its existing comments.
     itchGameId   (optional) the numeric GAME ID, used for itch's small
                  buy/info widget https://itch.io/embed/<itchGameId>.
                  Leave "" to hide the widget.
   ===================================================================== */

window.SOKAROS_GAMES = [
  {
    id: "robot-snowball",
    title: "Robot Snowball",
    genre: "3D Arcade / Roll-'em-up",
    description:
      "Roll a growing snowball through a snowy town, Katamari-style, and roll up everything to win.",
    features: [
      "Power-ups: Turbo, Magnet, Snow Burst and Frost Clock",
      "Combos up to x5",
      "Size-up celebrations as your snowball grows",
      "Best records saved"
    ],
    controls: [
      ["WASD / Arrows", "Push the ball"],
      ["Mouse", "Move the camera"],
      ["Esc", "Pause"],
      ["R", "Restart"]
    ],
    cover: "assets/covers/robot-snowball.png",
    width: 1280,       // native embed width  (itch.io viewport)
    height: 720,       // native embed height (itch.io viewport)
    itchUrl: "https://sokaros.itch.io/snowball",
    itchEmbedId: "19592375",   // itch.io upload ID (game embed)
    itchGameId: "5103294"     // itch.io game ID (buy/info widget)
  },
  {
    id: "planet-zorb",
    title: "Planet Zorb",
    genre: "2D Pixel Art Shooter",
    description:
      "A reverse Space Invaders: you're the alien saucer defending your planet from waves of human ships.",
    features: [
      "Piercing and rapid-fire power-ups",
      "A boss every third wave"
    ],
    controls: [
      ["Left / Right or A / D", "Move"],
      ["Space (hold)", "Fire (also starts the game)"],
      ["Esc / P", "Pause"],
      ["R", "Restart"],
      ["M", "Toggle music"]
    ],
    cover: "assets/covers/planet-zorb.png",
    width: 960,       // native embed width  (itch.io viewport)
    height: 720,       // native embed height (itch.io viewport)
    itchUrl: "https://sokaros.itch.io/planet-zorb",
    itchEmbedId: "19571825",   // itch.io upload ID (game embed)
    itchGameId: "5104206"     // itch.io game ID (buy/info widget)
  },
  {
    id: "circuit-siege",
    title: "Circuit Siege",
    genre: "2D Neon Tower Defense",
    description:
      "Viruses are crawling across the motherboard, all heading for your CPU core. Build towers along the glowing circuit traces, upgrade them, and survive the swarm.",
    features: [
      "5 towers, 3 upgrade levels each",
      "7 virus types",
      "A TROJAN boss every 5th wave",
      "3 maps, plus Endless mode"
    ],
    controls: [
      ["Mouse", "Build / select towers (right-click cancels)"],
      ["1-5", "Pick a tower"],
      ["U / S / T", "Upgrade / sell / change targeting"],
      ["Space", "Next wave"],
      ["E / O", "EMP / Overclock"],
      ["F", "Game speed"],
      ["P", "Pause"],
      ["M", "Sound on/off"]
    ],
    cover: "assets/covers/circuit-siege.png",
    width: 1280,       // native embed width  (itch.io viewport)
    height: 720,       // native embed height (itch.io viewport)
    itchUrl: "https://sokaros.itch.io/circuit-siege",
    itchEmbedId: "19582940",   // itch.io upload ID (game embed)
    itchGameId: "5107439"     // itch.io game ID (buy/info widget)
  }
];
