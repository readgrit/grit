/* ============================================================
   GRIT: APP LOGIC
   Renders the site from data.js. You should not need to edit
   this file to add news or update the board. Edit data.js.
   ============================================================ */

const ROLES = ['AWP', 'IGL', 'Entry', 'Rifler', 'Support', 'Lurker'];
const TIERS = ['S', 'A', 'B', 'C'];

/* ---- HELPERS --------------------------------------------- */
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return esc(iso);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function divClass(div) {
  if (div === 'FPL') return 'div-fpl';
  if (div === 'FPL-C') return 'div-fplc';
  return 'div-other';
}

/* ---- SHARED CHROME --------------------------------------- */
function fillChrome() {
  document.querySelectorAll('[data-today]').forEach(el => {
    el.textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('[data-site-tagline]').forEach(el => { el.textContent = SITE.tagline; });
  document.querySelectorAll('[data-site-meaning]').forEach(el => { el.textContent = SITE.meaning; });
}

/* ---- BOARD CARD ------------------------------------------ */
function prospectCard(p) {
  const dTag = `<span class="ptag ${divClass(p.division)}">${esc(p.division)}</span>`;
  const eloTag = p.elo ? `<span class="ptag elo">${esc(p.elo)} ELO</span>` : '';
  const hasStats = p.rating || p.adr;
  const stats = hasStats ? `<div class="pcard-stats">
      ${p.rating ? `<div class="stat-pill"><div class="sv">${esc(p.rating)}</div><div class="sl">Rating</div></div>` : ''}
      ${p.adr ? `<div class="stat-pill"><div class="sv">${esc(p.adr)}</div><div class="sl">ADR</div></div>` : ''}
    </div>` : '';
  const fc = p.faceit ? `<a class="ilink" href="${esc(p.faceit)}" target="_blank" rel="noopener" title="FACEIT profile">FC</a>` : '';
  const tw = p.twitter ? `<a class="ilink" href="${esc(p.twitter)}" target="_blank" rel="noopener" title="X / Twitter">X</a>` : '';
  const signed = (p.status === 'Signed' && p.signedTo) ? `<div class="signed-banner">&#10003; Signed to ${esc(p.signedTo)}</div>` : '';
  return `<div class="pcard${p.status === 'Signed' ? ' signed' : ''}">
    <div class="role-badge ${esc(p.role)}">${esc(p.role)}</div>
    <div class="pcard-handle">${esc(p.handle)}</div>
    <div class="pcard-team">${esc(p.team || 'Free agent')}</div>
    <div class="pcard-tags">${dTag}${eloTag}</div>
    ${stats}
    <p class="pcard-note">${esc(p.note || '')}</p>
    <div class="pcard-foot">
      <span class="status-tag ${esc(p.status)}">${esc(p.status)}</span>
      <div class="pcard-links">${fc}${tw}</div>
    </div>
    ${signed}
  </div>`;
}

/* ---- NEWS CARD (home grid) ------------------------------- */
function newsCard(a) {
  return `<article class="news-card">
    <div class="news-cat">${esc(a.category)}</div>
    <h3>${esc(a.title)}</h3>
    <div class="news-meta">${fmtDate(a.date)} &nbsp;/&nbsp; ${esc(a.author)}</div>
    <p class="news-excerpt">${esc(a.excerpt)}</p>
  </article>`;
}

/* ---- FULL ARTICLE (news page) ---------------------------- */
function fullArticle(a) {
  const body = (a.body || []).map(p => `<p>${esc(p)}</p>`).join('');
  return `<article class="article" data-category="${esc(a.category)}">
    <div class="article-cat">${esc(a.category)}</div>
    <h2 class="article-title">${esc(a.title)}</h2>
    <div class="article-byline">${fmtDate(a.date)} &nbsp;/&nbsp; By ${esc(a.author)}</div>
    <div class="article-body">${body}</div>
  </article>`;
}

/* ---- SCOUTING FLOOR -------------------------------------- */
function renderFloor(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const items = SCOUTING_FLOOR.map(f =>
    `<li><span class="dot${f.primary ? '' : ' secondary'}"></span>${esc(f.label)}</li>`
  ).join('');
  el.innerHTML = `<p class="floor-intro">A player must meet at least one of these to make the board. No exceptions.</p>
    <ul class="floor-list">${items}</ul>`;
}

/* ---- BOARD STATS ----------------------------------------- */
function renderStats() {
  const total = PROSPECTS.length;
  const signed = PROSPECTS.filter(p => p.status === 'Signed').length;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('stat-total', total);
  set('stat-signed', signed);
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function initHome() {
  const lead = document.getElementById('home-lead');
  if (!lead) return;

  const featured = NEWS.find(a => a.featured) || NEWS[0];
  if (featured) {
    const body = (featured.body || []).slice(0, 2).map(p => `<p>${esc(p)}</p>`).join('');
    lead.innerHTML = `
      <div class="lead-main">
        <div class="lead-eyebrow">${esc(featured.category)}</div>
        <h1 class="lead-title">${esc(featured.title)}</h1>
        <div class="lead-byline">${fmtDate(featured.date)} &nbsp;/&nbsp; By ${esc(featured.author)}</div>
        <div class="lead-body">${body}</div>
      </div>
      <div class="lead-divider"></div>
      <div class="lead-side">
        <div class="lead-side-label">The Board, This Week</div>
        <div class="stat-box">
          <div class="stat-row">Prospects tracked <b id="stat-total">0</b></div>
          <div class="stat-row">Signed off the board <b class="orange" id="stat-signed">0</b></div>
        </div>
        <div class="lead-side-label" style="margin-top:16px;">The Scouting Floor</div>
        <div id="home-floor"></div>
      </div>`;
  }
  renderStats();
  renderFloor('home-floor');

  // Latest news (skip the featured one, show next few)
  const grid = document.getElementById('home-news');
  if (grid) {
    const rest = NEWS.filter(a => a !== featured).slice(0, 3);
    grid.innerHTML = rest.length ? rest.map(newsCard).join('') :
      '<div class="empty-state">No articles yet. Add them in data.js.</div>';
  }

  // Board preview: top tiers, capped
  const preview = document.getElementById('home-board-preview');
  if (preview) {
    const top = [...PROSPECTS]
      .sort((a, b) => TIERS.indexOf(a.tier) - TIERS.indexOf(b.tier))
      .slice(0, 4);
    preview.innerHTML = top.length ? top.map(prospectCard).join('') :
      '<div class="empty-state">No prospects on the board yet. Add them in data.js.</div>';
  }
}

/* ============================================================
   BOARD PAGE
   ============================================================ */
const boardState = { q: '', role: 'all', div: 'all' };

function initBoard() {
  const content = document.getElementById('board-content');
  if (!content) return;

  renderStats();
  renderFloor('board-floor');
  buildBoardControls();
  renderBoard();
}

function buildBoardControls() {
  // Role chips
  const rf = document.getElementById('role-filters');
  if (rf) {
    rf.innerHTML = '';
    rf.appendChild(makeChip('All', boardState.role === 'all', () => { boardState.role = 'all'; syncRoleChips(); renderBoard(); }));
    ROLES.forEach(r => {
      const c = makeChip(r, boardState.role === r, () => { boardState.role = r; syncRoleChips(); renderBoard(); });
      c.classList.add('role-' + r.toLowerCase());
      rf.appendChild(c);
    });
  }
  // Division select
  const df = document.getElementById('div-filter');
  if (df) {
    const divs = [...new Set(PROSPECTS.map(p => p.division))];
    df.innerHTML = '<option value="all">All divisions</option>' +
      divs.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join('');
    df.onchange = () => { boardState.div = df.value; renderBoard(); };
  }
  // Search
  const si = document.getElementById('board-search');
  if (si) si.oninput = e => { boardState.q = e.target.value.toLowerCase().trim(); renderBoard(); };
}

function makeChip(label, active, onClick) {
  const b = document.createElement('button');
  b.className = 'chip' + (active ? ' on' : '');
  b.textContent = label;
  b.onclick = onClick;
  return b;
}

function syncRoleChips() {
  document.querySelectorAll('#role-filters .chip').forEach(c => {
    const t = c.textContent;
    c.classList.toggle('on', (t === 'All' && boardState.role === 'all') || t === boardState.role);
  });
}

function boardPasses(p) {
  if (boardState.role !== 'all' && p.role !== boardState.role) return false;
  if (boardState.div !== 'all' && p.division !== boardState.div) return false;
  if (boardState.q) {
    const hay = (p.handle + ' ' + (p.team || '') + ' ' + p.division).toLowerCase();
    if (!hay.includes(boardState.q)) return false;
  }
  return true;
}

function anyBoardFilter() {
  return boardState.role !== 'all' || boardState.div !== 'all' || boardState.q;
}

function renderBoard() {
  const content = document.getElementById('board-content');
  if (!content) return;
  const visible = PROSPECTS.filter(boardPasses);
  let html = '';
  for (const tier of TIERS) {
    const inTier = visible.filter(p => p.tier === tier);
    const info = TIER_INFO[tier] || { name: '', desc: '' };
    html += `<div class="tier-section tier-${tier}">
      <div class="tier-header">
        <span class="tier-letter">${tier}</span>
        <div>
          <div class="tier-name">${esc(info.name)}</div>
          <div class="tier-desc">${esc(info.desc)}</div>
        </div>
        <span class="tier-count">${inTier.length} player${inTier.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="card-grid">`;
    html += inTier.length
      ? inTier.map(prospectCard).join('')
      : `<div class="empty-state">No prospects in Tier ${tier}${anyBoardFilter() ? ' matching this filter' : ''}.</div>`;
    html += `</div></div>`;
  }
  content.innerHTML = html;
}

/* ============================================================
   NEWS PAGE
   ============================================================ */
let newsCat = 'all';

function initNews() {
  const wrap = document.getElementById('news-articles');
  if (!wrap) return;

  // Category filter
  const cf = document.getElementById('cat-filters');
  if (cf) {
    const cats = ['all', ...new Set(NEWS.map(a => a.category))];
    cf.innerHTML = cats.map(c =>
      `<button class="cat-pill${c === 'all' ? ' on' : ''}" data-cat="${esc(c)}">${c === 'all' ? 'All' : esc(c)}</button>`
    ).join('');
    cf.querySelectorAll('.cat-pill').forEach(btn => {
      btn.onclick = () => {
        newsCat = btn.dataset.cat;
        cf.querySelectorAll('.cat-pill').forEach(b => b.classList.toggle('on', b === btn));
        renderNews();
      };
    });
  }
  renderNews();
}

function renderNews() {
  const wrap = document.getElementById('news-articles');
  if (!wrap) return;
  const list = newsCat === 'all' ? NEWS : NEWS.filter(a => a.category === newsCat);
  wrap.innerHTML = list.length
    ? list.map(fullArticle).join('')
    : '<div class="empty-state">No articles in this category yet.</div>';
}

/* ---- SUBSCRIBE ------------------------------------------- */
function handleSub() {
  const input = document.getElementById('sub-email');
  const email = input ? input.value.trim() : '';
  const url = email ? SITE.substack + '?email=' + encodeURIComponent(email) : SITE.substack;
  window.open(url, '_blank', 'noopener');
}

/* ---- BOOT ------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  fillChrome();
  initHome();
  initBoard();
  initNews();
});
