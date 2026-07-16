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
  /* Auto-updating NA results feed (your Cloudflare Worker URL).
     Leave "" to keep the hand-written RESULTS below. Once the
     Worker is live, set e.g. "https://grit-feed.<you>.workers.dev". */
  resultsFeed: "",
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



/* ---- FEATURED EVENT ---------------------------------------
   The one event GRIT is putting its weight behind. Set live:false
   to hide the block. Facts below are from nstlga.gg/league
   (checked 16 Jul 2026). Update `tag` when the registration state
   changes — it is the field that goes stale fastest.
   ---------------------------------------------------------- */
const EVENT = {
  live: true,
  tag: "Waitlist open \u00b7 closes 31 July",
  name: "NSTLGA League Season 2",
  deck: "The biggest open league in North American Counter-Strike. 64 teams, $10,000, three stages, and \u2014 the part that matters \u2014 it is VRS enabled. Win here and it moves you on the same board the Major invites come off. The paid slots are gone, but the waitlist is live until 31 July, and waitlisted teams pay nothing unless they get in.",
  facts: [
    { k: "Prize pool", v: "$10,000" },
    { k: "Team cap",   v: "64" },
    { k: "Seeded on",  v: "VRS \u00b7 3 Aug" },
    { k: "Playoffs",   v: "Sept 9\u201313" }
  ],
  note: "Three stages: Ruby & Sapphire conferences through August (Bo1 round robin, 56-team cap), a 16-team Swiss group stage 2\u20136 September, then a top-eight double-elimination playoff 9\u201313 September with a Bo5 grand final and no map advantage. All eight playoff teams get paid; first takes $5,000. The pool scales with signups ($1,250 at eight teams, $10,000 at 64). Hosted on FACEIT, open to US and Canadian teams, VRS-enabled for groups and playoffs. Stage 2 pre-seeds the top eight VRS teams as of 3 August.",
  href: "https://www.nstlga.gg/league",
  cta: "Event details",
  links: [
    { label: "Join the waitlist", href: "https://forms.gle/7MJBmFXrvM5unviTA" },
    { label: "Registered teams",  href: "https://docs.google.com/spreadsheets/d/1Gt7aF330tjO8P4ItXR9HrtB2B1GapibqsHLGXWrgy_I/edit?usp=sharing" },
    { label: "Discord",           href: "https://discord.gg/myVtB58C35" }
  ]
};

/* ---- TEAM BOARD (VRS + GRIT) ------------------------------ */
/* ONE list, TWO rankings. The Teams page toggles between them.
   - VRS:  official HLTV Americas VRS points (NA teams), Jun 2026.
           Points: HLTV Americas VRS, 16 Jul 2026 (beta board; last
           official was 6 Jul). VRS RANK IS AUTO-COMPUTED from vrsPoints — you only edit the
           points; the board re-sorts itself. 35 teams tracked.
   - GRIT: YOUR ranking. Reorder by changing gritRank (1 = best).
           Tiers are derived from gritRank by GRIT_TIERS below
           (1-5 Established, 6-10 Contenders, 11-15 Risers).
           gritPrev = the team's gritRank on your LAST update; set it
           when you re-rank so the movement arrows are real. It is flat
           now (= baseline) and the VRS delta reads "=" until you start
           disagreeing with VRS — which is exactly the content.
   Logos: assets/teams/<name>.png (monogram shows until you add one).
   NOTE: the GRIT order below is a STARTING DRAFT (VRS order up top,
   sub-tier teams seeded by their results). Make it yours.              */
const GRIT_TIERS = [
  { key:"Established", name:"Established", desc:"Proven NA tier — VRS-ranked and holding their level.", max:5 },
  { key:"Contenders",  name:"Contenders",  desc:"Knocking on the door — beating ranked teams, not just hanging with them.", max:10 },
  { key:"Risers",      name:"Risers",      desc:"Emerging sides with real upside, earning their place on the board.", max:15 }
];

