/* ╔══════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — app.js                 ║
   ║  Core: STATE, Navigation, Mission Control ║
   ╚══════════════════════════════════════════╝ */

/* ═══ CONSTANTS ═══ */
const RANKS = [
  {min:0,    label:'Aspirant'},
  {min:100,  label:'Curious Mind'},
  {min:300,  label:'Serious Candidate'},
  {min:700,  label:'District Topper'},
  {min:1500, label:'IPS Contender'},
  {min:3000, label:'IAS Contender'},
  {min:6000, label:'Topper Territory'},
];

const XP_REWARDS = {
  diag_correct: 8, diag_complete: 50,
  ncert_correct: 10, ncert_module: 50,
  quiz_correct: 10, quiz_complete: 20,
  concept_day: 15, revision: 25,
  essay_submit: 30, interview_answer: 20,
  streak_bonus: 10,
};

/* ═══ STATE ═══ */
let STATE = {
  currentPanel: 'home',
  userName: '',
  diagnosed: false,
  xp: 0,
  streak: 0,
  lastStudied: null,
  mastery: {},
  history: [],
  diagResult: null,
  seenQuestions: [],
  revisionQueue: [],
  habitLoop: { morningDone: false, afternoonDone: false, eveningDone: false },
  mode: 'foundation',
  focusMode: false,
  knowledgeIndex: {},
  notes: {},
  currentAffairsRead: [],
  conceptsTodayDone: false,
  lastResetDay: null,
};

/* ═══ LOAD/SAVE STATE ═══ */
function loadState() {
  try {
    const saved = localStorage.getItem('cosmos_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      STATE = { ...STATE, ...parsed };
      STATE.seenQuestions = Array.isArray(STATE.seenQuestions) ? STATE.seenQuestions : [];
    }
  } catch(e) {}
  // Daily reset habit loop
  const today = new Date().toDateString();
  if (STATE.lastResetDay !== today) {
    STATE.habitLoop = { morningDone: false, afternoonDone: false, eveningDone: false };
    STATE.conceptsTodayDone = false;
    STATE.lastResetDay = today;
  }
  // Streak logic
  if (STATE.lastStudied) {
    const last = new Date(STATE.lastStudied);
    const now  = new Date();
    const diffDays = Math.floor((now - last) / 86400000);
    if (diffDays > 1) STATE.streak = 0;
  }
}

function saveState() {
  try { localStorage.setItem('cosmos_state', JSON.stringify(STATE)); } catch(e) {}
}

/* ═══ XP ENGINE ═══ */
function addXP(amount, label) {
  STATE.xp += amount;
  updateXPDisplay();
  showXPToast(`+${amount} XP — ${label}`);
  touchStreak();
  saveState();
}

function updateXPDisplay() {
  const el = document.getElementById('xpDisplay');
  if (el) el.textContent = `${STATE.xp} XP`;
  const rank = getCurrentRank();
  const rankEl = document.getElementById('rankBadge');
  if (rankEl) rankEl.textContent = rank;
}

function getCurrentRank() {
  let rank = RANKS[0].label;
  for (const r of RANKS) { if (STATE.xp >= r.min) rank = r.label; }
  return rank;
}

function showXPToast(msg) {
  const t = document.getElementById('xpToast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2200);
}

function touchStreak() {
  const today = new Date().toDateString();
  if (STATE.lastStudied !== today) {
    if (STATE.lastStudied === new Date(Date.now()-86400000).toDateString()) STATE.streak++;
    else if (!STATE.lastStudied) STATE.streak = 1;
    STATE.lastStudied = today;
    document.getElementById('streakDisplay').textContent = `${STATE.streak}🔥`;
  }
}

/* ═══ NAVIGATION ═══ */
function navigate(panel) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(`panel-${panel}`);
  if (el) el.classList.add('active');
  const nav = document.getElementById(`nav-${panel}`);
  if (nav) nav.classList.add('active');
  STATE.currentPanel = panel;
  saveState();
  // Render panel-specific content
  const renders = {
    home: renderMission,
    diagnostic: () => {},
    ncert: () => typeof NCERT !== 'undefined' && NCERT.renderList(),
    graph: () => typeof GRAPH !== 'undefined' && GRAPH.init(),
    quiz: () => typeof QUIZ !== 'undefined' && QUIZ.renderModes(),
    affairs: () => typeof AFFAIRS !== 'undefined' && AFFAIRS.render(),
    pattern: () => typeof PATTERN !== 'undefined' && PATTERN.render(),
    concept: () => typeof CONCEPTS !== 'undefined' && CONCEPTS.render(),
    debate: () => typeof DEBATE !== 'undefined' && DEBATE.renderList(),
    essay: () => typeof ESSAY !== 'undefined' && ESSAY.renderList(),
    plan: () => typeof PLAN !== 'undefined' && PLAN.render(),
    revision: () => typeof REVISION !== 'undefined' && REVISION.render(),
    schemes: () => typeof SCHEMES !== 'undefined' && SCHEMES.render(),
    performance: () => typeof PERFORMANCE !== 'undefined' && PERFORMANCE.render(),
  };
  if (renders[panel]) renders[panel]();
  window.scrollTo(0, 0);
}

