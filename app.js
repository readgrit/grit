/* ============================================================
   GRIT — APP LOGIC
   Renders every page from data.js + pulls posts from Substack.
   You should not need to edit this file.
   ============================================================ */

const ROLES = ['AWP', 'IGL', 'Entry', 'Rifler', 'Support', 'Lurker'];
const TIERS = ['S', 'A', 'B', 'C'];
const TICKS = '<span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>';

/* ---- HELPERS --------------------------------------------- */
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function fmtDate(iso) {
  const d = (iso instanceof Date) ? iso : new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso + 'T00:00:00' : iso);
  if (isNaN(d)) return esc(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function byRank(a, b) { return a.rank - b.rank; }
function monogram(name) {
  const p = String(name || '?').trim().split(/\s+/);
  return (p.length > 1 ? (p[0][0] + p[1][0]) : String(name || '?').slice(0, 2)).toUpperCase();
}
function moveTag(rank, prev) {
  if (prev == null) return '<div class="r-move new">NEW</div>';
  const d = prev - rank;
  if (d > 0) return `<div class="r-move up">&#9650;${d}</div>`;
  if (d < 0) return `<div class="r-move down">&#9660;${-d}</div>`;
  return '<div class="r-move same">&ndash;</div>';
}
function streakHtml(s) {
  if (!s || !s.length) return '';
  const bars = s.slice(0, 5).map(r => `<i class="${r === 'w' ? 'w' : r === 'l' ? 'l' : ''}"></i>`).join('');
  return `<div class="cell" style="text-align:left"><div class="streak">${bars}</div><div class="l" style="margin-top:5px">Form</div></div>`;
}
function stripHtml(html) {
  const d = document.createElement('div'); d.innerHTML = html || '';
  return (d.textContent || '').replace(/\s+/g, ' ').trim();
}
function truncate(s, n) { return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s; }

/* ---- THEME (dark default) -------------------------------- */
function currentTheme() { return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('[data-theme-label]').forEach(el => { el.textContent = t === 'dark' ? 'Light' : 'Dark'; });
}
function initTheme() {
  applyTheme(currentTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('grit-theme', next); } catch (e) {}
  }));
}

/* ---- SHARED CHROME --------------------------------------- */
function fillChrome() {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  document.querySelectorAll('[data-today]').forEach(el => el.textContent = today);
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-site-tagline]').forEach(el => el.textContent = SITE.tagline);
  document.querySelectorAll('[data-site-meaning]').forEach(el => el.textContent = SITE.meaning);
  document.querySelectorAll('[data-substack-href]').forEach(el => el.setAttribute('href', SITE.substack));
}

