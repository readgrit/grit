/* ============================================================
   GRIT — SITE DATA  (the only file you normally edit)
   ------------------------------------------------------------
   SOLO-FRIENDLY UPDATE GUIDE
   - Rank a TEAM:    edit / reorder TEAMS[]  (array order = ranking)
   - Rank a PLAYER:  edit / reorder PROSPECTS[]
   - Log a RESULT:   add an object to the TOP of RESULTS[]
   - News:           you DON'T edit news here. Write it on Substack;
                     the site pulls your latest posts automatically.
   - Logos:          drop a file in assets/teams/ and set logo: "assets/teams/x.png"
                     (leave logo: "" and a clean monogram is drawn for you)
   - Movement:       prevRank = last update's position. null = NEW entry.
   ============================================================ */


/* ---- SITE SETTINGS ---------------------------------------- */
const SITE = {
  name: "GRIT",
  meaning: "Grind. Read. Improve. Track.",
  tagline: "The home for North American Counter-Strike. Rankings, prospects, and the scene.",
  substack: "https://readgrit.substack.com",
  /* Substack auto-pull. Your public RSS feed is <substack>/feed.
     We fetch it through a free RSS->JSON proxy (no server needed).
     If posts ever stop loading, swap the proxy below for another,
     e.g. "https://api.allorigins.win/raw?url=" + encoded feed.        */
  feed: "https://readgrit.substack.com/feed",
  rssProxy: "https://api.rss2json.com/v1/api.json?rss_url=",
  twitter: "https://twitter.com/readgrit",
  email: "contact@readgrit.us",
  domain: "readgrit.us"
};


/* ---- ABOUT ------------------------------------------------ */
const ABOUT = {
  kicker: "Who we are",
  title: "Somebody has to cover NA Counter-Strike like it matters. So we do.",
  lede: "GRIT is an independent, one-desk scouting and ranking project for North American Counter-Strike. We rank the teams, track the prospects, log the results, and write the weekly read — built to put light back on a region the rest of the world stopped watching.",
  blocks: [
    { h: "Why GRIT exists", ps: [
      "We are Counter-Strike lifers — 1.6 LANs, Source, thousands of hours in CS:GO, and still locked in for CS2. Somewhere along the way the coverage that made North America feel alive quietly went dark.",
      "The talent never left. The structure that pointed people at it did. GRIT rebuilds that structure: one ranking, one board, one honest read at a time." ] },
    { h: "What we're trying to revive", ps: [
      "NA has a visibility problem, not a talent problem. Players age out of college, grind FACEIT in silence, and stall in Advanced with nobody watching. Orgs scout blind and fans lose the thread.",
      "We point the crosshair back at the region — ranking who is actually good, surfacing who is next, and tracking the events that decide it." ] },
    { h: "The name", ps: [
      "GRIT is the region in a word. No infinite infrastructure, no easy path, no spotlight handed to anyone. The players who make it here grind for it.",
      "So that's the standard we hold ourselves to. Rankings are reasoned, not vibes. Prospects clear a published floor before they make the board." ] },
    { h: "One person, on purpose", ps: [
      "This is a solo project run around a full-time job. That keeps it honest and independent — no org pays us to rank their players, and a signing off our board is the proudest outcome, never a transaction.",
      "It also means the site stays lean: clean rankings you can trust, and the writing lives on Substack where it's easy to follow." ] }
  ],
  pillars: [
    { l: "G", n: "Grind", d: "We track the players nobody else is watching." },
    { l: "R", n: "Read", d: "A weekly scene digest, short enough to finish." },
    { l: "I", n: "Improve", d: "An honest ranking that moves when we're wrong." },
    { l: "T", n: "Track", d: "Prospects, teams, and NA results in one place." }
  ]
};


/* ---- NA TEAM RANKING -------------------------------------- */
/* SAMPLE DATA — replace with your own ranking. Array order = rank. */
const TEAMS = [
  { id:"t1", rank:2, prevRank:2, name:"Wildcard",  logo:"assets/teams/wildcard.png", region:"NA", points:0,
    roster:"susp · JBa · phantom · Sonic · oily", streak:["w","w","w","l","w"],
    note:"Top of the region and the only NA side troubling tier-one abroad." },
  { id:"t2", rank:1, prevRank:1, name:"M80",       logo:"assets/teams/m80.png", region:"NA", points:0,
    roster:"slaxz- · reck · Swisher · s1n · Lake", streak:["w","l","w","w","l"],
    note:"Slipped a spot after a soft event but firmly in the conversation." },
  { id:"t3", rank:3, prevRank:3, name:"Complexity", logo:"", region:"NA", points:0,
    roster:"JT · hallzerk · Grim · Twistzz · cxzi", streak:["w","w","l","w","w"],
    note:"Veteran core, steady results, ceiling tied to the AWP." },
  { id:"t4", rank:4, prevRank:6, name:"NRG",        logo:"", region:"NA", points:0,
    roster:"FaNg · ELITSHOT · oODLES · BnTeT · crashies", streak:["w","w","w","w","l"],
    note:"Biggest riser this update — four-map run through the open circuit." },
  { id:"t5", rank:5, prevRank:4, name:"Nouns",      logo:"", region:"NA", points:0,
    roster:"Pollen · n0rb3r7 · daps · slebog · mada", streak:["l","w","l","w","w"],
    note:"Project roster with real upside; consistency is the missing piece." },
  { id:"t6", rank:6, prevRank:5, name:"Liquid",     logo:"", region:"NA", points:0,
    roster:"NAF · ultimate · jks · siuhy · ne0sd", streak:["l","l","w","w","l"],
    note:"Rebuild year. Flashes of the old form, not yet the floor." },
  { id:"t7", rank:7, prevRank:9, name:"Take Flyte",  logo:"", region:"NA", points:0,
    roster:"vanity · Sl3n · aqua · rh1no · grimble", streak:["w","w","l","w","w"],
    note:"Challenger grinders climbing on a strong qualifier run." },
  { id:"t8", rank:8, prevRank:null, name:"BOSS",     logo:"", region:"NA", points:0,
    roster:"oSee · Walco · floppy · junior · Infinite", streak:["w","w","w","l","w"],
    note:"New to the ranking — an all-prospect lineup pulled off our board." }
];