function toggleMore() {
  const m = document.getElementById('moreMenu');
  m.style.display = m.style.display === 'none' ? 'block' : 'none';
}

function switchMode(mode) {
  STATE.mode = mode;
  document.getElementById('btnFoundation').classList.toggle('active', mode === 'foundation');
  document.getElementById('btnExam').classList.toggle('active', mode === 'exam');
  saveState();
}

/* ═══ MASTERY HELPERS ═══ */
function getMastery(nodeId) { return STATE.mastery[nodeId] || 0; }
function setMastery(nodeId, val) {
  STATE.mastery[nodeId] = Math.min(100, Math.max(0, val));
  saveState();
}
function updateMasteryFromAnswer(nodeId, correct) {
  const current = getMastery(nodeId);
  const delta = correct ? 8 : -4;
  setMastery(nodeId, current + delta);
}

/* ═══ SEEN QUESTIONS ═══ */
function markSeen(qId) {
  if (!STATE.seenQuestions.includes(qId)) STATE.seenQuestions.push(qId);
  // Reset after seeing 80% of bank
  const totalQ = (typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK.length : 200)
               + (typeof EXTRA_QUESTIONS !== 'undefined' ? EXTRA_QUESTIONS.length : 0);
  if (STATE.seenQuestions.length > totalQ * 0.85) STATE.seenQuestions = [];
  saveState();
}
function isSeen(qId) { return STATE.seenQuestions.includes(qId); }
function getUnseen(pool) { return pool.filter(q => !isSeen(q.id)); }

/* ═══ REVISION QUEUE ═══ */
function addToRevision(nodeId) {
  const existing = STATE.revisionQueue.find(r => r.nodeId === nodeId);
  if (!existing) {
    STATE.revisionQueue.push({ nodeId, lastRevised: Date.now(), intervalIndex: 0 });
  }
  saveState();
}
function getDueRevisions() {
  const now = Date.now();
  const INTERVALS = [1, 3, 7, 14, 30, 60];
  return STATE.revisionQueue.filter(r => {
    const interval = INTERVALS[Math.min(r.intervalIndex, INTERVALS.length-1)];
    return now - r.lastRevised >= interval * 86400000;
  });
}
function advanceRevision(nodeId) {
  const r = STATE.revisionQueue.find(r => r.nodeId === nodeId);
  if (r) {
    r.lastRevised = Date.now();
    r.intervalIndex = Math.min(r.intervalIndex + 1, 5);
  }
  saveState();
}

/* ═══ HISTORY LOGGING ═══ */
function logAnswer(nodeId, correct, qId) {
  STATE.history.push({ date: Date.now(), nodeId, correct, qId });
  if (STATE.history.length > 2000) STATE.history = STATE.history.slice(-2000);
  updateMasteryFromAnswer(nodeId, correct);
  if (!correct) addToRevision(nodeId);
  saveState();
}

/* ═══ MISSION CONTROL ═══ */
function renderMission() {
  updateXPDisplay();
  renderGreeting();
  renderConceptPreview();
  renderRadar();
  renderJourney();
  renderCAWidget();
  renderHabitLoop();
  renderPredictions();
  renderMissionStats();
}

function renderGreeting() {
  const g = document.getElementById('missionGreeting');
  const h = document.getElementById('missionHeading');
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good Morning' : hr < 17 ? 'Good Afternoon' : 'Good Evening';
  const name = STATE.userName ? `, ${STATE.userName}` : '';
  if (g) g.textContent = `${greet}${name}`;
  if (h) {
    if (!STATE.diagnosed) h.textContent = 'Begin with your Diagnostic Scan →';
    else h.textContent = STATE.mode === 'exam' ? 'Exam Mode Active — Let\'s Score Higher' : 'Your Learning Journey Continues';
  }
}

