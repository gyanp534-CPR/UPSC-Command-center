// ══════════════════════════════════════════════════════
//  LEARNING ORGANISM — CORE APP ENGINE
// ══════════════════════════════════════════════════════

// ── STATE ──
const STATE = {
  currentPanel: 'home',
  userName: '',
  diagnosed: false,
  xp: 0,
  streak: 0,
  lastStudied: null,
  // Knowledge mastery scores: nodeId → 0–100
  mastery: {},
  // Study history: array of {date, nodeId, correct, total}
  history: [],
  // Diagnostic results
  diagResult: null,
};

// ── RANKS ──
const RANKS = [
  { min:0,    label:'Aspirant',          color:'#888' },
  { min:100,  label:'Curious Mind',      color:'#06b6d4' },
  { min:300,  label:'Serious Candidate', color:'#22c55e' },
  { min:700,  label:'District Topper',   color:'#f59e0b' },
  { min:1500, label:'IPS Contender',     color:'#a855f7' },
  { min:3000, label:'IAS Contender',     color:'#ef4444' },
  { min:6000, label:'Topper Territory',  color:'#7c6af7' },
];

function getRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].min) return RANKS[i];
  }
  return RANKS[0];
}

function getNextRank(xp) {
  for (let r of RANKS) { if (xp < r.min) return r; }
  return null;
}

// ── PERSISTENCE ──
function save() {
  try {
    localStorage.setItem('lo_state', JSON.stringify({
      userName: STATE.userName, diagnosed: STATE.diagnosed,
      xp: STATE.xp, streak: STATE.streak, lastStudied: STATE.lastStudied,
      mastery: STATE.mastery, history: STATE.history.slice(-200),
      diagResult: STATE.diagResult,
    }));
  } catch(e) {}
}

function load() {
  try {
    const s = JSON.parse(localStorage.getItem('lo_state') || '{}');
    Object.assign(STATE, s);
  } catch(e) {}
}

function addXP(n, reason) {
  STATE.xp += n;
  save();
  updateXPUI();
  showXPToast(`+${n} XP — ${reason}`);
}

function setMastery(nodeId, score) {
  STATE.mastery[nodeId] = Math.max(0, Math.min(100, score));
  save();
}

function getMastery(nodeId) {
  return STATE.mastery[nodeId] || 0;
}

// ── XP UI ──
function updateXPUI() {
  const rank = getRank(STATE.xp);
  const next = getNextRank(STATE.xp);
  const pct = next ? ((STATE.xp - rank.min) / (next.min - rank.min) * 100) : 100;
  const els = {
    sbRank: document.getElementById('sbRank'),
    sbXpBar: document.getElementById('sbXpBar'),
    sbXpVal: document.getElementById('sbXpVal'),
    topbarXP: document.getElementById('topbarXP'),
  };
  if (els.sbRank) { els.sbRank.textContent = rank.label; els.sbRank.style.color = rank.color; }
  if (els.sbXpBar) els.sbXpBar.style.width = pct + '%';
  if (els.sbXpVal) els.sbXpVal.textContent = STATE.xp + ' XP';
  if (els.topbarXP) els.topbarXP.textContent = STATE.xp + ' XP';
}

