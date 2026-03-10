// ══════════════════════════════════════════════════════
//  DIAGNOSTIC ENGINE
// ══════════════════════════════════════════════════════
const Diagnostic = {
  state: { qIdx: 0, answers: {}, startTime: null, questions: [] },

  start() {
    const name = document.getElementById('diagName')?.value.trim();
    if (name) STATE.userName = name;
    STATE.diagTarget = document.getElementById('diagTarget')?.value;
    STATE.diagHours = parseInt(document.getElementById('diagHours')?.value || 4);
    save();

    // Pick 15 questions spanning all subjects (3 per subject)
    const subjects = ['Polity','Economy','Environment','History','Sci & Tech'];
    const qs = [];
    subjects.forEach(s => {
      const pool = DIAGNOSTIC_QUESTIONS.filter(q => q.subject === s);
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      qs.push(...shuffled.slice(0, 10)); // up to 10 per subject
    });
    this.state.questions = qs.sort(() => Math.random() - 0.5).slice(0, 55);
    this.state.qIdx = 0;
    this.state.answers = {};
    this.state.startTime = Date.now();

    document.getElementById('diag-intro').style.display = 'none';
    document.getElementById('diag-results').style.display = 'none';
    document.getElementById('diag-exam').style.display = 'block';
    this.renderQ();
  },

  renderQ() {
    const { qIdx, questions } = this.state;
    if (qIdx >= questions.length) { this.showResults(); return; }
    const q = questions[qIdx];
    const pct = Math.round((qIdx / questions.length) * 100);
    const color = subjectColor(q.subject);
    const answered = this.state.answers[qIdx] !== undefined;

    document.getElementById('diag-exam').innerHTML = `
      <div class="diag-progress-bar"><div class="diag-progress-fill" style="width:${pct}%"></div></div>
      <div class="diag-header-row">
        <div class="diag-q-num">Question ${qIdx + 1} of ${questions.length}</div>
        <span class="diag-subj-tag ${subjectClass(q.subject)}">${q.subject}</span>
        <span class="diag-subj-tag" style="background:rgba(255,255,255,0.06);color:#888;font-size:0.52rem">${q.difficulty}</span>
      </div>
      <div class="diag-q-text">${q.q}</div>
      <div class="diag-opts">
        ${q.opts.map((opt, i) => {
          let cls = 'diag-opt';
          if (answered) {
            if (i === q.ans) cls += ' correct';
            else if (this.state.answers[qIdx] === i) cls += ' wrong';
          }
          return `<div class="${cls}" onclick="Diagnostic.answer(${i})" data-opt="${i}">
            <span class="diag-opt-key">${String.fromCharCode(65+i)}</span>
            <span>${opt}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="diag-skip-row">
        ${answered
          ? `<button class="lo-btn-primary" onclick="Diagnostic.next()" style="font-size:0.75rem;padding:0.6rem 1.5rem">Next →</button>`
          : `<button class="lo-btn-secondary" onclick="Diagnostic.next()" style="font-size:0.72rem;padding:0.5rem 1.1rem">Skip</button>`
        }
      </div>
    `;
  },

  answer(optIdx) {
    const q = this.state.questions[this.state.qIdx];
    if (this.state.answers[this.state.qIdx] !== undefined) return;
    this.state.answers[this.state.qIdx] = optIdx;
    if (optIdx === q.ans) {
      addXP(8, 'Diagnostic correct');
      // Boost mastery for the node
      if (q.node) setMastery(q.node, getMastery(q.node) + 18);
    } else {
      if (q.node) setMastery(q.node, Math.max(0, getMastery(q.node) - 5));
    }
    this.renderQ();
  },

  next() {
    this.state.qIdx++;
    if (this.state.qIdx >= this.state.questions.length) this.showResults();
    else this.renderQ();
  },

  showResults() {
    const { questions, answers } = this.state;
    const subjectScores = {};
    questions.forEach((q, i) => {
      if (!subjectScores[q.subject]) subjectScores[q.subject] = { correct: 0, total: 0 };
      if (answers[i] !== undefined) {
        subjectScores[q.subject].total++;
        if (answers[i] === q.ans) subjectScores[q.subject].correct++;
      }
    });

    const totalCorrect = Object.values(answers).filter((a, i) => questions[i] && a === questions[i].ans).length;
    const totalAnswered = Object.keys(answers).length;
    const pct = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    const level = pct >= 70 ? 'advanced' : pct >= 40 ? 'intermediate' : 'beginner';
    const levelLabels = { beginner: '🌱 Beginner', intermediate: '📈 Intermediate', advanced: '🚀 Advanced' };
    const levelColors = { beginner: '#22c55e', intermediate: '#f59e0b', advanced: '#7c6af7' };

    STATE.diagnosed = true;
    STATE.diagResult = { level, subjectScores, totalCorrect, totalAnswered, pct };
    save();

    document.getElementById('diag-exam').style.display = 'none';
    document.getElementById('diag-results').style.display = 'block';

    const subjHTML = Object.entries(subjectScores).map(([s, d]) => {
      const sp = d.total ? Math.round((d.correct / d.total) * 100) : 0;
      const verdict = sp >= 70 ? 'Strong ✓' : sp >= 40 ? 'Developing' : 'Needs work ⚠';
      const c = subjectColor(s);
      return `<div class="dsb-card" style="border-top-color:${c}">
        <div class="dsb-subj" style="color:${c}">${s}</div>
        <div class="dsb-pct" style="color:${c}">${sp}%</div>
        <div class="dsb-bar-wrap"><div class="dsb-bar" style="width:${sp}%;background:${c}"></div></div>
        <div class="dsb-verdict">${verdict}</div>
      </div>`;
    }).join('');

    document.getElementById('diag-results').innerHTML = `
      <div class="diag-result-hero">
        <div class="diag-result-score" style="color:${levelColors[level]}">${pct}%</div>
        <div>
          <div class="diag-result-level">${levelLabels[level]}</div>
          <div class="diag-result-desc">
            ${totalCorrect} correct out of ${totalAnswered} answered.
            Your knowledge graph has been calibrated. A personalised study plan is ready.
            ${pct < 40 ? 'Focus on NCERT fundamentals before current affairs.' :
              pct < 70 ? 'Good base — patch weak subjects, then build current affairs.' :
              'Strong foundation — shift focus to analytical questions and mains writing.'}
          </div>
        </div>
      </div>
      <div class="diag-subj-breakdown">${subjHTML}</div>
      <div style="display:flex;gap:0.85rem;flex-wrap:wrap">
        <button class="lo-btn-primary" onclick="App.goto('plan')">View My Study Plan →</button>
        <button class="lo-btn-secondary" onclick="App.goto('ncert')">Start NCERT Modules</button>
        <button class="lo-btn-secondary" onclick="App.goto('graph')">View Knowledge Map</button>
      </div>
    `;

    addXP(50, 'Diagnostic completed');
  }
};

// ══════════════════════════════════════════════════════
//  NCERT LESSON ENGINE
// ══════════════════════════════════════════════════════
const NCERT = {
  state: { module: null, step: 0, quizAnswers: {}, quizQ: 0, complete: false },

  filter(subj) {
    document.querySelectorAll('.lo-filter[data-subj]').forEach(b =>
      b.classList.toggle('active', b.dataset.subj === subj));
    this.renderHome(subj);
  },

  renderHome(filter = 'all') {
    const grid = document.getElementById('ncertGrid');
    if (!grid) return;
    document.getElementById('ncert-home').style.display = 'block';
    document.getElementById('ncert-lesson').style.display = 'none';

    const modules = filter === 'all' ? NCERT_MODULES : NCERT_MODULES.filter(m => m.subject === filter);
    const progKey = id => parseInt(localStorage.getItem('ncert_prog_' + id) || '0');

    grid.innerHTML = modules.map(m => {
      const prog = progKey(m.id);
      const pct = Math.round((prog / m.lessons.length) * 100);
      const color = subjectColor(m.subject);
      return `<div class="ncert-card" onclick="NCERT.startModule('${m.id}')">
        <div class="ncert-card::before" style="background:${color}"></div>
        <div class="ncert-card-class">${m.class} · ${m.chapter}</div>
        <div class="ncert-card-title">${m.title}</div>
        <span class="ncert-card-subj ${subjectClass(m.subject)}">${m.subject}</span>
        <div class="ncert-card-meta">
          <span class="ncert-card-dur">⏱ ${m.duration} min</span>
          <span class="ncert-card-prog" style="color:${pct===100?'#22c55e':color}">${pct===100?'✓ Done':pct+'%'}</span>
        </div>
        <div class="ncert-card-bar"><div class="ncert-card-bar-fill" style="width:${pct}%;background:${color}"></div></div>
      </div>`;
    }).join('');
  },

  startModule(id) {
    const mod = NCERT_MODULES.find(m => m.id === id);
    if (!mod) return;
    this.state.module = mod;
    this.state.step = 0;
    this.state.quizAnswers = {};
    this.state.quizQ = 0;
    this.state.complete = false;

    document.getElementById('ncert-home').style.display = 'none';
    document.getElementById('ncert-lesson').style.display = 'block';
    this.renderStep();
  },

  renderStep() {
    const { module: mod, step } = this.state;
    const lesson = mod.lessons[step];
    const pct = Math.round(((step) / mod.lessons.length) * 100);
    const total = mod.lessons.length;

    const dots = mod.lessons.map((l, i) =>
      `<div class="lsi-dot ${i < step ? 'done' : i === step ? 'active' : ''}"></div>`
    ).join('');

    let content = '';
    if (lesson.type === 'concept') content = this.renderConceptStep(lesson);
    else if (lesson.type === 'example') content = this.renderExampleStep(lesson);
    else if (lesson.type === 'quiz') content = this.renderQuizStep(lesson);
    else if (lesson.type === 'summary') content = this.renderSummaryStep(lesson, step === total - 1);

    document.getElementById('ncert-lesson').innerHTML = `
      <div class="lesson-header">
        <button class="lesson-back" onclick="NCERT.renderHome()">←</button>
        <div class="lesson-title">${mod.title}</div>
      </div>
      <div class="lesson-progress-bar"><div class="lesson-progress-fill" style="width:${pct}%"></div></div>
      <div class="lesson-step-indicator">
        ${dots}
        <span class="lesson-step-type" style="margin-left:0.5rem">${lesson.type.toUpperCase()}</span>
      </div>
      ${content}
    `;
  },

  renderConceptStep(l) {
    return `
      <div class="lesson-concept-box">
        <div class="lesson-concept-title">${l.title}</div>
        <div class="lesson-concept-body">${l.content.replace(/→/g,'<span style="color:var(--accent)">→</span>')}</div>
        <div class="lesson-key-fact"><span class="lkf-icon">💡</span><span>${l.keyFact}</span></div>
      </div>
      <button class="lo-btn-primary" onclick="NCERT.nextStep()" style="font-size:0.78rem">Next: Example →</button>
    `;
  },

  renderExampleStep(l) {
    return `
      <div class="lesson-example-box">
        <div class="lesson-example-title">📌 ${l.title}</div>
        <div class="lesson-example-body">${l.content.replace(/→/g,'<span style="color:var(--green)">→</span>')}</div>
        <div class="lesson-key-fact" style="margin-top:1rem"><span class="lkf-icon">⭐</span><span>${l.keyFact}</span></div>
      </div>
      <button class="lo-btn-primary" onclick="NCERT.nextStep()" style="font-size:0.78rem">Mini Quiz →</button>
    `;
  },

  renderQuizStep(l) {
    const qi = this.state.quizQ;
    if (qi >= l.questions.length) {
      const correct = l.questions.filter((q, i) => this.state.quizAnswers[i] === q.ans).length;
      const pct = Math.round((correct / l.questions.length) * 100);
      if (pct >= 66) addXP(20, 'NCERT quiz passed');
      return `
        <div style="text-align:center;padding:2rem">
          <div style="font-family:var(--font-syne);font-size:3rem;font-weight:800;color:${pct>=66?'var(--green)':'var(--saffron)'}">${correct}/${l.questions.length}</div>
          <div style="font-size:0.85rem;color:var(--text2);margin:0.5rem 0 1.5rem">${pct>=66?'Well done! Moving forward.':'Keep revising — quiz again anytime.'}</div>
          ${pct >= 50
            ? `<button class="lo-btn-primary" onclick="NCERT.nextStep()">Summary Card →</button>`
            : `<div style="display:flex;gap:0.75rem;justify-content:center">
                <button class="lo-btn-secondary" onclick="NCERT.retryQuiz()">Retry Quiz</button>
                <button class="lo-btn-primary" onclick="NCERT.nextStep()">Continue anyway →</button>
               </div>`}
        </div>`;
    }
    const q = l.questions[qi];
    const answered = this.state.quizAnswers[qi] !== undefined;
    return `
      <div style="font-family:var(--font-mono);font-size:0.55rem;color:var(--text3);margin-bottom:0.65rem;letter-spacing:0.1em">Question ${qi+1} of ${l.questions.length}</div>
      <div class="lesson-quiz-q">${q.q}</div>
      <div class="lesson-opts">
        ${q.opts.map((o, i) => {
          let cls = 'lesson-opt';
          if (answered) { if (i===q.ans) cls+=' correct'; else if (this.state.quizAnswers[qi]===i) cls+=' wrong'; }
          return `<div class="${cls}" onclick="NCERT.answerQuiz(${qi},${i})">
            <span class="lesson-opt-key">${String.fromCharCode(65+i)}</span><span>${o}</span></div>`;
        }).join('')}
      </div>
      ${answered ? `<button class="lo-btn-primary" onclick="NCERT.nextQuizQ()" style="font-size:0.75rem;padding:0.55rem 1.2rem">Next →</button>` : ''}
    `;
  },

  answerQuiz(qi, optIdx) {
    if (this.state.quizAnswers[qi] !== undefined) return;
    this.state.quizAnswers[qi] = optIdx;
    const l = this.state.module.lessons[this.state.step];
    if (optIdx === l.questions[qi].ans) addXP(10, 'NCERT quiz correct');
    this.renderStep();
  },

  nextQuizQ() {
    this.state.quizQ++;
    this.renderStep();
  },

  retryQuiz() {
    this.state.quizAnswers = {};
    this.state.quizQ = 0;
    this.renderStep();
  },

  renderSummaryStep(l, isLast) {
    const points = l.points.map(p => `<div class="lesson-summary-point"><span class="lsp-bullet">→</span><span>${p}</span></div>`).join('');
    return `
      <div class="lesson-summary-card">
        <div class="lesson-summary-title">📋 ${l.title}</div>
        ${points}
      </div>
      ${isLast ? `
        <div class="lesson-complete-banner" style="margin-top:1rem">
          <div class="lcb-icon">🎉</div>
          <div>
            <div class="lcb-title">Module Complete!</div>
            <div class="lcb-sub">+50 XP · Knowledge node updated · See all modules</div>
          </div>
        </div>
        <div style="display:flex;gap:0.65rem;flex-wrap:wrap">
          <button class="lo-btn-primary" onclick="NCERT.completeModule()">Back to modules</button>
          <button class="lo-btn-secondary" onclick="App.goto('quiz')">Take quiz →</button>
        </div>
      ` : `<button class="lo-btn-primary" onclick="NCERT.nextStep()" style="margin-top:1rem">Complete Module →</button>`}
    `;
  },

  nextStep() {
    const mod = this.state.module;
    if (this.state.step < mod.lessons.length - 1) {
      this.state.step++;
      this.state.quizQ = 0;
      this.state.quizAnswers = {};
      this.renderStep();
    } else {
      this.completeModule();
    }
  },

  completeModule() {
    const mod = this.state.module;
    localStorage.setItem('ncert_prog_' + mod.id, mod.lessons.length);
    if (mod.nodeId) setMastery(mod.nodeId, Math.min(100, getMastery(mod.nodeId) + 35));
    addXP(50, 'NCERT module completed');
    this.renderHome();
  }
};

// ══════════════════════════════════════════════════════
//  KNOWLEDGE GRAPH VISUALISER
// ══════════════════════════════════════════════════════
const KnowledgeGraph = {
  nodes: [], activeFilter: 'all', dragging: null,

  render() {
    this.buildNodePositions();
    this.renderSubjectFilter();
    this.renderCanvas();
    this.renderStats();
  },

  buildNodePositions() {
    const subjects = [...new Set(KNOWLEDGE_GRAPH.nodes.map(n => n.subject))];
    const W = 700, H = 400;
    const subjectCenters = {};
    subjects.forEach((s, i) => {
      const angle = (i / subjects.length) * 2 * Math.PI;
      subjectCenters[s] = { x: W/2 + 240 * Math.cos(angle), y: H/2 + 160 * Math.sin(angle) };
    });

    this.nodes = KNOWLEDGE_GRAPH.nodes.map((n, i) => {
      const center = subjectCenters[n.subject];
      const jitter = () => (Math.random() - 0.5) * 80;
      return { ...n, x: (center?.x || W/2) + jitter(), y: (center?.y || H/2) + jitter() };
    });
  },

  renderSubjectFilter() {
    const el = document.getElementById('graphSubjFilter');
    if (!el) return;
    const subjects = ['all', ...new Set(KNOWLEDGE_GRAPH.nodes.map(n => n.subject))];
    el.innerHTML = subjects.map(s => `
      <button class="lo-filter ${s === this.activeFilter ? 'active' : ''}" data-subj="${s}"
        onclick="KnowledgeGraph.filterSubj('${s}')">${s === 'all' ? 'All' : s}</button>`
    ).join('');
  },

  filterSubj(s) {
    this.activeFilter = s;
    this.renderSubjectFilter();
    this.renderCanvas();
  },

  renderCanvas() {
    const canvas = document.getElementById('graphCanvas');
    if (!canvas) return;
    const wrap = canvas.parentElement;
    canvas.width = wrap.offsetWidth;
    canvas.height = wrap.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    const visibleNodes = this.activeFilter === 'all'
      ? this.nodes
      : this.nodes.filter(n => n.subject === this.activeFilter);

    // Scale nodes to canvas
    const scaleX = W / 720, scaleY = H / 420;

    // Draw edges
    KNOWLEDGE_GRAPH.edges.forEach(edge => {
      const from = this.nodes.find(n => n.id === edge.from);
      const to = this.nodes.find(n => n.id === edge.to);
      if (!from || !to) return;
      if (this.activeFilter !== 'all' && from.subject !== this.activeFilter && to.subject !== this.activeFilter) return;
      ctx.strokeStyle = 'rgba(124,106,247,0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(from.x * scaleX, from.y * scaleY);
      ctx.lineTo(to.x * scaleX, to.y * scaleY);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Draw nodes
    visibleNodes.forEach(n => {
      const mastery = getMastery(n.id);
      const color = mastery >= 80 ? '#22c55e' : mastery >= 40 ? subjectColor(n.subject) : mastery > 0 ? '#ef4444' : '#2a2a38';
      const r = mastery >= 80 ? 13 : mastery >= 40 ? 11 : 9;
      const x = n.x * scaleX, y = n.y * scaleY;

      // Glow for mastered nodes
      if (mastery >= 60) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
      }

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ring for untouched
      if (mastery === 0) {
        ctx.strokeStyle = '#3a3a4a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Label
      ctx.fillStyle = 'rgba(224,222,240,0.7)';
      ctx.font = `${mastery >= 60 ? 600 : 400} 9px Space Grotesk, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText(n.topic.split(' ').slice(0, 2).join(' '), x, y + r + 12);
    });

    // Click handler
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left), my = (e.clientY - rect.top);
      const hit = visibleNodes.find(n => {
        const nx = n.x * scaleX, ny = n.y * scaleY;
        return Math.sqrt((mx - nx) ** 2 + (my - ny) ** 2) < 18;
      });
      if (hit) this.showNodeDetail(hit);
    };

    // Hover handler for tooltip
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const hit = visibleNodes.find(n => {
        const nx = n.x * scaleX, ny = n.y * scaleY;
        return Math.sqrt((mx - nx) ** 2 + (my - ny) ** 2) < 16;
      });
      const tooltip = document.getElementById('graphTooltip');
      if (tooltip) {
        if (hit) {
          const m = getMastery(hit.id);
          tooltip.style.display = 'block';
          tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
          tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
          tooltip.innerHTML = `<strong>${hit.topic}</strong><br>${hit.subject}<br>Mastery: ${m}%`;
        } else {
          tooltip.style.display = 'none';
        }
      }
    };
  },

  showNodeDetail(node) {
    const el = document.getElementById('graphNodeDetail');
    if (!el) return;
    const mastery = getMastery(node.id);
    const color = subjectColor(node.subject);
    el.style.display = 'block';
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-family:var(--font-syne);font-size:1.1rem;font-weight:700;margin-bottom:0.2rem">${node.topic}</div>
          <span class="diag-subj-tag ${subjectClass(node.subject)}" style="font-size:0.52rem">${node.subject}</span>
        </div>
        <div style="text-align:right">
          <div style="font-family:var(--font-syne);font-size:1.8rem;font-weight:800;color:${color}">${mastery}%</div>
          <div style="font-family:var(--font-mono);font-size:0.52rem;color:var(--text3)">mastery</div>
        </div>
      </div>
      <div style="margin-top:0.85rem">
        <div style="font-family:var(--font-mono);font-size:0.55rem;color:var(--text3);margin-bottom:0.35rem">Subtopics</div>
        <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
          ${node.subtopics.map(s => `<span style="font-family:var(--font-mono);font-size:0.58rem;padding:0.2rem 0.6rem;background:var(--bg3);border-radius:10px;color:var(--text2)">${s}</span>`).join('')}
        </div>
      </div>
      <div style="margin-top:1rem;display:flex;gap:0.65rem">
        <button class="lo-btn-primary" onclick="App.goto('quiz')" style="font-size:0.72rem;padding:0.55rem 1.1rem">Practice →</button>
        <button class="lo-btn-secondary" onclick="App.goto('ncert')" style="font-size:0.72rem;padding:0.5rem 1rem">Study notes</button>
      </div>
    `;
  },

  renderStats() {
    const el = document.getElementById('graphStatsRow');
    if (!el) return;
    const nodes = KNOWLEDGE_GRAPH.nodes;
    const mastered = nodes.filter(n => getMastery(n.id) >= 80).length;
    const learning = nodes.filter(n => getMastery(n.id) >= 40 && getMastery(n.id) < 80).length;
    const weak = nodes.filter(n => getMastery(n.id) > 0 && getMastery(n.id) < 40).length;
    const untouched = nodes.filter(n => getMastery(n.id) === 0).length;
    const overall = Math.round(nodes.reduce((sum, n) => sum + getMastery(n.id), 0) / nodes.length);

    el.innerHTML = [
      { val: overall + '%', lbl: 'Overall Mastery', color: '#7c6af7' },
      { val: mastered, lbl: 'Mastered Nodes', color: '#22c55e' },
      { val: learning, lbl: 'In Progress', color: '#f59e0b' },
      { val: untouched, lbl: 'Not Started', color: '#888' },
    ].map(s => `
      <div class="gsr-stat">
        <div class="gsr-val" style="color:${s.color}">${s.val}</div>
        <div class="gsr-lbl">${s.lbl}</div>
      </div>`).join('');
  }
};