function renderMissionStats() {
  const total = STATE.history.length;
  const correct = STATE.history.filter(h => h.correct).length;
  const acc = total > 0 ? Math.round(correct/total*100) : 0;
  const el = id => document.getElementById(id);
  if (el('statXP')) el('statXP').textContent = STATE.xp;
  if (el('statQuestions')) el('statQuestions').textContent = total;
  if (el('statAccuracy')) el('statAccuracy').textContent = total > 0 ? `${acc}%` : '—';
  if (el('statStreak')) el('statStreak').textContent = STATE.streak;
}

function renderConceptPreview() {
  const idx = new Date().getDate() % CONCEPT_OF_DAY.length;
  const c = CONCEPT_OF_DAY[idx];
  if (!c) return;
  const el = id => document.getElementById(id);
  if (el('cpConcept')) el('cpConcept').textContent = c.concept;
  if (el('cpSubject')) el('cpSubject').textContent = c.subject;
}

function renderRadar() {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const subjects = ['Polity','Economy','Environment','History','Geography','Sci & Tech','Governance','Int. Relations'];
  const scores = subjects.map(s => {
    const nodes = KNOWLEDGE_GRAPH.nodes.filter(n => n.subject === s);
    if (!nodes.length) return 20;
    const avg = nodes.reduce((a,n) => a + getMastery(n.id), 0) / nodes.length;
    return Math.max(15, avg);
  });
  drawRadar(ctx, canvas.width, canvas.height, subjects, scores);
  // Zones
  const zEl = document.getElementById('rcZones');
  if (zEl) {
    zEl.innerHTML = '';
    const weak = subjects.filter((s,i) => scores[i] < 40);
    const strong = subjects.filter((s,i) => scores[i] >= 60);
    weak.slice(0,3).forEach(s => zEl.innerHTML += `<span class="zone-badge zone-weak">⚠ ${s}</span> `);
    strong.slice(0,2).forEach(s => zEl.innerHTML += `<span class="zone-badge zone-strong">✓ ${s}</span> `);
  }
}

function drawRadar(ctx, W, H, labels, values) {
  const cx = W/2, cy = H/2;
  const maxR = Math.min(cx, cy) - 28;
  const n = labels.length;
  ctx.clearRect(0, 0, W, H);
  // Grid
  for (let ring = 1; ring <= 4; ring++) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI/2;
      const r = (ring/4) * maxR;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(124,106,247,0.15)';
    ctx.lineWidth = 1; ctx.stroke();
  }
  // Axes
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI/2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
    ctx.strokeStyle = 'rgba(124,106,247,0.2)';
    ctx.stroke();
    // Label
    const lx = cx + (maxR + 16) * Math.cos(angle);
    const ly = cy + (maxR + 16) * Math.sin(angle);
    ctx.fillStyle = 'rgba(153,153,187,0.7)';
    ctx.font = '9px Space Grotesk';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(labels[i].slice(0,6), lx, ly);
  }
  // Fill
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI/2;
    const r = (values[i] / 100) * maxR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(124,106,247,0.18)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(124,106,247,0.8)';
  ctx.lineWidth = 2; ctx.stroke();
  // Dots
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI/2;
    const r = (values[i] / 100) * maxR;
    ctx.beginPath();
    ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 3, 0, Math.PI*2);
    ctx.fillStyle = '#7c6af7'; ctx.fill();
  }
}

function renderJourney() {
  const el = document.getElementById('journeyStages');
  if (!el) return;
  el.innerHTML = '';
  const totalXP = STATE.xp;
  const ncertDone = Object.keys(STATE.mastery).filter(k => STATE.mastery[k] > 0).length;
  LEARNING_JOURNEY_STAGES.forEach((stage, i) => {
    const unlocked = totalXP >= stage.xpRequired;
    const isCurrent = i === LEARNING_JOURNEY_STAGES.findLastIndex((s,j) => totalXP >= s.xpRequired);
    const cls = `journey-stage ${unlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''}`;
    el.innerHTML += `
      <div class="${cls}" title="${stage.desc}">
        <div class="js-icon">${stage.icon}</div>
        <div class="js-label">${stage.label}</div>
      </div>`;
  });
}

function renderCAWidget() {
  const el = document.getElementById('cawItems');
  if (!el || typeof CURRENT_AFFAIRS === 'undefined') return;
  el.innerHTML = CURRENT_AFFAIRS.slice(0,3).map(ca => `
    <div class="caw-item" onclick="navigate('affairs')">
      <div class="caw-cat">${ca.category}</div>
      <div class="caw-headline">${ca.title}</div>
    </div>`).join('');
}