function showXPToast(msg) {
  const t = document.getElementById('xpToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ── SUBJECT COLOR HELPER ──
function subjectColor(s) {
  return { 'Polity':'#7c6af7','Economy':'#22c55e','Environment':'#10b981',
    'History':'#f59e0b','Geography':'#06b6d4','Sci & Tech':'#a855f7',
    'Governance':'#f97316','Int. Relations':'#3b82f6' }[s] || '#888';
}

function subjectClass(s) {
  return { 'Polity':'tag-polity','Economy':'tag-economy','Environment':'tag-environment',
    'History':'tag-history','Geography':'tag-geography','Sci & Tech':'tag-sci_tech',
    'Governance':'tag-governance','Int. Relations':'tag-ir' }[s] || '';
}

// ── NAVIGATION ──
const App = {
  goto(panel) {
    STATE.currentPanel = panel;
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const el = document.getElementById('panel-' + panel);
    if (el) el.classList.add('active');

    document.querySelectorAll('.sb-btn').forEach(b => b.classList.toggle('active', b.dataset.panel === panel));
    document.querySelectorAll('.bn-btn').forEach(b => b.classList.toggle('active', b.dataset.panel === panel));

    const titles = { home:'Dashboard', diagnostic:'Diagnostic', ncert:'NCERT Learn',
      graph:'Knowledge Map', quiz:'Daily Quiz', debate:'Debate Mode',
      options_ml:'Option ML', plan:'Study Plan', concept:'Concept/Day', eli5:'ELI5 Mode' };
    const tb = document.getElementById('topbarTitle');
    if (tb) tb.textContent = titles[panel] || panel;

    // Close drawer on mobile
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('drawer-overlay').style.display = 'none';

    // Init each panel
    if (panel === 'home') Home.render();
    if (panel === 'ncert') NCERT.renderHome();
    if (panel === 'graph') KnowledgeGraph.render();
    if (panel === 'quiz') Quiz.renderHome();
    if (panel === 'debate') renderDebateMode();
    if (panel === 'options_ml') OptionsML.render();
    if (panel === 'plan') StudyPlan.render();
    if (panel === 'concept') ConceptDay.render();
    if (panel === 'eli5') ELI5.render();
  },

  toggleDrawer() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('drawer-overlay');
    const open = sb.classList.toggle('open');
    ov.style.display = open ? 'block' : 'none';
  },
};

// ── SPLASH + BOOT ──
window.addEventListener('DOMContentLoaded', () => {
  load();
  updateStreak();

  const bar = document.getElementById('splashBar');
  const cap = document.getElementById('splashCaption');
  const captions = ['Initialising knowledge graph…','Loading NCERT modules…','Calibrating adaptive engine…','Mapping your learning nodes…','Ready.'];
  let pct = 0;
  const tick = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 22 + 6);
    if (bar) bar.style.width = pct + '%';
    const ci = Math.floor((pct / 100) * (captions.length - 1));
    if (cap) cap.textContent = captions[Math.min(ci, captions.length - 1)];
    if (pct >= 100) {
      clearInterval(tick);
      setTimeout(boot, 400);
    }
  }, 180);
});

function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (STATE.lastStudied === today) return;
  if (STATE.lastStudied === yesterday) STATE.streak++;
  else if (STATE.lastStudied !== today) STATE.streak = 1;
  STATE.lastStudied = today;
  save();
}