const TEAMS = [
  /* === GRIT-ranked — curated, tiered. Reorder with gritRank. === */
  { id:'m80', name:'M80', logo:"assets/teams/m80.png", region:"NA",
    roster:'slaxz- · Swisher · s1n · JBa · Lake', vrsPoints:1408,
    gritRank:1, gritPrev:1, streak:[],
    note:"Still NA's best on points and the only NA side inside the Americas top five." },
  { id:'wildcard', name:'Wildcard', logo:"assets/teams/wildcard.png", region:"NA",
    roster:'nEMANHA · mhL · Cxzi · reck · HexT', vrsPoints:1302,
    gritRank:2, gritPrev:2, streak:[],
    note:'Slid 56 points since 1 July — the drop that opened the gap to Liquid and NRG.' },
  { id:'liquid', name:'Liquid', logo:"assets/teams/liquid.png", region:"NA",
    roster:'NAF · EliGE · malbsMd · siuhy · ultimate', vrsPoints:1261,
    gritRank:3, gritPrev:3, streak:[],
    note:'Rebuild holding steady; the NA #3 spot is now a three-way fight.' },
  { id:'nrg', name:'NRG', logo:"assets/teams/nrg.png", region:"NA",
    roster:'nitr0 · Sonic · oSee · Grim · br0', vrsPoints:1246,
    gritRank:4, gritPrev:4, streak:[],
    note:"Up 71 points in two weeks, the sharpest riser in NA's top five." },
  { id:'voca', name:'Voca', logo:"assets/teams/voca.png", region:"NA",
    roster:'junior · nosraC · shane · snav · Jeorge', vrsPoints:1098,
    gritRank:5, gritPrev:5, streak:[],
    note:'All-American five, but down 53 points since the start of July.' },
  { id:'chickencoop', name:'Chicken Coop', logo:"assets/teams/chickencoop.png", region:"NA",
    roster:'mds · Drop · REKMEISTER · jared · Crisp', vrsPoints:1024,
    gritRank:6, gritPrev:6, streak:[],
    note:'Holding just above the 1,000-point line.' },
  { id:'marsborne', name:'Marsborne', logo:"assets/teams/marsborne.png", region:"NA",
    roster:'freshie · Grizz · ogwizard · marekiew · WUMBO', vrsPoints:977,
    gritRank:7, gritPrev:7, streak:[],
    note:"Two of NA's three HLTV-ranked prospects (Grizz, ogwizard) play here." },
  { id:'lag', name:'LAG', logo:"assets/teams/lag.png", region:"NA",
    roster:'djay · Cryptic · kmrn · nicx · Sandman', vrsPoints:866,
    gritRank:8, gritPrev:8, streak:[],
    note:'Experienced core grinding the qualifier circuit.' },
  { id:'regain', name:'regain', logo:"assets/teams/regain.png", region:"NA",
    roster:'grape · Zucar · dvrk · sasha · H0NeST', vrsPoints:855,
    gritRank:9, gritPrev:9, streak:[],
    note:'H0NeST in for fuzenko, and up 38 points since 1 July.' },
  { id:'iowastormboar', name:'Iowa Stormboar', logo:"assets/teams/iowastormboar.png", region:"NA",
    roster:'jsfeltner · TyRa · H0NeST · aelor · Scorchyy', vrsPoints:793,
    gritRank:10, gritPrev:10, streak:[],
    note:'Midwest grinders holding their place on the board.' },
  { id:'nutorious', name:'NuTorious', logo:"assets/teams/nutorious.png", region:"NA",
    roster:'Kermi · neight · bones · cmrn · Signal', vrsPoints:769,
    gritRank:12, gritPrev:12, streak:[],
    note:'The ex-F5 five (Kermi, neight, bones, cmrn, Signal) now under the NuTorious banner.' },
  { id:'zomblers', name:'Zomblers', logo:"assets/teams/zomblers.png", region:"NA",
    roster:'CAJUN · Pose1doNN · CoolComs · FxRE · Zoker', vrsPoints:765,
    gritRank:11, gritPrev:11, streak:[],
    note:'Scrappy lineup that punches up.' },
  { id:'villainous', name:'Villainous', logo:"assets/teams/villainous.png", region:"NA",
    roster:'Panic · DYLAN · Sunk · Burglar · Jolts', vrsPoints:755,
    gritRank:15, gritPrev:15, streak:[],
    note:'Up 89 points since 1 July — the biggest riser on the GRIT board.' },
  { id:'empire', name:'EMPIRE', logo:"assets/teams/empire.png", region:"NA",
    roster:'KmZ · C0C0 · twigs · BAGEL · no1nx', vrsPoints:691,
    gritRank:13, gritPrev:13, streak:[],
    note:'Developmental core worth tracking through the dead period.' },
  { id:'wantedgoons', name:'Wanted Goons', logo:"assets/teams/wantedgoons.png", region:"NA",
    roster:'Magic · Johan · killerPandas · hibui · relt', vrsPoints:649,
    gritRank:14, gritPrev:14, streak:[],
    note:'Mixed roster fighting for a foothold on the domestic ladder.' },

  /* === VRS-only. Give one a gritRank to promote it onto the GRIT board. === */
  { id:'sportsbetexpert', name:'SportsBetExpert', logo:"assets/teams/sportsbetexpert.png", region:"NA",
    roster:'WolfY · motm · consti · dare · Peeping', vrsPoints:943,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'boss', name:'BOSS', logo:"assets/teams/boss.png", region:"NA",
    roster:'ben1337 · Bwills · SLIGHT · marekiew · WUMBO', vrsPoints:775,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'farmville', name:'FarmVille', logo:"assets/teams/farmville.png", region:"NA",
    roster:'cJ dA K1nG · calamity · BeaKie · sleepz0rk · adam', vrsPoints:737,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'aether', name:'Aether', logo:"assets/teams/aether.png", region:"NA",
    roster:'brett · Andrew · Seb · xaler · H0NeST', vrsPoints:711,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'insaneplayers', name:'insane players', logo:"assets/teams/insaneplayers.png", region:"NA",
    roster:'Wolffe · freshie · Fruitcupx · ogwizard · sml', vrsPoints:695,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'reignabove', name:'Reign Above', logo:"assets/teams/reignabove.png", region:"NA",
    roster:'louie · dAVE · SeRCEra · AEROj · cobalt', vrsPoints:693,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'overtakesector', name:'Overtake Sector', logo:"assets/teams/overtakesector.png", region:"NA",
    roster:'intra · Umar · LEARSI · jason · sacrifice', vrsPoints:650,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'detonate', name:'Detonate', logo:"assets/teams/detonate.png", region:"NA",
    roster:'carN · Feral · tatm · chante · duhpe', vrsPoints:646,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'shimmer', name:'Shimmer', logo:"assets/teams/shimmer.png", region:"NA",
    roster:'alicerawr · Stx · empathy · Serendipity · AVA174', vrsPoints:643,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'rave', name:'Rave', logo:"assets/teams/rave.png", region:"NA",
    roster:'junior · Cryptic · Walco · Pluto · laxiee', vrsPoints:628,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'900fpsvseco', name:'900FPSvsECO', logo:"assets/teams/900fpsvseco.png", region:"NA",
    roster:'Gabe · mds · Termina · Valter0k · Zoker', vrsPoints:617,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'festinalente', name:'Festina Lente', logo:"assets/teams/festinalente.png", region:"NA",
    roster:'FRIZZY · Fruitcupx · Maxuel · gamble', vrsPoints:604,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'outfit49', name:'Outfit 49', logo:"assets/teams/outfit49.png", region:"NA",
    roster:'Gabe · mds · H0NeST · Valter0k · Grimblee', vrsPoints:601,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'incognito', name:'Incognito', logo:"assets/teams/incognito.png", region:"NA",
    roster:'micro · arcade · Tender · Sathsea · AbbyDog', vrsPoints:562,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'surge', name:'Surge', logo:"assets/teams/surge.png", region:"NA",
    roster:'Electrician · frog · TheJelly · Molly', vrsPoints:515,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'girlkissers', name:'girl kissers', logo:"assets/teams/girlkissers.png", region:"NA",
    roster:'violet · lunari · TeXaSs · kevin', vrsPoints:500,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'elites', name:'ELITES', logo:"assets/teams/elites.png", region:"NA",
    roster:'zockie · Slayerhz · Notjuanjo · BabyRage · Antuanette', vrsPoints:483,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'mythic', name:'Mythic', logo:"assets/teams/mythic.png", region:"NA",
    roster:'fl0m · Cooper · PwnAlone · hyza · Trucklover86', vrsPoints:480,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'flyquestred', name:'FlyQuest RED', logo:"assets/teams/flyquestred.png", region:"NA",
    roster:'Emy · BiBiAhn · vanessa · Fawx · marie', vrsPoints:479,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'frz', name:'FRZ', logo:"assets/teams/frz.png", region:"NA",
    roster:'Jachro · j3nni · Sharpie · toasty · brawckzz', vrsPoints:475,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'raisedbypixels', name:'raisedbypixels', logo:"assets/teams/raisedbypixels.png", region:"NA",
    roster:'flacko · bright · atyla · 1luke', vrsPoints:471,
    gritRank:null, gritPrev:null, streak:[], note:'' },
  { id:'beyondlimits', name:'Beyond Limits', logo:"assets/teams/beyondlimits.png", region:"NA",
    roster:'doltn · Beastman · flixxy · Pr0mise', vrsPoints:null,
    gritRank:null, gritPrev:null, streak:[], note:"Outside HLTV's tracked Americas list as of 16 Jul 2026." },
];


