/* =====================================================================
   SOKAROS - shared site script (vanilla JS, no build step)
   You normally do NOT need to edit this file. Content lives in:
     js/site-config.js  social links
     js/games.js        games + itch.io IDs
     js/news.js         news feed
     js/events.js       events
     js/videos.js       videos
   ===================================================================== */
(function () {
  "use strict";

  var ITCH_EMBED_COLOR = "0b0b0f"; // background colour itch uses around the game

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  var MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  function parseDate(s) { // "YYYY-MM-DD" -> {y,m,d} without timezone surprises
    var p = String(s || "").split("-");
    return { y: p[0] || "", m: MONTHS[(parseInt(p[1], 10) || 1) - 1], d: p[2] || "" };
  }

  /* ---------- simple inline icons ---------- */
  var ICONS = {
    twitch: '<path d="M4 2 2 6v14h5v3h3l3-3h4l5-5V2H4zm16 12-3 3h-5l-3 3v-3H5V4h15v10zM16 7h2v5h-2zm-5 0h2v5h-2z"/>',
    youtube: '<path d="M22 7.2a3 3 0 0 0-2.1-2.1C18 4.6 12 4.6 12 4.6s-6 0-7.9.5A3 3 0 0 0 2 7.2 31 31 0 0 0 1.6 12c0 1.6.1 3.2.4 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z"/>',
    x: '<path d="M3 3h5l4.2 5.8L17.2 3H20.6l-6.8 7.9L21.5 21h-5l-4.6-6.3L6.5 21H3.1l7.2-8.3L3 3zm3.4 1.6 10.9 14.8h1.8L7.3 4.6H6.4z"/>',
    discord: '<path d="M19.3 5.3A17 17 0 0 0 15 4l-.5 1a15 15 0 0 0-5 0L9 4a17 17 0 0 0-4.3 1.3C2 9.4 1.3 13.4 1.6 17.3A17 17 0 0 0 6.9 20l1.1-1.8c-.6-.2-1.2-.5-1.7-.9l.4-.3a12 12 0 0 0 10.6 0l.4.3c-.5.4-1.1.7-1.7.9l1.1 1.8a17 17 0 0 0 5.3-2.7c.4-4.5-.7-8.5-3.1-12zM8.5 14.9c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1zm7 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1z"/>',
    tiktok: '<path d="M16.5 2h-3.3v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.3 6.3 0 1 0 5.3 6.2V8.6A7.6 7.6 0 0 0 21 10V6.7A4.4 4.4 0 0 1 16.5 2z"/>',
    itch: '<path d="M4 3h16l2 4v2a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2V7l2-4zm-1 9.5a4.6 4.6 0 0 0 4 .3 4.6 4.6 0 0 0 5 .5 4.6 4.6 0 0 0 5-.5 4.6 4.6 0 0 0 4-.3V21H3v-8.5zM10 14l-2 3h2v2h4v-2h2l-2-3h-4z"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    full: '<path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm16 0h2v7h-7v-2h5v-5z"/>'
  };
  function icon(name) {
    return ICONS[name] ? '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>" : "";
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var btn = $(".nav-toggle"), links = $(".nav-links");
    if (!btn || !links) return;
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- social links (from js/site-config.js) ---------- */
  function initSocials() {
    var social = (window.SOKAROS_CONFIG && window.SOKAROS_CONFIG.social) || {};
    $all("[data-icon]").forEach(function (el) {
      el.insertAdjacentHTML("afterbegin", icon(el.getAttribute("data-icon")));
    });
    $all("[data-social]").forEach(function (a) {
      var url = social[a.getAttribute("data-social")];
      if (url) {
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener";
      } else {
        a.setAttribute("title", (a.getAttribute("aria-label") || a.textContent.trim()) + " link coming soon");
      }
    });
  }

  /* ---------- game cards (from js/games.js) ---------- */
  function controlsHTML(controls) {
    return (controls || []).map(function (c) {
      return "<dt><kbd>" + esc(c[0]) + "</kbd></dt><dd>" + esc(c[1]) + "</dd>";
    }).join("");
  }

  function cardHTML(g, mode) {
    // mode "full" = Games page (Play opens modal); "strip" = Home featured strip
    var play = mode === "strip"
      ? '<a class="btn btn-sm" href="games.html#play-' + esc(g.id) + '">' + icon("play") + "Play</a>"
      : '<button class="btn btn-sm" type="button" data-play="' + esc(g.id) + '">' + icon("play") + "Play</button>";
    var itch = g.itchUrl
      ? '<a class="btn btn-sm btn-ghost" href="' + esc(g.itchUrl) + '" target="_blank" rel="noopener">itch.io</a>'
      : "";
    var controls = mode === "strip" ? "" :
      '<details class="controls"><summary>Controls</summary><dl class="kv">' + controlsHTML(g.controls) + "</dl></details>";
    return (
      '<article class="panel hoverable game-card" id="game-' + esc(g.id) + '">' +
        '<div class="cover-wrap"><img src="' + esc(g.cover) + '" alt="' + esc(g.title) + ' cover art" width="630" height="500" loading="lazy"></div>' +
        '<div class="panel-body">' +
          '<span class="tag">' + esc(g.genre) + "</span>" +
          "<h3>" + esc(g.title) + "</h3>" +
          "<p>" + esc(g.description) + "</p>" +
          controls +
          '<div class="btn-row">' + play + itch + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderGames() {
    var games = window.SOKAROS_GAMES || [];
    var strip = $("#featured-games");
    if (strip) strip.innerHTML = games.map(function (g) { return cardHTML(g, "strip"); }).join("");
    var mini = $("#about-games"); // About page: small linked thumbnails
    if (mini) mini.innerHTML = games.map(function (g) {
      return '<a class="panel hoverable mini-game" href="games.html#play-' + esc(g.id) + '">' +
        '<img src="' + esc(g.cover) + '" alt="" width="630" height="500" loading="lazy">' +
        '<span class="mini-title">' + esc(g.title) + '</span>' +
        '<span class="mini-play">' + icon("play") + "Play</span></a>";
    }).join("");
    var grid = $("#games-grid");
    if (grid) {
      grid.innerHTML = games.map(function (g) { return cardHTML(g, "full"); }).join("");
      grid.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-play]");
        if (btn) openGame(btn.getAttribute("data-play"), btn);
      });
    }
  }

  /* ---------- Play modal + lazy itch.io embed ---------- */
  var lastFocus = null;

  function findGame(id) {
    return (window.SOKAROS_GAMES || []).filter(function (g) { return g.id === id; })[0];
  }

  function openGame(id, trigger) {
    var g = findGame(id), modal = $("#play-modal");
    if (!g || !modal) return;
    lastFocus = trigger || document.activeElement;

    $("#play-title", modal).textContent = g.title;
    var frame = $("#play-frame", modal);
    var fsBtn = $("#play-fullscreen", modal);

    // The iframe is created only now, when the player clicked Play.
    if (g.itchEmbedId) {
      frame.innerHTML =
        '<div class="embed-loading">LOADING<span class="blink">_</span></div>' +
        '<iframe title="' + esc(g.title) + ' (playable on itch.io)" ' +
        'src="https://itch.io/embed-upload/' + encodeURIComponent(g.itchEmbedId) + "?color=" + ITCH_EMBED_COLOR + '" ' +
        'allow="autoplay; fullscreen *; gamepad; cross-origin-isolated" allowfullscreen></iframe>';
      var ifr = $("iframe", frame);
      ifr.addEventListener("load", function () {
        var l = $(".embed-loading", frame); if (l) l.remove();
      });
      fsBtn.hidden = false;
    } else {
      // No upload ID yet -> styled placeholder
      frame.innerHTML =
        '<div class="placeholder"><div><span class="pixel">itch.io embed goes here</span>' +
        "<small>Add this game's itchEmbedId in js/games.js</small></div></div>";
      fsBtn.hidden = true;
    }

    var itchLink = $("#play-itch", modal);
    if (g.itchUrl) { itchLink.href = g.itchUrl; itchLink.hidden = false; }
    else { itchLink.hidden = true; }

    $("#play-genre", modal).textContent = g.genre;
    $("#play-desc", modal).textContent = g.description;
    $("#play-features", modal).innerHTML = (g.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
    $("#play-controls", modal).innerHTML = controlsHTML(g.controls);

    var widget = $("#play-widget", modal);
    if (g.itchGameId) {
      widget.innerHTML = '<iframe class="itch-widget" loading="lazy" title="' + esc(g.title) + ' on itch.io" ' +
        'src="https://itch.io/embed/' + encodeURIComponent(g.itchGameId) + '?dark=true&amp;linkback=true"></iframe>';
      widget.hidden = false;
    } else { widget.innerHTML = ""; widget.hidden = true; }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (history.replaceState) history.replaceState(null, "", "#play-" + g.id);
    $(".modal-close", modal).focus();
  }

  function closeGame() {
    var modal = $("#play-modal");
    if (!modal || !modal.classList.contains("open")) return;
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    // Remove the iframes so the game (and its audio) stops completely.
    $("#play-frame", modal).innerHTML = "";
    $("#play-widget", modal).innerHTML = "";
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function initModal() {
    var modal = $("#play-modal");
    if (!modal) return;
    $all("[data-close]", modal).forEach(function (el) { el.addEventListener("click", closeGame); });
    document.addEventListener("keydown", function (e) {
      // Only fires when focus is on the page, not inside the game iframe,
      // so in-game Esc (pause) still works.
      if (e.key === "Escape") closeGame();
    });
    $("#play-fullscreen", modal).addEventListener("click", function () {
      var el = $("#play-frame", modal);
      var req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) req.call(el);
    });
    // Deep link from Home: games.html#play-<id>
    var m = location.hash.match(/^#play-(.+)$/);
    if (m && findGame(m[1])) openGame(m[1]);
  }

  /* ---------- news (from js/news.js) ---------- */
  function renderNews() {
    var el = $("#news-feed");
    if (!el) return;
    var posts = window.SOKAROS_NEWS || [];
    if (!posts.length) { el.innerHTML = '<p class="empty">No news yet. Check back soon.</p>'; return; }
    el.innerHTML = posts.map(function (p) {
      var d = parseDate(p.date);
      return '<article class="panel post"><div class="panel-body">' +
        '<div class="post-meta">' +
          (p.example ? '<span class="badge-example">Example post</span>' : "") +
          (p.tag ? '<span class="tag pink">' + esc(p.tag) + "</span>" : "") +
          '<time datetime="' + esc(p.date) + '">' + esc(d.d + " " + d.m + " " + d.y) + "</time>" +
        "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.body) + "</p>" +
        (p.link ? '<p style="margin-top:1rem"><a class="btn btn-sm btn-ghost" href="' + esc(p.link) + '">Read more</a></p>' : "") +
      "</div></article>";
    }).join("");
  }

  /* ---------- events (from js/events.js) ---------- */
  function renderEvents() {
    var el = $("#events-list");
    if (!el) return;
    var events = window.SOKAROS_EVENTS || [];
    if (!events.length) { el.innerHTML = '<p class="empty">No events scheduled yet. Watch Discord for announcements.</p>'; return; }
    el.innerHTML = events.map(function (ev) {
      var d = parseDate(ev.date);
      var meta = [ev.time, ev.where].filter(Boolean).map(esc).join(" &middot; ");
      return '<article class="panel event panel-body">' +
        '<div class="event-date"><span class="m">' + esc(d.m) + '</span><span class="d">' + esc(d.d) + '</span><span class="y">' + esc(d.y) + "</span></div>" +
        "<div>" +
          '<div class="post-meta">' + (ev.example ? '<span class="badge-example">Example</span>' : "") + (meta ? "<span>" + meta + "</span>" : "") + "</div>" +
          "<h3>" + esc(ev.title) + "</h3>" +
          '<p style="margin:0;color:var(--muted)">' + esc(ev.details) + "</p>" +
          (ev.link ? '<p style="margin:1rem 0 0"><a class="btn btn-sm btn-ghost" href="' + esc(ev.link) + '">Details / RSVP</a></p>' : "") +
        "</div>" +
      "</article>";
    }).join("");
  }

  /* =================================================================
     VIDEOS (data from js/videos.js)
     ================================================================= */
  function parseVideoUrl(raw) {
    // Returns { kind, id, embed, thumb, vertical, source } or { kind: "unknown" }
    var url = String(raw || "").trim(), u = null, m;
    if (!url) return { kind: "unknown" };
    if (/\.(mp4|webm|m4v)(\?.*)?$/i.test(url)) return { kind: "mp4", src: url, source: "Video file" };
    try { u = new URL(url, location.href); } catch (e) { return { kind: "unknown" }; }
    var host = u.hostname.replace(/^(www\.|m\.|music\.)/, "");
    var path = u.pathname;

    // ---- YouTube ----
    var yt = null, vertical = false;
    if (host === "youtu.be") yt = path.split("/")[1];
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.searchParams.get("v")) yt = u.searchParams.get("v");
      else if ((m = path.match(/^\/(shorts|embed|live|v)\/([^/?#]+)/))) { yt = m[2]; vertical = m[1] === "shorts"; }
    }
    if (yt && /^[A-Za-z0-9_-]{6,20}$/.test(yt)) {
      var start = parseInt(String(u.searchParams.get("t") || u.searchParams.get("start") || "").replace(/s$/, ""), 10);
      return {
        kind: "youtube", id: yt, vertical: vertical, source: "YouTube",
        embed: "https://www.youtube-nocookie.com/embed/" + yt + "?autoplay=1&rel=0" + (start > 0 ? "&start=" + start : ""),
        thumb: "https://i.ytimg.com/vi/" + yt + "/hqdefault.jpg"
      };
    }

    // ---- Twitch (parent= must be the site's hostname) ----
    var parent = location.hostname;
    if (host === "clips.twitch.tv" && (m = path.match(/^\/(?:embed)?\/?([^/?#]+)/))) {
      var slug = path === "/embed" ? u.searchParams.get("clip") : m[1];
      return { kind: "twitch", source: "Twitch", needsHost: !parent,
        embed: "https://clips.twitch.tv/embed?clip=" + encodeURIComponent(slug) + "&parent=" + encodeURIComponent(parent) + "&autoplay=true" };
    }
    if (host === "twitch.tv") {
      if ((m = path.match(/^\/videos\/(\d+)/)))
        return { kind: "twitch", source: "Twitch", needsHost: !parent,
          embed: "https://player.twitch.tv/?video=" + m[1] + "&parent=" + encodeURIComponent(parent) + "&autoplay=true" };
      if ((m = path.match(/^\/[^/]+\/clip\/([^/?#]+)/)))
        return { kind: "twitch", source: "Twitch", needsHost: !parent,
          embed: "https://clips.twitch.tv/embed?clip=" + encodeURIComponent(m[1]) + "&parent=" + encodeURIComponent(parent) + "&autoplay=true" };
    }
    return { kind: "unknown" };
  }

  function getVideos() {
    var list = (window.SOKAROS_VIDEOS || []).filter(function (v) { return v && v.url; });
    return list.map(function (v, i) {
      var p = parseVideoUrl(v.url);
      return {
        id: String(v.id || "video-" + (i + 1)),
        title: v.title || "Untitled video",
        description: v.description || "",
        url: v.url, date: v.date || "", category: v.category || "",
        game: v.game || "", featured: !!v.featured,
        thumb: v.thumbnail || p.thumb || "",
        parsed: p
      };
    }).sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }); // newest first
  }

  function fmtDate(s) { var d = parseDate(s); return s ? (d.d + " " + d.m + " " + d.y) : ""; }

  function gameTag(gameId) {
    var g = gameId && findGame(gameId);
    return g ? '<a class="tag game-tag" href="games.html#play-' + esc(g.id) + '">' + esc(g.title) + "</a>" : "";
  }

  function thumbHTML(v) {
    var inner = v.thumb
      ? '<img src="' + esc(v.thumb) + '" alt="" loading="lazy">'
      : '<div class="thumb-fallback"><span class="pixel">' + esc(v.parsed.source || "Video") + "</span></div>";
    return '<div class="video-thumb">' + inner + '<span class="pixel-play" aria-hidden="true"></span></div>';
  }

  function videoCardHTML(v, href) {
    var open = href
      ? '<a class="video-open" href="' + esc(href) + '">'
      : '<button class="video-open" type="button" data-watch="' + esc(v.id) + '">';
    var close = href ? "</a>" : "</button>";
    return '<article class="panel hoverable video-card">' +
      open + thumbHTML(v) + '<span class="sr-only">Play ' + esc(v.title) + "</span>" + close +
      '<div class="panel-body">' +
        '<div class="post-meta">' +
          (v.category ? '<span class="tag pink">' + esc(v.category) + "</span>" : "") +
          (v.date ? '<time datetime="' + esc(v.date) + '">' + esc(fmtDate(v.date)) + "</time>" : "") +
        "</div>" +
        "<h3>" + esc(v.title) + "</h3>" +
        (v.description ? '<p class="video-desc">' + esc(v.description) + "</p>" : "") +
        (v.game ? '<div class="video-tags">' + gameTag(v.game) + "</div>" : "") +
      "</div></article>";
  }

  var EMPTY_VIDEOS = '<div class="panel empty-state"><span class="pixel">No videos yet</span><p>Check back soon.</p></div>';

  function renderHomeVideos() {
    var el = $("#latest-videos");
    if (!el) return;
    var vids = getVideos().slice(0, 3);
    el.className = vids.length ? "grid grid-3" : "";
    el.innerHTML = vids.length
      ? vids.map(function (v) { return videoCardHTML(v, "videos.html#watch-" + v.id); }).join("")
      : EMPTY_VIDEOS;
  }

  function renderVideosPage() {
    var grid = $("#video-grid");
    if (!grid) return;
    var vids = getVideos();
    var featWrap = $("#video-featured-wrap"), filters = $("#video-filters");
    if (!vids.length) {
      featWrap.hidden = true; filters.hidden = true;
      grid.className = ""; grid.innerHTML = EMPTY_VIDEOS;
      return;
    }
    // Featured: first featured:true (newest first), else newest
    var feat = vids.filter(function (v) { return v.featured; })[0] || vids[0];
    featWrap.hidden = false;
    $("#video-featured").innerHTML =
      '<div class="featured-video panel">' +
        '<button class="video-open" type="button" data-watch="' + esc(feat.id) + '">' + thumbHTML(feat) +
          '<span class="sr-only">Play ' + esc(feat.title) + "</span></button>" +
        '<div class="panel-body featured-info">' +
          '<span class="kicker">' + (feat.featured ? "Featured" : "Latest") + "</span>" +
          "<h2>" + esc(feat.title) + "</h2>" +
          '<div class="post-meta">' +
            (feat.category ? '<span class="tag pink">' + esc(feat.category) + "</span>" : "") +
            (feat.date ? "<time>" + esc(fmtDate(feat.date)) + "</time>" : "") + gameTag(feat.game) +
          "</div>" +
          (feat.description ? "<p>" + esc(feat.description) + "</p>" : "") +
          '<div class="btn-row"><button class="btn" type="button" data-watch="' + esc(feat.id) + '" data-icon="play">Watch</button></div>' +
        "</div>" +
      "</div>";

    // Category filters generated from the data
    var cats = [];
    vids.forEach(function (v) { if (v.category && cats.indexOf(v.category) < 0) cats.push(v.category); });
    filters.hidden = cats.length < 2;
    filters.innerHTML = ["All"].concat(cats).map(function (c, i) {
      return '<button type="button" class="filter-btn" data-cat="' + (i ? esc(c) : "") + '" aria-pressed="' + (i ? "false" : "true") + '">' + esc(c) + "</button>";
    }).join("");

    function draw(cat) {
      var list = vids.filter(function (v) { return !cat || v.category === cat; });
      grid.className = "grid grid-3";
      grid.innerHTML = list.map(function (v) { return videoCardHTML(v); }).join("");
    }
    draw("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest(".filter-btn");
      if (!b) return;
      $all(".filter-btn", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      draw(b.getAttribute("data-cat"));
    });
    document.addEventListener("click", function (e) {
      var w = e.target.closest("[data-watch]");
      if (w) openVideo(w.getAttribute("data-watch"), w);
    });
  }

  var videoLastFocus = null;
  function openVideo(id, trigger) {
    var modal = $("#video-modal");
    var v = getVideos().filter(function (x) { return x.id === id; })[0];
    if (!modal || !v) return;
    videoLastFocus = trigger || document.activeElement;
    var p = v.parsed, frame = $("#video-frame", modal);
    frame.classList.toggle("vertical", !!p.vertical);
    // Player is created only now, on click
    if ((p.kind === "youtube") || (p.kind === "twitch" && !p.needsHost)) {
      frame.innerHTML = '<iframe title="' + esc(v.title) + '" src="' + esc(p.embed) + '" ' +
        'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    } else if (p.kind === "mp4") {
      frame.innerHTML = '<video src="' + esc(p.src) + '" controls autoplay playsinline' + (v.thumb ? ' poster="' + esc(v.thumb) + '"' : "") + "></video>";
    } else {
      frame.innerHTML = '<div class="placeholder"><div><span class="pixel">Can\'t play this here</span><small>' +
        (p.kind === "twitch" ? "Twitch embeds need the site to be served from a web address." : "Unsupported link in js/videos.js.") +
        " Use the button below to watch it.</small></div></div>";
    }
    $("#video-title", modal).textContent = v.title;
    var ext = $("#video-ext", modal);
    ext.href = v.url;
    ext.textContent = p.kind === "mp4" ? "Open video file" : "Watch on " + (p.source || "original site");
    $("#video-meta", modal).innerHTML =
      (v.category ? '<span class="tag pink">' + esc(v.category) + "</span>" : "") +
      (v.date ? "<time>" + esc(fmtDate(v.date)) + "</time>" : "") + gameTag(v.game);
    $("#video-desc", modal).textContent = v.description;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (history.replaceState) history.replaceState(null, "", "#watch-" + v.id);
    $(".modal-close", modal).focus();
  }

  function closeVideo() {
    var modal = $("#video-modal");
    if (!modal || !modal.classList.contains("open")) return;
    $("#video-frame", modal).innerHTML = ""; // remove player -> playback stops
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (videoLastFocus && videoLastFocus.focus) videoLastFocus.focus();
  }

  function initVideoModal() {
    var modal = $("#video-modal");
    if (!modal) return;
    $all("[data-close]", modal).forEach(function (el) { el.addEventListener("click", closeVideo); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeVideo(); });
    var m = location.hash.match(/^#watch-(.+)$/);
    if (m) openVideo(decodeURIComponent(m[1]));
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    renderGames();
    renderNews();
    renderEvents();
    renderHomeVideos();
    renderVideosPage();
    initSocials();   // after rendering so dynamic content gets icons too
    initModal();
    initVideoModal();
  });
})();