function renderHabitLoop() {
  const el = document.getElementById('habitItems');
  if (!el) return;
  const habits = [
    { icon: '🌅', label: 'Morning: Concept of the Day', sub: '+15 XP', key: 'morningDone', panel: 'concept' },
    { icon: '📚', label: 'Afternoon: Study Module', sub: '+50 XP', key: 'afternoonDone', panel: 'ncert' },
    { icon: '⚡', label: 'Evening: Quiz + Revision', sub: '+35 XP', key: 'eveningDone', panel: 'quiz' },
  ];
  el.innerHTML = habits.map(h => `
    <div class="habit-item ${STATE.habitLoop[h.key] ? 'done' : ''}" onclick="habitTap('${h.key}','${h.panel}')">
      <span class="hi-icon">${h.icon}</span>
      <div class="hi-text">
        <div class="hi-label">${h.label}</div>
        <div class="hi-sub">${h.sub}</div>
      </div>
      <div class="hi-check">✓</div>
    </div>`).join('');
}

function habitTap(key, panel) {
  if (!STATE.habitLoop[key]) {
    STATE.habitLoop[key] = true;
    saveState();
    renderHabitLoop();
  }
  navigate(panel);
}

function renderPredictions() {
  const el = document.getElementById('predictList');
  if (!el || typeof TOPIC_FREQUENCY === 'undefined') return;
  const hp = TOPIC_FREQUENCY.highProbability2025 || [];
  el.innerHTML = hp.slice(0,5).map(t => {
    const pct = t.probability || 70;
    return `<div class="predict-item">
      <span class="pi-prob">${pct}%</span>
      <span class="pi-topic">${t.topic}</span>
      <div class="pi-bar"><div class="pi-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

/* ═══ MENTOR SYSTEM ═══ */
function toggleMentor() {
  const b = document.getElementById('mentorBubble');
  if (!b) return;
  const isOpen = b.style.display !== 'none';
  if (!isOpen) updateMentorAdvice();
  b.style.display = isOpen ? 'none' : 'block';
}

function updateMentorAdvice() {
  const subjects = ['Polity','Economy','Environment','History','Geography','Sci & Tech'];
  const scores = subjects.map(s => {
    const nodes = KNOWLEDGE_GRAPH.nodes.filter(n => n.subject === s);
    return nodes.reduce((a,n) => a + getMastery(n.id), 0) / (nodes.length || 1);
  });
  const weakIdx = scores.indexOf(Math.min(...scores));
  const weakSubject = subjects[weakIdx];
  const dueCount = getDueRevisions().length;

  let advice = '';
  if (!STATE.diagnosed) advice = '🧬 Start with the Diagnostic Scan to map your knowledge landscape.';
  else if (dueCount > 0) advice = `🔄 ${dueCount} topic${dueCount>1?'s':''} due for revision — don't let the spacing lapse!`;
  else if (scores[weakIdx] < 30) advice = `⚠️ ${weakSubject} is your weakest zone. Focus NCERT modules there first.`;
  else advice = '🚀 Good progress! Try the Adaptive Quiz to push your weak nodes further.';

  document.getElementById('mentorMsg').textContent = advice;
  const sugg = document.getElementById('mentorSugg');
  sugg.innerHTML = [
    ['🧬 Diagnostic', 'diagnostic'],
    ['🔄 Revision', 'revision'],
    ['⚡ Quick Quiz', 'quiz'],
    ['📊 Analytics', 'performance'],
  ].map(([label, panel]) =>
    `<button class="mentor-sugg-btn" onclick="navigate('${panel}');toggleMentor()">${label}</button>`
  ).join('');
}

/* ═══ SPLASH → INIT ═══ */
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  const messages = [
    'Initializing knowledge nodes...',
    'Mapping 50 concept nodes...',
    'Loading question bank...',
    'Calibrating difficulty matrix...',
    'Engaging cosmic engine...',
  ];
  let idx = 0; let pct = 0;
  const fill = document.getElementById('splashFill');
  const caption = document.getElementById('splashCaption');
  const timer = setInterval(() => {
    pct += 20;
    if (fill) fill.style.width = pct + '%';
    if (caption && idx < messages.length) caption.textContent = messages[idx++];
    if (pct >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        const splash = document.getElementById('splash');
        const app = document.getElementById('app');
        if (splash) { splash.style.opacity = '0'; splash.style.transition = 'opacity 0.5s'; }
        setTimeout(() => {
          if (splash) splash.style.display = 'none';
          if (app) app.style.display = 'block';
          updateXPDisplay();
          document.getElementById('streakDisplay').textContent = `${STATE.streak}🔥`;
          navigate('home');
        }, 500);
      }, 300);
    }
  }, 400);
});
