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


/* ---- TEAM BOARD (VRS + GRIT) ------------------------------ */
/* ONE list, TWO rankings. The Teams page toggles between them.
   - VRS:  official HLTV Americas VRS points (NA teams), Jun 2026.
           VRS RANK IS AUTO-COMPUTED from vrsPoints — you only edit the
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
  /* === GRIT-ranked (15) — these appear in the GRIT view, tiered === */
  { id:'m80', name:'M80', logo:"assets/teams/m80.png", region:"NA",
    roster:'slaxz- · Swisher · s1n · JBa · Lake', vrsPoints:1405,
    gritRank:1, gritPrev:1, streak:["w","l"],
    note:"NA's best right now and into Major Stage 2. The standard the rest are chasing." },
  { id:'wildcard', name:'Wildcard', logo:"assets/teams/wildcard.png", region:"NA",
    roster:'nEMANHA · mhL · Cxzi · reck · HexT', vrsPoints:1349,
    gritRank:2, gritPrev:2, streak:[],
    note:'Major mainstay with a high ceiling; consistency is the last step.' },
  { id:'liquid', name:'Liquid', logo:"assets/teams/liquid.png", region:"NA",
    roster:'NAF · EliGE · malbsMd · siuhy · ultimate', vrsPoints:1277,
    gritRank:3, gritPrev:3, streak:["w"],
    note:"Rebuild is clicking — a Stage 1 scalp of HEROIC says it's real." },
  { id:'nrg', name:'NRG', logo:"assets/teams/nrg.png", region:"NA",
    roster:'nitr0 · Sonic · oSee · Grim · br0', vrsPoints:1198,
    gritRank:4, gritPrev:4, streak:["l"],
    note:"oSee's firepower keeps them dangerous even after the derby loss." },
  { id:'voca', name:'Voca', logo:"assets/teams/voca.png", region:"NA",
    roster:'junior · nosraC · shane · snav · Jeorge', vrsPoints:1151,
    gritRank:5, gritPrev:5, streak:[],
    note:"All-American five that's quietly become a top-five NA side." },
  { id:'chickencoop', name:'Chicken Coop', logo:"assets/teams/chickencoop.png", region:"NA",
    roster:'mds · Drop · REKMEISTER · jared · Crisp', vrsPoints:1016,
    gritRank:6, gritPrev:6, streak:["w","w"],
    note:'FRAG TAP champions; beating the teams around them, not just hanging.' },
  { id:'marsborne', name:'Marsborne', logo:"assets/teams/marsborne.png", region:"NA",
    roster:'freshie · Grizz · ogwizard · marekiew · WUMBO', vrsPoints:1005,
    gritRank:7, gritPrev:7, streak:["l","w","l"],
    note:'A final run shows the ceiling; back-to-back losses to CC show the gap.' },
  { id:'lag', name:'LAG', logo:"assets/teams/lag.png", region:"NA",
    roster:'djay · Cryptic · kmrn · nicx · Sandman', vrsPoints:870,
    gritRank:8, gritPrev:8, streak:[],
    note:'Experienced core grinding the qualifier circuit.' },
  { id:'regain', name:'regain', logo:"assets/teams/regain.png", region:"NA",
    roster:'grape · Zucar · dvrk · sasha · fuzenko', vrsPoints:817,
    gritRank:9, gritPrev:9, streak:[],
    note:'Young domestic roster with results that outrun their ranking.' },
  { id:'iowastormboar', name:'Iowa Stormboar', logo:"assets/teams/iowastormboar.png", region:"NA",
    roster:'jsfeltner · TyRa · H0NeST · aelor · Scorchyy', vrsPoints:802,
    gritRank:10, gritPrev:10, streak:[],
    note:'Midwest grinders turning heads in open qualifiers.' },
  { id:'zomblers', name:'Zomblers', logo:"assets/teams/zomblers.png", region:"NA",
    roster:'CAJUN · Pose1doNN · CoolComs · FxRE · Zoker', vrsPoints:785,
    gritRank:11, gritPrev:11, streak:[],
    note:"Scrappy lineup that punches up — one of the watch list's best stories." },
  { id:'f5', name:'F5', logo:"assets/teams/f5.png", region:"NA",
    roster:'Kermi · neight · bones · cmrn · Signal', vrsPoints:759,
    gritRank:12, gritPrev:12, streak:[],
    note:'All-US project with upside at the Advanced level.' },
  { id:'empire', name:'EMPIRE', logo:"assets/teams/empire.png", region:"NA",
    roster:'KmZ · C0C0 · twigs · BAGEL · no1nx', vrsPoints:703,
    gritRank:13, gritPrev:13, streak:[],
    note:'Developmental core worth tracking through the dead period.' },
  { id:'wantedgoons', name:'Wanted Goons', logo:"assets/teams/wantedgoons.png", region:"NA",
    roster:'Magic · Johan · killerPandas · hibui · relt', vrsPoints:668,
    gritRank:14, gritPrev:14, streak:[],
    note:'Mixed roster fighting for a foothold on the domestic ladder.' },
  { id:'villainous', name:'Villainous', logo:"assets/teams/villainous.png", region:"NA",
    roster:'Panic · DYLAN · Sunk · Burglar · Jolts', vrsPoints:669,
    gritRank:15, gritPrev:15, streak:[],
    note:"Canadian side that's the definition of a riser — earning every look." },

  /* === VRS-only (broader board) — no gritRank yet. Promote a team into
     the GRIT ranking by giving it a gritRank (and bump the others down). === */
  { id:'sportsbetexpert', name:'SportsBetExpert', logo:"assets/teams/sportsbetexpert.png", region:"NA",
    roster:'WolfY · motm · consti · dare · Peeping', vrsPoints:854,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'boss', name:'BOSS', logo:"assets/teams/boss.png", region:"NA",
    roster:'ben1337 · Bwills · SLIGHT · marekiew · WUMBO', vrsPoints:797,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'farmville', name:'FarmVille', logo:"assets/teams/farmville.png", region:"NA",
    roster:'cJ dA K1nG · calamity · BeaKie · sleepz0rk · adam', vrsPoints:794,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'insaneplayers', name:'insane players', logo:"assets/teams/insaneplayers.png", region:"NA",
    roster:'Wolffe · freshie · Fruitcupx · ogwizard · sml', vrsPoints:712,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'reignabove', name:'Reign Above', logo:"assets/teams/reignabove.png", region:"NA",
    roster:'louie · dAVE · SeRCEra · AEROj · cobalt', vrsPoints:698,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'rave', name:'Rave', logo:"assets/teams/rave.png", region:"NA",
    roster:'junior · Cryptic · Walco · Pluto · laxiee', vrsPoints:661,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'detonate', name:'Detonate', logo:"assets/teams/detonate.png", region:"NA",
    roster:'carN · Feral · tatm · chante · duhpe', vrsPoints:639,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'overtakesector', name:'Overtake Sector', logo:"assets/teams/overtakesector.png", region:"NA",
    roster:'intra · Umar · LEARSI · jason · sacrifice', vrsPoints:631,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'900fpsvseco', name:'900FPSvsECO', logo:"assets/teams/900fpsvseco.png", region:"NA",
    roster:'Gabe · mds · Termina · Valter0k · Zoker', vrsPoints:628,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'shimmer', name:'Shimmer', logo:"assets/teams/shimmer.png", region:"NA",
    roster:'alicerawr · Stx · empathy · Serendipity · AVA174', vrsPoints:616,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'outfit49', name:'Outfit 49', logo:"assets/teams/outfit49.png", region:"NA",
    roster:'Gabe · mds · H0NeST · Valter0k · Grimblee', vrsPoints:606,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'incognito', name:'Incognito', logo:"assets/teams/incognito.png", region:"NA",
    roster:'micro · arcade · Tender · Sathsea · AbbyDog', vrsPoints:572,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'flyquestred', name:'FlyQuest RED', logo:"assets/teams/flyquestred.png", region:"NA",
    roster:'Emy · BiBiAhn · vanessa · Fawx · marie', vrsPoints:556,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'surge', name:'Surge', logo:"assets/teams/surge.png", region:"NA",
    roster:'Electrician · frog · TheJelly · Molly', vrsPoints:520,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'nutorious', name:'NuTorious', logo:"assets/teams/nutorious.png", region:"NA",
    roster:'Austin · Toasty · Msaia · sayN', vrsPoints:504,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'girlkissers', name:'girl kissers', logo:"assets/teams/girlkissers.png", region:"NA",
    roster:'violet · lunari · TeXaSs · kevin', vrsPoints:498,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'frz', name:'FRZ', logo:"assets/teams/frz.png", region:"NA",
    roster:'Jachro · j3nni · Sharpie · toasty · brawckzz', vrsPoints:481,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'mythic', name:'Mythic', logo:"assets/teams/mythic.png", region:"NA",
    roster:'fl0m · Cooper · PwnAlone · hyza · Trucklover86', vrsPoints:478,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'elites', name:'ELITES', logo:"assets/teams/elites.png", region:"NA",
    roster:'zockie · Slayerhz · Notjuanjo · BabyRage · Antuanette', vrsPoints:475,
    gritRank:null, gritPrev:null, streak:[], note:"" },
  { id:'beyondlimits', name:'Beyond Limits', logo:"assets/teams/beyondlimits.png", region:"NA",
    roster:'doltn · Beastman · flixxy · Pr0mise', vrsPoints:420,
    gritRank:null, gritPrev:null, streak:[], note:"" },
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