/* ---- TEAM RANKING ---------------------------------------- */
function logoOrMono(o) {
  const mono = esc(monogram(o.name || o.handle));
  return o.logo
    ? `<div class="r-mono has-img">${mono}<img class="r-logo" src="${esc(o.logo)}" alt="${esc(o.name || o.handle)}" loading="lazy" onerror="this.remove()"></div>`
    : `<div class="r-mono">${mono}</div>`;
}
const pad2 = (n) => (n == null ? '' : String(n).padStart(2, '0'));
function gritTierFor(rank) {
  for (const t of GRIT_TIERS) if (rank <= t.max) return t;
  return GRIT_TIERS[GRIT_TIERS.length - 1];
}
/* VRS rank is auto-computed from vrsPoints (you only maintain points) */
function vrsRankMap() {
  const m = new Map();
  TEAMS.filter(t => t.vrsPoints != null)
    .sort((a, b) => b.vrsPoints - a.vrsPoints)
    .forEach((t, i) => m.set(t.id, i + 1));
  return m;
}
/* VRS rank shown beside a GRIT row, with the GRIT-vs-VRS delta */
function vrsRefHtml(t, vrsRank) {
  if (vrsRank == null) return '<div class="vrs-ref none">VRS&nbsp;&mdash;</div>';
  const d = vrsRank - t.gritRank; // >0 means GRIT rates them higher than VRS
  let delta = '<span class="vd even">=</span>';
  if (d > 0) delta = `<span class="vd up">&#9650;${d}</span>`;
  else if (d < 0) delta = `<span class="vd down">&#9660;${-d}</span>`;
  return `<div class="vrs-ref">VRS&nbsp;#${vrsRank} ${delta}</div>`;
}
/* official VRS board row */
function vrsRow(t, rank) {
  return `<div class="rank-row vrs-row">
    <div class="r-num${rank <= 3 ? ' top3' : ''}">${esc(pad2(rank))}</div>
    ${logoOrMono(t)}
    <div class="r-name"><div class="nm">${esc(t.name)}</div><div class="sub">${esc(t.roster || t.region || '')}</div>${t.note ? `<div class="r-desc">${esc(t.note)}</div>` : ''}</div>
    <div class="r-stat">${streakHtml(t.streak)}</div>
    <div class="r-points"><div class="v">${esc(t.vrsPoints)}</div><div class="l">VRS pts</div></div>
    <span class="row-more" aria-hidden="true">+</span>
  </div>`;
}
/* GRIT board row — 01 · M80 · ▲2 · VRS #3. Detail reveals on hover. */
function gritRow(t, vmap) {
  return `<div class="rank-row grit-row">
    <div class="r-num${t.gritRank <= 3 ? ' top3' : ''}">${esc(pad2(t.gritRank))}</div>
    ${moveTag(t.gritRank, t.gritPrev)}${logoOrMono(t)}
    <div class="r-name"><div class="nm">${esc(t.name)}</div><div class="sub">${esc(t.roster || t.region || '')}</div>${t.note ? `<div class="r-desc">${esc(t.note)}</div>` : ''}</div>
    ${vrsRefHtml(t, vmap.get(t.id))}
    <span class="row-more" aria-hidden="true">+</span>
  </div>`;
}
function renderTeams(id, opts) {
  const el = document.getElementById(id); if (!el) return;
  opts = opts || {};
  const mode = opts.mode || 'grit';
  el.className = 'rank-table glass hud';

  if (mode === 'vrs') {
    let list = TEAMS.filter(t => t.vrsPoints != null).sort((a, b) => b.vrsPoints - a.vrsPoints);
    if (opts.limit) list = list.slice(0, opts.limit);
    el.innerHTML = (list.length ? list.map((t, i) => vrsRow(t, i + 1)).join('')
      : '<div class="empty-state">No VRS-ranked teams yet.</div>') + TICKS;
    return;
  }

  // GRIT — only teams that have been given a gritRank
  const vmap = vrsRankMap();
  let list = TEAMS.filter(t => t.gritRank != null).sort((a, b) => a.gritRank - b.gritRank);
  if (opts.limit) list = list.slice(0, opts.limit);
  if (opts.flat) { el.innerHTML = list.map(t => gritRow(t, vmap)).join('') + TICKS; return; }

  let html = '';
  for (const tier of GRIT_TIERS) {
    const inTier = list.filter(t => gritTierFor(t.gritRank).key === tier.key);
    if (!inTier.length) continue;
    html += `<div class="tier-band"><span class="tl">${esc(tier.name)}</span><span class="td">${esc(tier.desc)}</span></div>`;
    html += inTier.map(t => gritRow(t, vmap)).join('');
  }
  el.innerHTML = (html || '<div class="empty-state">No teams ranked yet. Add them in data.js.</div>') + TICKS;
}

/* Teams page: GRIT <-> VRS toggle */
const TEAMS_NOTE = {
  grit: "The GRIT ranking: our curated read on the NA teams worth watching, tiered by how ready they are. VRS shown beside each — the arrow is where we disagree with the algorithm.",
  vrs:  "The official HLTV Americas Valve Regional Standings, filtered to North America and ordered by VRS points (Jun 2026). Rank auto-computes from points."
};
function initTeamsPage() {
  const el = document.getElementById('teams-content'); if (!el) return;
  let mode = 'grit';
  const note = document.getElementById('teams-note');
  const tg = document.getElementById('teams-view-toggle');
  const apply = () => {
    if (note) note.textContent = TEAMS_NOTE[mode];
    renderTeams('teams-content', { mode });
  };
  if (tg) tg.querySelectorAll('.vt').forEach(b => b.onclick = () => {
    mode = b.dataset.view;
    tg.querySelectorAll('.vt').forEach(x => x.classList.toggle('on', x === b));
    apply();
  });
  apply();
  renderResults('teams-results', 6);
}

