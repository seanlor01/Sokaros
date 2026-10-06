/* =====================================================================
   SOKAROS SITE CONFIG  (social / community links, used on every page)
   ---------------------------------------------------------------------
   SEAN: EDIT HERE. Paste your real profile URLs between the quotes.
   Every link on the site marked data-social="..." (nav, home Socials
   section, footer, Discord buttons) is filled in from this list, so you
   only edit links in ONE place. Leave "" to keep the placeholder "#".
   ===================================================================== */

window.SOKAROS_CONFIG = {
  social: {
    twitch:  "", // TODO (Sean): e.g. https://www.twitch.tv/<channel>
    youtube: "", // TODO (Sean): e.g. https://www.youtube.com/@<handle>
    x:       "", // TODO (Sean): e.g. https://x.com/<handle>
    discord: "", // TODO (Sean): Discord invite, e.g. https://discord.gg/<code>
    tiktok:  "", // TODO (Sean): e.g. https://www.tiktok.com/@<handle>
    itch:    ""  // TODO (Sean): itch.io profile, e.g. https://<you>.itch.io
  },

  /* -------------------------------------------------------------------
     GAME COMMENTS (giscus = comments stored as GitHub Discussions)
     Every game in js/games.js automatically gets its own thread, titled
     termPrefix + game title, e.g. "Game: Planet Zorb". Visitors sign in
     with GitHub to comment. Moderate (edit/delete/lock/pin) comments in
     the repo's Discussions tab:
       https://github.com/seanlor01/Sokaros/discussions
     Requires the giscus GitHub App to be installed on the repo:
       https://github.com/apps/giscus
     IDs come from https://giscus.app (enter the repo + category there).
     Set enabled: false to hide comments everywhere.
     ------------------------------------------------------------------- */
  giscus: {
    enabled: true,
    repo: "seanlor01/Sokaros",
    repoId: "R_kgDOUEYThA",
    category: "Announcements",
    categoryId: "DIC_kwDOUEYThM4DHL0K",
    termPrefix: "Game: ",            // thread title = termPrefix + game title
    lang: "en",
    // Custom red-neon theme (css/giscus-theme.css). giscus needs a public
    // https URL, so it's only used when the site runs on liveHost; anywhere
    // else (local testing) fallbackTheme is used.
    themeUrl: "https://seanlor01.github.io/Sokaros/css/giscus-theme.css",
    liveHost: "seanlor01.github.io",
    fallbackTheme: "transparent_dark"
  }
};
