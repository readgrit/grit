/* ============================================================
   GRIT: SITE DATA
   ------------------------------------------------------------
   This is the only file you normally need to edit.

   TO ADD A NEWS ARTICLE: add a new object to the top of NEWS.
   TO UPDATE THE BOARD:    edit, add, or remove objects in PROSPECTS.

   Newest items go at the TOP of each list.
   ============================================================ */


/* ---- SITE SETTINGS ---------------------------------------- */
const SITE = {
  name: "GRIT",
  meaning: "Grind. Read. Improve. Track.",
  tagline: "We find the players before the orgs do.",
  blurb: "Weekly scouting intel for North American Counter-Strike.",
  substack: "https://readgrit.substack.com",
  twitter: "https://twitter.com/readgrit",
  email: "contact@readgrit.us",
  domain: "readgrit.us"
};


/* ---- NEWS & ARTICLES -------------------------------------- */
/* category options: "Roster Move", "Tournament", "Scene Report",
   "Prospect Watch", "Opinion"
   Each paragraph in "body" is its own string in the array.       */
const NEWS = [
  {
    id: "n1",
    title: "The Collegiate Cliff Is Still NA's Biggest Blind Spot",
    category: "Scene Report",
    author: "GRIT Desk",
    date: "2026-06-24",
    featured: true,
    excerpt: "Every spring, dozens of capable players graduate out of college Counter-Strike and vanish. The talent does not disappear. The coverage does.",
    body: [
      "Every spring, dozens of capable players graduate out of college Counter-Strike and quietly stop competing. They were never bad. They simply ran out of a structure that pointed scouts at them.",
      "Collegiate programs like NACE, CSL, and NECC produce real talent, but the moment a player walks across the stage their visibility drops to zero. There is no draft, no combine, and almost no media following the transition. A senior who anchored a top-eight college roster can be a free agent two months later with nobody watching.",
      "That gap is exactly where GRIT does its work. We track graduating seniors who clear the scouting floor and keep them on the radar through the dead period, so that when an org finally goes looking, the trail is already laid."
    ]
  },
  {
    id: "n2",
    title: "Reading FACEIT: Why Top 1000 ELO Is Not Enough On Its Own",
    category: "Opinion",
    author: "GRIT Desk",
    date: "2026-06-20",
    featured: false,
    excerpt: "A high ELO tells you someone can win pugs. It does not tell you whether they can hold a role on a structured team. Here is what we look at instead.",
    body: [
      "A high FACEIT ELO is a starting point, not a verdict. It tells you a player can win disorganized matches against strong opponents. It does not tell you whether they can hold a defined role, take direction, or perform when the game slows down.",
      "When we evaluate a FACEIT grinder, raw ELO is one input among several. We look at consistency across a large sample, opening duel success, multi-kill rates, and how their numbers hold up against other top-ranked opponents rather than against the field at large.",
      "The players who matter are the ones whose impact survives contact with structure. That is the difference between a pug star and a prospect."
    ]
  },
  {
    id: "n3",
    title: "Three Free Agents Worth A Trial Right Now",
    category: "Prospect Watch",
    author: "GRIT Desk",
    date: "2026-06-17",
    featured: false,
    excerpt: "Our quick read on three unsigned players who are doing more than their current situation suggests. Full writeups live on the board.",
    body: [
      "This week we are watching three free agents whose recent form outpaces their roster status.",
      "An FPL-level AWPer with elite opening duel numbers, an Advanced IGL whose teams consistently overperform their firepower, and an FPL-C rifler who is still only nineteen. None of them are signed. All of them should be getting trials.",
      "Full scouting notes and stats for each live on the big board. If you run a roster and any of these names fit a hole, the contact details are there too."
    ]
  }
];