/* ---- RECENT NA RESULTS ------------------------------------ */
/* Real results pulled from HLTV. Add newest at the TOP; mark the
   winner's side with won:true. Scores are series (maps).               */
const RESULTS = [
  { id:"r1", date:"2026-06-04", event:"IEM Cologne Major 2026 — Stage 1",
    a:{ name:"M80", score:2, won:true }, b:{ name:"NRG", score:0, won:false },
    note:"M80 take the all-NA derby and book a Stage 2 spot." },
  { id:"r2", date:"2026-06-04", event:"IEM Cologne Major 2026 — Stage 1",
    a:{ name:"Liquid", score:2, won:true }, b:{ name:"HEROIC", score:0, won:false },
    note:"Liquid knock HEROIC out of the Major in Stage 1." },
  { id:"r3", date:"2026-06-03", event:"IEM Cologne Major 2026 — Stage 1",
    a:{ name:"B8", score:2, won:true }, b:{ name:"M80", score:0, won:false },
    note:"B8 send M80 down to the elimination bracket." },
  { id:"r4", date:"2026-06-01", event:"FRAG TAP Reloaded 2026",
    a:{ name:"Chicken Coop", score:3, won:true }, b:{ name:"Marsborne", score:2, won:false },
    note:"Five-map thriller; Chicken Coop edge the all-NA final." },
  { id:"r5", date:"2026-05-31", event:"FRAG TAP Reloaded 2026",
    a:{ name:"Marsborne", score:2, won:true }, b:{ name:"SportsBetExpert", score:0, won:false },
    note:"Marsborne cruise into the final." }
];