function boot() {
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');
  if (splash) { splash.classList.add('out'); setTimeout(() => splash.remove(), 600); }
  if (app) app.style.display = 'flex';

  updateXPUI();
  App.goto('home');

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ══ HOME PANEL ══
const Home = {
  render() {
    this.renderGreeting();
    this.renderConceptOfDay();
    this.renderHeatmap();
    this.renderAgenda();
    this.renderWeekRings();
    this.renderStreakCal();
    this.renderWeakAlert();
  },

  renderGreeting() {
    const h = new Date().getHours();
    const greeting = h < 5 ? 'Late night grind.' : h < 12 ? 'Good morning.' : h < 17 ? 'Good afternoon.' : h < 21 ? 'Good evening.' : 'Night session.';
    const el = document.getElementById('heroGreeting');
    if (el) el.textContent = STATE.userName ? `${greeting} ${STATE.userName}.` : greeting;
    const sc = document.getElementById('streakCount');
    if (sc) sc.textContent = STATE.streak;
  },

  renderConceptOfDay() {
    const dayIdx = Math.floor(Date.now() / 86400000) % CONCEPT_OF_DAY.length;
    const cod = CONCEPT_OF_DAY[dayIdx];
    document.getElementById('codTitle').textContent = cod.concept;
    document.getElementById('codSubject').textContent = cod.subject;
    document.getElementById('codSubject').className = 'hg-cod-subject ' + subjectClass(cod.subject);
    document.getElementById('codExplain').textContent = cod.explain.slice(0, 180) + '…';
    document.getElementById('codEli5').textContent = '🧒 ' + cod.eli5;
  },

  renderHeatmap() {
    const subjects = ['Polity','Economy','Environment','History','Sci & Tech','Governance','Int. Relations'];
    const el = document.getElementById('quickHeatmap');
    if (!el) return;
    el.innerHTML = subjects.map(s => {
      const nodes = KNOWLEDGE_GRAPH.nodes.filter(n => n.subject === s);
      const avg = nodes.length ? Math.round(nodes.reduce((sum, n) => sum + getMastery(n.id), 0) / nodes.length) : 0;
      const color = subjectColor(s);
      return `<div class="hm-subj-row">
        <div class="hm-subj-label">${s.replace('Int. Relations','IR')}</div>
        <div class="hm-bar-wrap"><div class="hm-bar" style="width:${avg}%;background:${color}" ></div></div>
        <div class="hm-pct">${avg}%</div>
      </div>`;
    }).join('');
    setTimeout(() => {
      el.querySelectorAll('.hm-bar').forEach(b => { const w = b.style.width; b.style.width='0%'; setTimeout(()=>b.style.width=w,50); });
    }, 100);
  },

  renderAgenda() {
    const el = document.getElementById('todayAgenda');
    if (!el) return;
    const weakNodes = KNOWLEDGE_GRAPH.nodes
      .filter(n => getMastery(n.id) < 40)
      .sort((a,b) => getMastery(a.id) - getMastery(b.id))
      .slice(0, 4);
    const items = [
      { icon:'💡', text:'Concept of the Day: ' + CONCEPT_OF_DAY[Math.floor(Date.now()/86400000)%CONCEPT_OF_DAY.length].concept },
      ...weakNodes.map(n => ({ icon:'🎯', text:`Revise: ${n.topic}` })),
      { icon:'⚡', text:'10 adaptive MCQs' },
    ];
    el.innerHTML = items.slice(0,5).map(i => `
      <div class="agenda-item">
        <span class="agenda-icon">${i.icon}</span>
        <span class="agenda-text">${i.text}</span>
      </div>`).join('');
  },

  renderWeekRings() {
    const el = document.getElementById('weekRings');
    if (!el) return;
    const days = ['M','T','W','T','F','S','S'];
    const today = new Date().getDay();
    const values = days.map((d, i) => {
      const off = (today - i + 7) % 7;
      const date = new Date(Date.now() - off * 86400000).toDateString();
      const studied = STATE.history.some(h => new Date(h.date).toDateString() === date);
      return studied ? 65 + Math.floor(Math.random() * 30) : 0;
    }).reverse();

    const r = 18, c = 24, circ = 2 * Math.PI * r;
    el.innerHTML = days.map((d, i) => {
      const v = values[i];
      const offset = circ - (v / 100) * circ;
      const color = v > 70 ? '#22c55e' : v > 30 ? '#7c6af7' : '#2a2a38';
      return `<div class="ring-item">
        <svg class="ring-svg" viewBox="0 0 48 48">
          <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="#2a2a38" stroke-width="4"/>
          <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-width="4"
            stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
        </svg>
        <div class="ring-day">${d}</div>
      </div>`;
    }).join('');
  },

  renderStreakCal() {
    const el = document.getElementById('streakCal');
    if (!el) return;
    const today = new Date();
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 86400000);
      const studied = STATE.history.some(h => new Date(h.date).toDateString() === d.toDateString()) || (i < 3 && Math.random() > 0.3);
      days.push({ d, studied, isToday: i === 0 });
    }
    el.innerHTML = days.map(d => `<div class="sc-day ${d.studied?'studied':''} ${d.isToday?'today':''}" title="${d.d.toDateString()}"></div>`).join('');
  },

  renderWeakAlert() {
    const el = document.getElementById('weakAlertContent');
    if (!el) return;
    const weak = KNOWLEDGE_GRAPH.nodes
      .sort((a,b) => getMastery(a.id) - getMastery(b.id))
      .slice(0, 1)[0];
    if (!weak) return;
    el.innerHTML = `
      <div class="alert-topic">${weak.topic}</div>
      <div class="alert-detail">Mastery: ${getMastery(weak.id)}% · ${weak.subject}<br>
      This is your lowest-scored knowledge node. Focus here next.</div>
      <button class="hg-btn" onclick="App.goto('quiz')" style="margin-top:0.5rem">Practice now →</button>`;
  }
};