/* ---- BOARD (player ranking) ------------------------------ */
/* Catalog line — 01 · SLAXZ- · ENTRY · 1.19 · ACTIVE */
function boardRow(p) {
  return `<div class="rank-row board-row">
    <div class="r-num${p.rank <= 3 ? ' top3' : ''}">${esc(pad2(p.rank))}</div>
    ${moveTag(p.rank, p.prevRank)}
    <div class="r-name"><div class="nm">${esc(p.handle)}</div><div class="sub">${esc(p.division)} &middot; ${esc(p.team || 'Free agent')}</div>${p.note ? `<div class="r-desc">${esc(p.note)}</div>` : ''}</div>
    <div class="role-cell"><span class="role-tag">${esc(p.role)}</span></div>
    <div class="r-stat">${p.rating ? `<div class="cell"><div class="v">${esc(p.rating)}</div></div>` : ''}</div>
    <div class="status-cell"><span class="status-pill ${esc(p.status)}">${esc(p.status)}</span></div>
    <span class="row-more" aria-hidden="true">+</span>
  </div>`;
}

const boardState = { q: '', role: 'all', div: 'all' };
function boardPasses(p) {
  if (boardState.role !== 'all' && p.role !== boardState.role) return false;
  if (boardState.div !== 'all' && p.division !== boardState.div) return false;
  if (boardState.q) {
    const hay = (p.handle + ' ' + (p.team || '') + ' ' + p.division + ' ' + p.role).toLowerCase();
    if (!hay.includes(boardState.q)) return false;
  }
  return true;
}
function anyBoardFilter() { return boardState.role !== 'all' || boardState.div !== 'all' || boardState.q; }
function renderBoard(id, opts) {
  const el = document.getElementById(id || 'board-content'); if (!el) return;
  opts = opts || {};
  let pool = [...PROSPECTS].sort(byRank);
  if (!opts.preview) pool = pool.filter(boardPasses);
  if (opts.limit) pool = pool.slice(0, opts.limit);
  el.className = 'board-sections';
  if (opts.preview || opts.flat) {
    el.innerHTML = pool.length ? `<div class="board-grid">${pool.map(boardRow).join('')}</div>`
      : '<div class="empty-state glass">No prospects yet. Add them in data.js.</div>';
    return;
  }
  let html = ''; let any = false;
  for (const tier of TIERS) {
    const inTier = pool.filter(p => p.tier === tier);
    if (!inTier.length) continue;
    any = true;
    const info = TIER_INFO[tier] || { name: '', desc: '' };
    html += `<div class="tier-band board-band"><span class="tl">${tier} &mdash; ${esc(info.name)}</span><span class="td">${esc(info.desc)}</span></div>`;
    html += `<div class="board-grid">${inTier.map(boardRow).join('')}</div>`;
  }
  el.innerHTML = any ? html
    : `<div class="empty-state glass">No prospects${anyBoardFilter() ? ' match this filter' : ' yet'}.</div>`;
}
function initBoardControls() {
  const rf = document.getElementById('role-filters');
  if (rf) {
    rf.innerHTML = '';
    rf.appendChild(makeChip('All', boardState.role === 'all', () => { boardState.role = 'all'; syncRoleChips(); renderBoard(); }));
    ROLES.forEach(r => {
      const c = makeChip(r, boardState.role === r, () => { boardState.role = r; syncRoleChips(); renderBoard(); });
      c.classList.add('role-' + r.toLowerCase()); rf.appendChild(c);
    });
  }
  const df = document.getElementById('div-filter');
  if (df) {
    const divs = [...new Set(PROSPECTS.map(p => p.division))];
    df.innerHTML = '<option value="all">All divisions</option>' + divs.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('');
    df.onchange = () => { boardState.div = df.value; renderBoard(); };
  }
  const si = document.getElementById('board-search');
  if (si) si.oninput = e => { boardState.q = e.target.value.toLowerCase().trim(); renderBoard(); };
}
function makeChip(label, active, onClick) {
  const b = document.createElement('button');
  b.className = 'chip' + (active ? ' on' : ''); b.textContent = label; b.onclick = onClick; return b;
}
function syncRoleChips() {
  document.querySelectorAll('#role-filters .chip').forEach(c => {
    const t = c.textContent;
    c.classList.toggle('on', (t === 'All' && boardState.role === 'all') || t === boardState.role);
  });
}