/* ---- THE BIG BOARD (player ranking) ----------------------- */
/* Array order = ranking. prevRank: null = NEW.
   role: AWP | IGL | Entry | Rifler | Support | Lurker
   status: Watch | Rising | Signed                                  */
const PROSPECTS = [
  { id:"p1", rank:1, prevRank:null, handle:'Grizz', role:'Rifler', tier:'S',
    division:'HLTV Prospects #20', team:'Marsborne', status:"Watch", rating:'1.05', adr:null, elo:null,
    note:"Highest-ranked NA player on HLTV's global Top 50 Prospects (July 2026) — first NA player since Lake to crack the top 20. Posted a 1.22 rating at FRAG TAP Reloaded." },
  { id:"p2", rank:2, prevRank:null, handle:'ogwizard', role:'Rifler', tier:'S',
    division:'HLTV Prospects #49', team:'Marsborne', status:"Watch", rating:'1.09', adr:null, elo:null,
    note:"Debuted on HLTV's Top 50 in July, taking the final NA slot ahead of teammate WUMBO. Best rating of any NA name here at 1.09 over 390 maps." },
  { id:"p3", rank:3, prevRank:null, handle:'PwnAlone', role:'Rifler', tier:'A',
    division:'FPL North America #1', team:'Mythic', status:"Watch", rating:null, adr:null, elo:null,
    note:'Tops the FACEIT Pro League NA leaderboard. Clears the FPL floor outright.' },
  { id:"p4", rank:4, prevRank:null, handle:'calamity', role:'Rifler', tier:'A',
    division:'FPL North America #2', team:'FarmVille', status:"Watch", rating:null, adr:null, elo:null,
    note:'Second on the FPL NA ladder while anchoring FarmVille.' },
  { id:"p5", rank:5, prevRank:null, handle:'BeaKie', role:'Rifler', tier:'A',
    division:'FPL North America #3', team:'FarmVille', status:"Watch", rating:null, adr:null, elo:null,
    note:"Third on FPL NA; the other half of FarmVille's Canadian core." },
  { id:"p6", rank:6, prevRank:null, handle:'Valter0k', role:'Rifler', tier:'A',
    division:'FPL North America #4', team:'900FPSvsECO', status:"Watch", rating:null, adr:null, elo:null,
    note:'Fourth on FPL NA. Also listed on Outfit 49 — plays across both rosters.' },
  { id:"p7", rank:7, prevRank:null, handle:'kmrn', role:'Rifler', tier:'A',
    division:'FPL North America #5', team:'LAG', status:"Watch", rating:null, adr:null, elo:null,
    note:'Fifth on FPL NA and a starter on a VRS-ranked side in LAG.' },
  { id:"p8", rank:8, prevRank:null, handle:'WUMBO', role:'Rifler', tier:'B',
    division:'Just outside HLTV Top 50', team:'Marsborne', status:"Watch", rating:'1.05', adr:null, elo:null,
    note:"Overtaken by ogwizard for the final NA slot on HLTV's Top 50. 19 years old with only 80 maps — the smallest sample here." },
  { id:"p9", rank:9, prevRank:null, handle:'Lake', role:'Rifler', tier:'B',
    division:'HLTV Prospects graduate', team:'M80', status:"Watch", rating:'1.06', adr:null, elo:null,
    note:'The benchmark NA prospect before Grizz. Now starting for the best team in the region.' },
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
