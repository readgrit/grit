# GRIT — managing the site

A static site (HTML/CSS/JS). No build step, no server. Host it on GitHub Pages.
**You only ever edit `data.js`.** Everything you *write* goes on Substack and shows up automatically.

## Update the rankings / results (the only file you touch)
Open `data.js`:
- **Team ranking** → edit `TEAMS[]`. The array order *is* the ranking; set each `rank` to match. `prevRank` is where it sat last update (`null` = new entry → shows "NEW").
- **Prospect board** → edit `PROSPECTS[]`. Same rules. `tier` is just the band label (S/A/B/C).
- **Recent results** → add a new object to the **top** of `RESULTS[]`. Mark the winner with `won:true`.
- **About text** → edit the `ABOUT` object.

Commit the change → GitHub Pages redeploys in ~1 min. You can do this from the GitHub mobile/web editor on your phone.

## News
You do **not** edit news on the site. Write posts on Substack; the homepage auto-pulls your latest 3 via your RSS feed (`<substack>/feed`) through a free RSS→JSON proxy. No server needed.
- Set your real Substack URL in `data.js → SITE.substack` and `SITE.feed`.
- If posts ever stop loading (proxy rate-limit), swap `SITE.rssProxy` for another, e.g.
  `"https://api.allorigins.win/raw?url="`. A clean "Read on Substack" card shows automatically if the feed can't load, so the page never looks broken.

## Logos
There's no free public API that serves CS team logos to a static site (PandaScore etc. are paid + require a backend). So: drop an image in `assets/teams/` and set `logo: "assets/teams/wildcard.png"` on that team. Leave `logo: ""` and a clean monogram is drawn automatically.

## Theme
Dark (chrome + electric blue) by default; a Light "silver" mode toggle lives in the masthead. Choice is remembered per visitor.

## Files
- `index.html` `teams.html` `board.html` `about.html` — the pages
- `styles.css` — design system (light + dark)
- `app.js` — rendering + Substack pull (don't need to edit)
- `data.js` — **your content**
- `grit-logo.png` — electric-blue logo (`grit-logo-orig.png` is the original orange version)