/* ---- RECENT RESULTS -------------------------------------- */
function resultCard(r) {
  const line = (t) => `<div class="result-line ${t.won ? 'win' : 'lose'}"><span class="tname">${esc(t.name)}</span><span class="tscore">${esc(t.score)}</span></div>`;
  return `<div class="glass hud result-card">${TICKS}
    <div class="result-event">${esc(r.event)}<span class="rdate">${fmtDate(r.date)}</span></div>
    ${line(r.a)}${line(r.b)}
    ${r.note ? `<div class="result-note">${esc(r.note)}</div>` : ''}
  </div>`;
}
/* Results render from RESULTS_DATA, which starts as the static RESULTS in
   data.js and gets replaced by the live Liquipedia feed when available. */
let RESULTS_DATA = (typeof RESULTS !== 'undefined') ? RESULTS : [];

function renderResults(id, limit) {
  const el = document.getElementById(id); if (!el) return;
  const list = RESULTS_DATA.slice(0, limit || RESULTS_DATA.length);
  el.innerHTML = list.length ? list.map(resultCard).join('')
    : '<div class="empty-state">No results logged yet. Add them in data.js.</div>';
}

/* Pull the auto-updating NA results feed (Cloudflare Worker -> Liquipedia).
   Stays on the static RESULTS until SITE.resultsFeed is set, so the site
   works unchanged until you deploy the Worker. Adds the required credit. */
async function hydrateResults() {
  const url = (typeof SITE !== 'undefined') && SITE.resultsFeed;
  if (!url) return;
  try {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return;
    const j = await r.json();
    const list = Array.isArray(j) ? j : (j.results || []);
    if (!list.length) return;
    RESULTS_DATA = list;
    if (document.getElementById('home-results')) renderResults('home-results', 4);
    if (document.getElementById('teams-results')) renderResults('teams-results', 6);
    addLiqCredit();
  } catch (e) { /* keep static results on any failure */ }
}
function addLiqCredit() {
  document.querySelectorAll('#home-results, #teams-results').forEach(el => {
    const host = el.parentElement;
    if (!host || host.querySelector('.liq-credit')) return;
    const c = document.createElement('div');
    c.className = 'liq-credit';
    c.innerHTML = 'Match results via <a href="https://liquipedia.net" target="_blank" rel="noopener">Liquipedia</a> &middot; CC BY-SA 3.0';
    host.appendChild(c);
  });
}