/* ---- THE BIG BOARD ---------------------------------------- */
/* tier:     "S" | "A" | "B" | "C"
   role:     "AWP" | "IGL" | "Entry" | "Rifler" | "Support" | "Lurker"
   status:   "Watch" | "Rising" | "Signed"
   division: see the scouting floor below
   rating / adr / elo: leave as "" if you do not have the number
   signedTo: only used when status is "Signed"                    */
const PROSPECTS = [
  {
    id: "p1", handle: "oSee", role: "AWP", tier: "S",
    division: "FPL", team: "Free agent", status: "Watch",
    rating: "1.34", adr: "88.2", elo: "3800",
    note: "Former tier-one AWPer with FPL-level mechanics and elite opening duels. Unsigned and motivated.",
    faceit: "", twitter: ""
  },
  {
    id: "p2", handle: "Walco", role: "Rifler", tier: "S",
    division: "ESL Challenger League", team: "Placeholder", status: "Rising",
    rating: "1.22", adr: "84.7", elo: "",
    note: "Consistent impact at Challenger level. Rating and ADR both track pro-tier. Next stop is tier-one.",
    faceit: "", twitter: ""
  },
  {
    id: "p3", handle: "floppy", role: "Rifler", tier: "A",
    division: "FPL", team: "Free agent", status: "Watch",
    rating: "1.19", adr: "80.1", elo: "3600",
    note: "Smart positional rifler and FPL regular with elite ADR. Was under-leveraged on his last roster.",
    faceit: "", twitter: ""
  },
  {
    id: "p4", handle: "Infinite", role: "IGL", tier: "A",
    division: "ESEA Advanced", team: "Free agent", status: "Rising",
    rating: "1.08", adr: "72.4", elo: "",
    note: "The most structured caller in Advanced. His teams consistently overperform their individual firepower.",
    faceit: "", twitter: ""
  },
  {
    id: "p5", handle: "junior", role: "AWP", tier: "B",
    division: "FPL-C", team: "Free agent", status: "Watch",
    rating: "1.15", adr: "79.3", elo: "3400",
    note: "An FPL-C invite speaks for itself. Aggressive AWP with strong opening duel numbers. Still only nineteen.",
    faceit: "", twitter: ""
  },
  {
    id: "p6", handle: "Grim", role: "Entry", tier: "A",
    division: "ESEA Advanced", team: "Signed", status: "Signed", signedTo: "a Challenger roster",
    rating: "1.28", adr: "90.1", elo: "",
    note: "Tiered B on our first board. Signed within six weeks. This is the outcome the board exists to create.",
    faceit: "", twitter: ""
  },
  {
    id: "p7", handle: "yay", role: "AWP", tier: "C",
    division: "FPL", team: "Free agent", status: "Watch",
    rating: "", adr: "", elo: "",
    note: "FPL-level ceiling and on the radar for a potential return. Watching closely.",
    faceit: "", twitter: ""
  }
];


/* ---- THE SCOUTING FLOOR ----------------------------------- */
/* A player must meet at least ONE of these to make the board.
   "primary: true" gives the orange dot, false gives the blue dot. */
const SCOUTING_FLOOR = [
  { label: "FPL (Faceit Pro League)", primary: true },
  { label: "FPL-C (FPL Challenger)", primary: true },
  { label: "FACEIT Lvl 10, Top 1000 NA ELO", primary: true },
  { label: "ESL Challenger League", primary: false },
  { label: "ESEA Advanced", primary: false },
  { label: "Top Collegiate Program", primary: false }
];


/* ---- TIER DEFINITIONS (rarely need editing) --------------- */
const TIER_INFO = {
  S: { name: "Pro-Ready", desc: "ESL Challenger or FPL level. Should have a contract right now." },
  A: { name: "Breakout",  desc: "ESEA Advanced standout or FPL-C regular. An org signing is coming." },
  B: { name: "Prospect",  desc: "Top Advanced or collegiate. Pro trajectory confirmed, needs more time." },
  C: { name: "Radar",     desc: "Early watch. Real upside, not yet fully proven." }
};