/* ---- RECENT NA RESULTS ------------------------------------ */
/* Add newest at the TOP. Mark the winner with won:true.            */
const RESULTS = [
  { id:"r1", date:"2026-06-24", event:"ESL Challenger League S49 — NA",
    a:{ name:"Wildcard", score:2, won:true }, b:{ name:"M80", score:1, won:false },
    note:"Decider went the distance; Wildcard close out on Nuke." },
  { id:"r2", date:"2026-06-22", event:"ESEA Advanced — Playoffs",
    a:{ name:"NRG", score:2, won:true }, b:{ name:"Nouns", score:0, won:false },
    note:"NRG keep the win streak alive with a clean sweep." },
  { id:"r3", date:"2026-06-21", event:"CCT NA Series 4",
    a:{ name:"Complexity", score:2, won:true }, b:{ name:"Liquid", score:1, won:false },
    note:"Grim's entry numbers decide a tight third map." },
  { id:"r4", date:"2026-06-19", event:"Open Qualifier — RMR Pipeline",
    a:{ name:"Take Flyte", score:2, won:true }, b:{ name:"BOSS", score:1, won:false },
    note:"Prospect derby; Take Flyte punch through on overtime Ancient." }
];


/* ---- THE BIG BOARD (player ranking) ----------------------- */
/* Array order = ranking. prevRank: null = NEW.
   role: AWP | IGL | Entry | Rifler | Support | Lurker
   status: Watch | Rising | Signed                                  */
const PROSPECTS = [
  { id:"p1", rank:1, prevRank:2, handle:"oSee", role:"AWP", tier:"S",
    division:"FPL", team:"Free agent", status:"Watch", rating:"1.34", adr:"88.2", elo:"3800",
    note:"Former tier-one AWPer with FPL-level mechanics and elite opening duels." },
  { id:"p2", rank:2, prevRank:1, handle:"Walco", role:"Rifler", tier:"S",
    division:"ESL Challenger League", team:"BOSS", status:"Rising", rating:"1.22", adr:"84.7", elo:"",
    note:"Consistent impact at Challenger level; rating and ADR both track pro-tier." },
  { id:"p3", rank:3, prevRank:3, handle:"floppy", role:"Rifler", tier:"A",
    division:"FPL", team:"BOSS", status:"Watch", rating:"1.19", adr:"80.1", elo:"3600",
    note:"Smart positional rifler and FPL regular with elite ADR." },
  { id:"p4", rank:4, prevRank:6, handle:"Infinite", role:"IGL", tier:"A",
    division:"ESEA Advanced", team:"BOSS", status:"Rising", rating:"1.08", adr:"72.4", elo:"",
    note:"The most structured caller in Advanced; his teams overperform their firepower." },
  { id:"p5", rank:5, prevRank:5, handle:"Grim", role:"Entry", tier:"A",
    division:"ESEA Advanced", team:"Complexity", status:"Signed", signedTo:"Complexity",
    rating:"1.28", adr:"90.1", elo:"",
    note:"Tiered B on our first board. Signed within six weeks. The outcome the board exists to create." },
  { id:"p6", rank:6, prevRank:4, handle:"junior", role:"AWP", tier:"B",
    division:"FPL-C", team:"BOSS", status:"Watch", rating:"1.15", adr:"79.3", elo:"3400",
    note:"An FPL-C invite speaks for itself. Aggressive AWP, strong opening duels. Still nineteen." },
  { id:"p7", rank:7, prevRank:null, handle:"yay", role:"AWP", tier:"C",
    division:"FPL", team:"Free agent", status:"Watch", rating:"", adr:"", elo:"",
    note:"FPL-level ceiling and on the radar for a potential return. Watching closely." }
];


/* ---- THE SCOUTING FLOOR ----------------------------------- */
const SCOUTING_FLOOR = [
  { label:"FPL (Faceit Pro League)", primary:true },
  { label:"FPL-C (FPL Challenger)", primary:true },
  { label:"FACEIT Lvl 10, Top 1000 NA ELO", primary:true },
  { label:"ESL Challenger League", primary:false },
  { label:"ESEA Advanced", primary:false },
  { label:"Top Collegiate Program", primary:false }
];

/* ---- TIER BAND LABELS ------------------------------------- */
const TIER_INFO = {
  S:{ name:"Pro-Ready", desc:"ESL Challenger or FPL level. Should have a contract now." },
  A:{ name:"Breakout",  desc:"Advanced standout or FPL-C regular. A signing is coming." },
  B:{ name:"Prospect",  desc:"Top Advanced or collegiate. Trajectory confirmed, needs time." },
  C:{ name:"Radar",     desc:"Early watch. Real upside, not yet fully proven." }
};