/* ---- SUBSTACK AUTO-PULL ---------------------------------- */
function postCard(it) {
  const cat = (it.categories && it.categories[0]) ? it.categories[0] : 'Dispatch';
  const excerpt = truncate(stripHtml(it.description || it.content || ''), 150);
  return `<a class="glass hud post-card" href="${esc(it.link)}" target="_blank" rel="noopener">${TICKS}
    <div class="post-cat">${esc(cat)}</div>
    <h3>${esc(it.title || 'Untitled')}</h3>
    <div class="post-meta">${fmtDate(it.pubDate)} &nbsp;/&nbsp; on Substack</div>
    <p class="post-excerpt">${esc(excerpt)}</p>
  </a>`;
}
function postSkeleton(n) {
  let one = `<div class="glass post-skeleton"><div class="sk s"></div><div class="sk t"></div><div class="sk"></div><div class="sk"></div></div>`;
  return new Array(n || 3).fill(one).join('');
}
function postFallback() {
  return `<a class="glass hud post-card" href="${esc(SITE.substack)}" target="_blank" rel="noopener">${TICKS}
    <div class="post-cat">Substack</div>
    <h3>Read the latest on Substack &rarr;</h3>
    <div class="post-meta">readgrit.substack.com</div>
    <p class="post-excerpt">New dispatches drop on the newsletter. Tap through to read every post and subscribe free.</p>
  </a>`;
}
async function loadPosts(id, limit) {
  const el = document.getElementById(id); if (!el) return;
  el.innerHTML = postSkeleton(limit || 3);
  try {
    const res = await fetch(SITE.rssProxy + encodeURIComponent(SITE.feed), { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('status ' + res.status);
    const data = await res.json();
    const items = (data && data.items) ? data.items.slice(0, limit || 3) : [];
    if (!items.length) throw new Error('no items');
    el.innerHTML = items.map(postCard).join('');
  } catch (e) {
    el.innerHTML = postFallback();
  }
}

/* The Big Story — first item of the live Substack feed. Falls back to a
   static invitation if the feed is unreachable, so the slot is never empty. */
async function loadLead(id) {
  const el = document.getElementById(id); if (!el) return;
  el.classList.add('is-loading');
  const fallback = () => {
    el.href = SITE.substack;
    el.innerHTML = `<div class="ls-body">
        <div class="ls-cat">Dispatch</div>
        <h3 class="ls-title">The weekly read on North American Counter-Strike</h3>
        <p class="ls-excerpt">Rankings, prospect movement, and what actually mattered this week. Published on Substack.</p>
        <div class="ls-meta">Read the latest &rarr;</div>
      </div>`;
    el.classList.remove('is-loading');
  };
  try {
    const res = await fetch(SITE.rssProxy + encodeURIComponent(SITE.feed), { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('status ' + res.status);
    const data = await res.json();
    const it = data && data.items && data.items[0];
    if (!it) throw new Error('no items');
    const plain = (it.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    el.href = it.link || SITE.substack;
    el.innerHTML = `<div class="ls-body">
        <div class="ls-cat">Dispatch</div>
        <h3 class="ls-title">${esc(it.title || 'Latest dispatch')}</h3>
        <p class="ls-excerpt">${esc(plain.slice(0, 220))}${plain.length > 220 ? '&hellip;' : ''}</p>
        <div class="ls-meta">${esc(fmtDate(it.pubDate))} &middot; Read the story &rarr;</div>
      </div>`;
    el.classList.remove('is-loading');
  } catch (e) { fallback(); }
}
/* hero email box: hand the address to Substack rather than fake a signup */
function initHeroSub() {
  const f = document.getElementById('hero-sub'); if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const v = f.querySelector('input').value.trim();
    const base = SITE.substack.replace(/\/$/, '');
    window.open(v ? base + '/subscribe?email=' + encodeURIComponent(v) : base, '_blank', 'noopener');
  });
}

/* ---- SCOUTING FLOOR + MINI STATS ------------------------- */
function renderFloor(id) {
  const el = document.getElementById(id); if (!el) return;
  el.innerHTML = `<p class="floor-intro">A player must clear at least one of these to make the board. No exceptions.</p>
    <ul class="floor-list">${SCOUTING_FLOOR.map(f => `<li><span class="dot${f.primary ? '' : ' secondary'}"></span>${esc(f.label)}</li>`).join('')}</ul>`;
}
function renderMiniStats(id) {
  const el = document.getElementById(id); if (!el) return;
  const signed = PROSPECTS.filter(p => p.status === 'Signed').length;
  const fresh = PROSPECTS.filter(p => p.prevRank == null).length + TEAMS.filter(t => t.gritRank != null && t.gritPrev == null).length;
  const cells = [
    { v: TEAMS.length, l: 'NA teams tracked' },
    { v: PROSPECTS.length, l: 'Prospects tracked' },
    { v: signed, l: 'Signed off board', accent: true },
    { v: fresh, l: 'New this update' }
  ];
  el.innerHTML = cells.map(c => `<div class="mini-stat"><div class="v${c.accent ? ' accent' : ''}">${c.v}</div><div class="l">${c.l}</div></div>`).join('');
}

/* ---- ABOUT ----------------------------------------------- */
function initAbout() {
  const root = document.getElementById('about-root');
  if (!root || typeof ABOUT === 'undefined') return;
  const blocks = ABOUT.blocks.map(b =>
    `<div class="glass hud about-block">${TICKS}<h3>${esc(b.h)}</h3>${b.ps.map(p => `<p>${esc(p)}</p>`).join('')}</div>`).join('');
  const pillars = ABOUT.pillars.map(p =>
    `<div class="pillar"><div class="pl">${esc(p.l)}</div><div class="pn">${esc(p.n)}</div><div class="pd">${esc(p.d)}</div></div>`).join('');
  root.innerHTML = `
    <div class="about-hero">
      <div class="about-kicker">${esc(ABOUT.kicker)}</div>
      <h1>${esc(ABOUT.title)}</h1>
      <p class="lede">${esc(ABOUT.lede)}</p>
    </div>
    <div class="pillars">${pillars}</div>
    <div class="section-head"><span class="eyebrow">/ Mission</span><h2>The long version</h2><span class="rule"></span></div>
    <div class="about-grid">${blocks}</div>`;
}

/* ---- HOME ------------------------------------------------ */
function initHome() {
  const hero = document.getElementById('home-teams') || document.getElementById('home-hero');
  if (!hero) return;
  const t1 = [...TEAMS].filter(t => t.gritRank != null).sort((a, b) => a.gritRank - b.gritRank)[0];
  const p1 = [...PROSPECTS].sort(byRank)[0];
  const teamWrap = document.getElementById('home-feat-team');
  if (teamWrap && t1) teamWrap.innerHTML = `${TICKS}
    <div class="hud-card-label">No.1 Team <span class="tag-no1">GRIT Ranking</span></div>
    <div class="feat-unit">
      <div class="feat-rank">01</div>
      <div class="feat-mono has-img">${esc(monogram(t1.name))}${t1.logo ? `<img src="${esc(t1.logo)}" alt="${esc(t1.name)}" onerror="this.remove()">` : ''}</div>
      <div class="feat-meta"><div class="feat-name">${esc(t1.name)}</div><div class="feat-detail">${esc(t1.region || 'NA')} &middot; ${esc((t1.roster || '').split('·')[0].trim())} +4</div></div>
      <div class="feat-points"><div class="v">${esc(t1.vrsPoints || '—')}</div><div class="l">VRS pts</div></div>
    </div>`;
  const pWrap = document.getElementById('home-feat-player');
  if (pWrap && p1) pWrap.innerHTML = `${TICKS}
    <div class="hud-card-label">No.1 Prospect <span class="tag-no1">The Big Board</span></div>
    <div class="feat-unit">
      <div class="feat-rank chrome">1</div>
      <div class="feat-mono">${esc(p1.role.slice(0, 3))}</div>
      <div class="feat-meta"><div class="feat-name">${esc(p1.handle)}</div><div class="feat-detail">${esc(p1.role)} &middot; ${esc(p1.division)}</div></div>
      <div class="feat-points"><div class="v">${esc(p1.rating || '—')}</div><div class="l">rating</div></div>
    </div>`;
  renderMiniStats('home-mini-stats');
  renderTeams('home-teams', { mode: 'grit', flat: true, limit: 5 });
  renderBoard('home-board', { preview: true, limit: 5 });
  renderResults('home-results', 4);
  loadPosts('home-posts', 3);
  loadLead('home-lead');
  initHeroSub();
}

/* ---- SUBSCRIBE ------------------------------------------- */
function handleSub() {
  const input = document.getElementById('sub-email');
  const email = input ? input.value.trim() : '';
  window.open(email ? SITE.substack + '?email=' + encodeURIComponent(email) : SITE.substack, '_blank', 'noopener');
}

/* The cover fills exactly one screen, so it must know the real nav height
   (which grows on touch devices where tap targets are larger). */
function initNavHeight() {
  const nav = document.querySelector('nav.strip');
  if (!nav) return;
  const set = () => document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  set();
  if (window.ResizeObserver) new ResizeObserver(set).observe(nav);
  window.addEventListener('resize', set, { passive: true });
  window.addEventListener('orientationchange', set);
}

/* Touch devices have no hover, so rows open on tap. Desktop is untouched. */
function initRowTaps() {
  if (!window.matchMedia || !window.matchMedia('(pointer: coarse)').matches) return;
  document.addEventListener('click', e => {
    const row = e.target.closest('.rank-row');
    if (!row || e.target.closest('a, button, input, select')) return;
    const wasOpen = row.classList.contains('open');
    row.parentElement.querySelectorAll('.rank-row.open').forEach(r => r.classList.remove('open'));
    if (!wasOpen) row.classList.add('open');
  });
  const mark = () => document.querySelectorAll('.rank-row').forEach(r => {
    if (r.querySelector('.r-desc, .sub')) {
      r.classList.add('is-tappable');
      if (!r.hasAttribute('tabindex')) { r.setAttribute('tabindex', '0'); r.setAttribute('role', 'button'); }
    }
  });
  mark();
  new MutationObserver(mark).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('rank-row')) {
      e.preventDefault(); e.target.classList.toggle('open');
    }
  });
}

/* ---- BOOT ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme(); fillChrome(); initHome(); initAbout(); hydrateResults(); initRowTaps(); initNavHeight();
  if (document.getElementById('teams-content')) { initTeamsPage(); }
  if (document.getElementById('board-content')) { initBoardControls(); renderBoard('board-content'); renderFloor('board-floor'); renderMiniStats('board-mini-stats'); }
});
