// ══════════════════════════════════════════════════════
//  ADAPTIVE QUIZ ENGINE
// ══════════════════════════════════════════════════════
const Quiz = {
  state: { mode: null, questions: [], qIdx: 0, answers: {}, timer: null, timeLeft: 90 },

  renderHome() {
    document.getElementById('quiz-home').style.display = 'block';
    document.getElementById('quiz-active').style.display = 'none';
    const el = document.getElementById('quizRecent');
    if (el) {
      el.innerHTML = `<div style="font-family:var(--font-mono);font-size:0.6rem;color:var(--text3);margin-top:1rem;letter-spacing:0.1em">SELECT A QUIZ MODE ABOVE</div>`;
    }
  },

  start(mode) {
    this.state.mode = mode;
    this.state.qIdx = 0;
    this.state.answers = {};

    let pool = [...DIAGNOSTIC_QUESTIONS];

    if (mode === 'adaptive') {
      // Prioritise weak knowledge nodes
      pool = DIAGNOSTIC_QUESTIONS.filter(q => q.node && getMastery(q.node) < 50);
      if (pool.length < 10) pool = DIAGNOSTIC_QUESTIONS;
    } else if (mode === 'subject') {
      // For now pick random; TODO add subject picker
      pool = DIAGNOSTIC_QUESTIONS;
    } else if (mode === 'conceptday') {
      const dayIdx = Math.floor(Date.now() / 86400000) % CONCEPT_OF_DAY.length;
      const cod = CONCEPT_OF_DAY[dayIdx];
      // Build 5 questions from the COD
      const conceptQ = {
        id: 'cod1', subject: cod.subject, difficulty:'medium',
        q: cod.mcq.q, opts: cod.mcq.opts, ans: cod.mcq.ans, node: null,
      };
      pool = [conceptQ, ...DIAGNOSTIC_QUESTIONS.filter(q => q.subject === cod.subject).slice(0, 4)];
    }

    this.state.questions = [...pool].sort(() => Math.random() - 0.5).slice(0, mode === 'timed' ? 10 : 15);
    this.state.timeLeft = 90;

    document.getElementById('quiz-home').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';

    if (mode === 'timed') this.startTimer();
    this.renderQ();
  },

  startTimer() {
    clearInterval(this.state.timer);
    this.state.timeLeft = 90;
    this.state.timer = setInterval(() => {
      this.state.timeLeft--;
      const t = document.getElementById('quizTimerVal');
      if (t) {
        t.textContent = this.state.timeLeft + 's';
        t.parentElement.className = 'quiz-timer ' + (this.state.timeLeft < 20 ? 'urgent' : '');
      }
      if (this.state.timeLeft <= 0) {
        clearInterval(this.state.timer);
        this.nextQ();
      }
    }, 1000);
  },

  renderQ() {
    const { questions, qIdx, mode } = this.state;
    if (qIdx >= questions.length) { this.showResults(); return; }
    const q = questions[qIdx];
    const pct = Math.round((qIdx / questions.length) * 100);
    const answered = this.state.answers[qIdx] !== undefined;
    const color = subjectColor(q.subject);

    if (mode === 'timed') this.startTimer();

    document.getElementById('quiz-active').innerHTML = `
      <div class="quiz-active-header">
        <div style="font-family:var(--font-mono);font-size:0.58rem;color:var(--text3)">${qIdx+1}/${questions.length}</div>
        <div class="quiz-prog-wrap"><div class="quiz-prog-fill" style="width:${pct}%"></div></div>
        <div class="quiz-timer" id="quizTimerVal" style="${mode==='timed'?'':'display:none'}">${this.state.timeLeft}s</div>
      </div>
      <div style="display:flex;gap:0.5rem;margin-bottom:0.85rem">
        <span class="diag-subj-tag ${subjectClass(q.subject)}" style="font-size:0.54rem">${q.subject}</span>
        <span class="diag-subj-tag" style="background:rgba(255,255,255,0.06);color:#888;font-size:0.52rem">${q.difficulty}</span>
        ${mode === 'adaptive' && q.node ? `<span style="font-family:var(--font-mono);font-size:0.5rem;color:var(--text3)">weak node targeted</span>` : ''}
      </div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-opts">
        ${q.opts.map((opt, i) => {
          let cls = 'quiz-opt';
          if (answered) { if (i===q.ans) cls+=' correct'; else if (this.state.answers[qIdx]===i) cls+=' wrong'; }
          return `<div class="${cls}" onclick="Quiz.answer(${i})">
            <span class="quiz-opt-key">${String.fromCharCode(65+i)}</span><span>${opt}</span></div>`;
        }).join('')}
      </div>
      ${answered ? `<div class="quiz-explanation">
        ${this.state.answers[qIdx]===q.ans ? '✓ Correct! ' : '✗ Incorrect. '}
        ${q.node ? `This question covers <strong>${KNOWLEDGE_GRAPH.nodes.find(n=>n.id===q.node)?.topic}</strong>. ` : ''}
        Keep this pattern in mind for your revision.
      </div>` : ''}
      <div class="quiz-action-row">
        ${answered ? `<button class="lo-btn-primary" onclick="Quiz.nextQ()" style="font-size:0.75rem;padding:0.6rem 1.5rem">Next →</button>` : ''}
        <button class="lo-btn-secondary" onclick="Quiz.renderHome()" style="font-size:0.72rem;padding:0.5rem 1rem">Exit</button>
      </div>
    `;
  },

  answer(optIdx) {
    const q = this.state.questions[this.state.qIdx];
    if (this.state.answers[this.state.qIdx] !== undefined) return;
    clearInterval(this.state.timer);
    this.state.answers[this.state.qIdx] = optIdx;
    const correct = optIdx === q.ans;
    if (q.node) {
      const curr = getMastery(q.node);
      setMastery(q.node, correct ? Math.min(100, curr + 12) : Math.max(0, curr - 6));
    }
    if (correct) addXP(10, 'Quiz correct');
    // Log to history
    STATE.history.push({ date: new Date().toISOString(), nodeId: q.node, correct, total: 1 });
    save();
    this.renderQ();
  },

  nextQ() {
    this.state.qIdx++;
    if (this.state.qIdx >= this.state.questions.length) this.showResults();
    else {
      this.state.timeLeft = 90;
      this.renderQ();
    }
  },

  showResults() {
    clearInterval(this.state.timer);
    const { questions, answers } = this.state;
    const correct = questions.filter((q, i) => answers[i] === q.ans).length;
    const total = Object.keys(answers).length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    addXP(20, 'Quiz completed');

    document.getElementById('quiz-active').innerHTML = `
      <div style="text-align:center;padding:2rem 1rem">
        <div style="font-family:var(--font-syne);font-size:4rem;font-weight:800;color:${pct>=70?'var(--green)':pct>=50?'var(--saffron)':'var(--red)'};line-height:1">${pct}%</div>
        <div style="font-size:1rem;color:var(--text2);margin:0.5rem 0 0.25rem">${correct} / ${total} correct</div>
        <div style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text3);margin-bottom:2rem">
          ${pct>=70?'Excellent performance':'Keep practicing — each attempt updates your knowledge graph'}
        </div>
        <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap">
          <button class="lo-btn-primary" onclick="Quiz.start('${this.state.mode}')">Try Again</button>
          <button class="lo-btn-secondary" onclick="Quiz.renderHome()">Back</button>
          <button class="lo-btn-secondary" onclick="App.goto('graph')">View Graph</button>
        </div>
      </div>
    `;
  }
};

// ══════════════════════════════════════════════════════
//  NCERT MODULE ALIAS (for diagnostic.js reference)
// ══════════════════════════════════════════════════════
const ncertModule = NCERT; // alias

// ══════════════════════════════════════════════════════
//  OPTIONS ML PANEL
// ══════════════════════════════════════════════════════
const OptionsML = {
  render() {
    const el = document.getElementById('optionsML');
    if (!el) return;
    const d = ANSWER_KEY_DATA;
    const a = d.analysis;

    // Build the year-wise table
    const tableRows = d.years.map((yr, i) => {
      const total = d.totalQs[i];
      const pA = d.pctA[i], pB = d.pctB[i], pC = d.pctC[i], pD = d.pctD[i];
      const high = Math.max(pA, pB, pC, pD);
      const note = d.yearly_patterns.find(p => p.year === yr);
      return `<tr ${note ? 'class="ml-note-row"' : ''}>
        <td class="yr-col">${yr}</td>
        <td>${total}</td>
        <td class="${pA===high?'ml-high':''}">${pA}% (${d.optA[i]})</td>
        <td class="${pB===high?'ml-high':''}">${pB}% (${d.optB[i]})</td>
        <td class="${pC===high?'ml-high':''}">${pC}% (${d.optC[i]})</td>
        <td class="${pD===high?'ml-high':''}">${pD}% (${d.optD[i]})</td>
        ${note ? `<td style="font-size:0.56rem;max-width:180px">${note.note}</td>` : '<td></td>'}
      </tr>`;
    }).join('');

    el.innerHTML = `
      <!-- Intro -->
      <div class="ml-intro">
        Every year, UPSC releases official answer keys after the Preliminary examination. This panel analyses <strong>25 years (2000–2024)</strong> of those answer keys — tracking how often each option position (A, B, C, D) was the correct answer. The question: <em>does UPSC have a bias toward any particular option?</em>
      </div>

      <!-- Overall stats -->
      <div style="font-family:var(--font-syne);font-size:0.85rem;font-weight:700;margin-bottom:0.85rem">25-Year Average Distribution</div>
      <div class="ml-stats-row">
        ${['A','B','C','D'].map((opt, i) => {
          const pcts = [a.overall_2000_2024.A, a.overall_2000_2024.B, a.overall_2000_2024.C, a.overall_2000_2024.D];
          const recent = [a.recent_5yr.A, a.recent_5yr.B, a.recent_5yr.C, a.recent_5yr.D];
          const diff = (recent[i] - pcts[i]).toFixed(1);
          const trend = diff > 0.5 ? `↑ +${diff}% recent` : diff < -0.5 ? `↓ ${diff}% recent` : '→ stable';
          const tcolor = diff > 0.5 ? 'var(--green)' : diff < -0.5 ? 'var(--red)' : 'var(--text3)';
          return `<div class="ml-stat-card">
            <div class="ml-stat-option" style="color:var(--accent)">Option ${opt}</div>
            <div class="ml-stat-pct">${pcts[i]}% avg</div>
            <div class="ml-stat-trend" style="color:${tcolor}">${trend}</div>
          </div>`;
        }).join('')}
      </div>

      <!-- Visual bar chart -->
      <div class="ml-chart-wrap">
        <div class="ml-chart-title">Option Frequency by Year (All 4 options overlaid)</div>
        <canvas id="mlCanvas" height="180"></canvas>
      </div>

      <!-- Verdict -->
      <div class="ml-verdict-box no-bias">
        <div class="ml-verdict-title">🤖 ML Verdict: ${a.verdict.replace(/_/g,' ')}</div>
        <div class="ml-verdict-text">${a.insight}</div>
      </div>

      <!-- Year patterns -->
      <div style="font-family:var(--font-syne);font-size:0.85rem;font-weight:700;margin-bottom:0.65rem">Notable Year Patterns</div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem">
        ${d.yearly_patterns.map(p => `
          <div style="display:flex;gap:0.85rem;padding:0.65rem;background:var(--surface);border-radius:var(--radius-sm);font-size:0.82rem">
            <span style="font-family:var(--font-mono);font-weight:700;color:var(--accent);min-width:36px">${p.year}</span>
            <span style="color:var(--text2)">${p.note}</span>
          </div>`).join('')}
      </div>

      <!-- Full year table -->
      <div style="font-family:var(--font-syne);font-size:0.85rem;font-weight:700;margin-bottom:0.65rem">Complete Year-wise Data Table</div>
      <div style="overflow-x:auto">
        <table class="ml-year-table">
          <thead>
            <tr>
              <th>Year</th><th>Total Q</th><th>Option A</th><th>Option B</th><th>Option C</th><th>Option D</th><th>Notes</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>

      <!-- Strategy conclusion -->
      <div style="padding:1.25rem;background:rgba(124,106,247,0.08);border:1px solid rgba(124,106,247,0.2);border-radius:var(--radius);margin-top:1.5rem;font-size:0.85rem;line-height:1.75;color:var(--text2)">
        <strong style="color:var(--accent);font-family:var(--font-syne)">Strategic Conclusion</strong><br>
        The data decisively kills the popular exam strategy of "when in doubt, mark B/C." UPSC answer positions are statistically random. The only real pattern is that there is no exploitable pattern.
        However, the data does validate one insight: if you've eliminated two options and are choosing between two, each remaining option has roughly equal probability — so your subject knowledge and elimination skills are the only meaningful edge.
      </div>
    `;

    setTimeout(() => this.drawChart(), 80);
  },

  drawChart() {
    const canvas = document.getElementById('mlCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    const W = canvas.width, H = canvas.height;
    const pad = { top:20, right:20, bottom:35, left:40 };
    const cW = W - pad.left - pad.right, cH = H - pad.top - pad.bottom;
    ctx.clearRect(0, 0, W, H);

    const years = ANSWER_KEY_DATA.years;
    const datasets = [
      { label:'A', pcts: ANSWER_KEY_DATA.pctA, color:'#7c6af7' },
      { label:'B', pcts: ANSWER_KEY_DATA.pctB, color:'#22c55e' },
      { label:'C', pcts: ANSWER_KEY_DATA.pctC, color:'#f59e0b' },
      { label:'D', pcts: ANSWER_KEY_DATA.pctD, color:'#ef4444' },
    ];

    // Grid
    [20,22,24,26,28,30].forEach(v => {
      const y = pad.top + cH - ((v - 18) / 14) * cH;
      ctx.strokeStyle = '#1e1e28'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W-pad.right, y); ctx.stroke();
      ctx.fillStyle = '#555'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign='right';
      ctx.fillText(v+'%', pad.left - 4, y + 4);
    });

    // Reference line at 25%
    const refY = pad.top + cH - ((25 - 18) / 14) * cH;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1.5; ctx.setLineDash([6,4]);
    ctx.beginPath(); ctx.moveTo(pad.left, refY); ctx.lineTo(W-pad.right, refY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign='left';
    ctx.fillText('25% (random)', W-pad.right-80, refY-4);

    // Lines
    datasets.forEach(ds => {
      ctx.strokeStyle = ds.color; ctx.lineWidth = 2; ctx.lineJoin = 'round';
      ctx.beginPath();
      years.forEach((yr, i) => {
        const x = pad.left + (i / (years.length - 1)) * cW;
        const y = pad.top + cH - ((ds.pcts[i] - 18) / 14) * cH;
        if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();

      // Label at end
      const lastX = pad.left + cW + 4;
      const lastY = pad.top + cH - ((ds.pcts[ds.pcts.length-1] - 18) / 14) * cH;
      ctx.fillStyle = ds.color; ctx.font = 'bold 10px JetBrains Mono,monospace'; ctx.textAlign='left';
      ctx.fillText(ds.label, lastX, lastY + 4);
    });

    // Year labels
    years.filter(y => y % 4 === 0).forEach((yr, i) => {
      const idx = years.indexOf(yr);
      const x = pad.left + (idx / (years.length - 1)) * cW;
      ctx.fillStyle = '#555'; ctx.font = '9px JetBrains Mono,monospace'; ctx.textAlign='center';
      ctx.fillText(yr, x, H - 8);
    });
  }
};

// ══════════════════════════════════════════════════════
//  STUDY PLAN
// ══════════════════════════════════════════════════════
const StudyPlan = {
  render() {
    const el = document.getElementById('studyPlanContent');
    if (!el) return;
    const level = STATE.diagResult?.level || 'beginner';
    const plan = STUDY_PLAN_TEMPLATES[level];
    const levelColors = { beginner: '#22c55e', intermediate: '#f59e0b', advanced: '#7c6af7' };
    const levelLabels = { beginner: '🌱 Beginner Path', intermediate: '📈 Intermediate Path', advanced: '🚀 Advanced Path' };

    if (!STATE.diagnosed) {
      el.innerHTML = `
        <div style="text-align:center;padding:3rem 1rem">
          <div style="font-size:3rem;margin-bottom:1rem">🧬</div>
          <div style="font-family:var(--font-syne);font-size:1.1rem;font-weight:700;margin-bottom:0.5rem">Complete Diagnostic First</div>
          <div style="color:var(--text2);font-size:0.85rem;margin-bottom:1.5rem">Your study plan is generated after the diagnostic MRI scan.</div>
          <button class="lo-btn-primary" onclick="App.goto('diagnostic')">Start Diagnostic →</button>
        </div>`;
      return;
    }

    el.innerHTML = `
      <span class="plan-level-badge" style="background:${levelColors[level]}20;color:${levelColors[level]};border:1px solid ${levelColors[level]}40">
        ${levelLabels[level]}
      </span>
      <div class="plan-phases">
        ${Object.values(plan).map((phase, i) => `
          <div class="plan-phase">
            <div class="plan-phase-header">
              <div class="plan-phase-num">${i+1}</div>
              <div>
                <div class="plan-phase-title">${phase.title}</div>
                <div class="plan-phase-weeks">Weeks ${phase.weeks}</div>
              </div>
            </div>
            <div class="plan-focus-list">
              ${phase.focus.map(f => `<div class="plan-focus-item"><div class="pfi-dot"></div><span>${f}</span></div>`).join('')}
            </div>
            <div class="plan-mcq-badge">⚡ ${phase.dailyMCQ} MCQs/day</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top:1.5rem;padding:1rem;background:var(--surface);border-radius:var(--radius);border:1px solid var(--border)">
        <div style="font-family:var(--font-syne);font-size:0.88rem;font-weight:700;margin-bottom:0.5rem">Your weak subjects (prioritise these)</div>
        ${Object.entries(STATE.diagResult?.subjectScores || {})
          .filter(([_, d]) => d.total > 0 && d.correct/d.total < 0.5)
          .map(([s, d]) => `<div style="display:flex;align-items:center;gap:0.65rem;margin:0.4rem 0;font-size:0.82rem;color:var(--text2)">
            <div style="width:8px;height:8px;border-radius:50%;background:${subjectColor(s)};flex-shrink:0"></div>
            ${s} — ${Math.round((d.correct/d.total)*100)}% score · needs intensive focus
          </div>`).join('') || '<div style="color:var(--text3);font-size:0.82rem">No severe weak areas detected.</div>'}
      </div>
    `;
  }
};

// ══════════════════════════════════════════════════════
//  CONCEPT OF DAY PANEL
// ══════════════════════════════════════════════════════
const ConceptDay = {
  state: { answered: false },
  render() {
    const el = document.getElementById('conceptPanel');
    if (!el) return;
    const dayIdx = Math.floor(Date.now() / 86400000) % CONCEPT_OF_DAY.length;
    const cod = CONCEPT_OF_DAY[dayIdx];
    const color = subjectColor(cod.subject);
    const answered = this.state.answered;

    el.innerHTML = `
      <div class="concept-card">
        <span class="concept-subject-tag ${subjectClass(cod.subject)}">${cod.subject}</span>
        <div class="concept-title" style="color:${color}">${cod.concept}</div>
        <div class="concept-explain">${cod.explain}</div>
        <div class="eli5-box">
          <div class="eli5-icon">🧒</div>
          <div class="eli5-text">${cod.eli5}</div>
        </div>
      </div>
      <div style="font-family:var(--font-syne);font-size:0.88rem;font-weight:700;margin-bottom:0.85rem">Test Yourself</div>
      <div class="concept-mcq-box">
        <div class="concept-mcq-q">${cod.mcq.q}</div>
        <div class="lesson-opts">
          ${cod.mcq.opts.map((o, i) => {
            let cls = 'lesson-opt';
            if (answered) { if(i===cod.mcq.ans) cls+=' correct'; else if (this.state.picked===i) cls+=' wrong'; }
            return `<div class="${cls}" onclick="ConceptDay.answer(${i})">
              <span class="lesson-opt-key">${String.fromCharCode(65+i)}</span><span>${o}</span></div>`;
          }).join('')}
        </div>
        ${answered ? `<div style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.65rem;color:${this.state.picked===cod.mcq.ans?'var(--green)':'var(--red)'}">${this.state.picked===cod.mcq.ans?'✓ Correct! +15 XP':'✗ Incorrect — review the explanation above'}</div>` : ''}
      </div>
      <div class="concept-nav-row">
        <button class="lo-btn-secondary" onclick="ConceptDay.prev()">← Previous concept</button>
        <button class="lo-btn-secondary" onclick="ConceptDay.next()">Next concept →</button>
      </div>
    `;
  },

  answer(i) {
    if (this.state.answered) return;
    this.state.answered = true;
    this.state.picked = i;
    const dayIdx = Math.floor(Date.now() / 86400000) % CONCEPT_OF_DAY.length;
    if (i === CONCEPT_OF_DAY[dayIdx].mcq.ans) addXP(15, 'Concept of Day');
    this.render();
  },

  next() { this.state.answered = false; this.state.picked = undefined; this.render(); },
  prev() { this.state.answered = false; this.state.picked = undefined; this.render(); },
};

// ══════════════════════════════════════════════════════
//  ELI5 PANEL
// ══════════════════════════════════════════════════════
const ELI5 = {
  render() {
    const el = document.getElementById('eli5Panel');
    if (!el) return;
    el.innerHTML = `
      <div style="margin-bottom:1.5rem;font-size:0.88rem;line-height:1.65;color:var(--text2);padding:1rem;background:var(--surface);border-radius:var(--radius);border-left:3px solid var(--saffron)">
        Complex UPSC concepts explained with everyday analogies. Because if you can't explain it simply, you don't understand it well enough.
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem">
        ${CONCEPT_OF_DAY.map(cod => `
          <div class="concept-card">
            <span class="concept-subject-tag ${subjectClass(cod.subject)}">${cod.subject}</span>
            <div style="font-family:var(--font-syne);font-size:1.1rem;font-weight:700;margin-bottom:0.5rem">${cod.concept}</div>
            <div style="font-size:0.85rem;line-height:1.65;color:var(--text2);margin-bottom:0.85rem">${cod.explain.slice(0, 200)}…</div>
            <div class="eli5-box">
              <div class="eli5-icon">🧒</div>
              <div class="eli5-text">${cod.eli5}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};

// ══════════════════════════════════════════════════════
//  DEBATE MODE RENDERER
// ══════════════════════════════════════════════════════
function renderDebateMode() {
  const el = document.getElementById('debateGrid');
  if (!el) return;
  el.innerHTML = DEBATE_TOPICS.map(d => `
    <div class="debate-card">
      <div class="debate-topic-header">
        <div class="debate-topic-title">${d.topic}</div>
      </div>
      <div class="debate-columns">
        <div class="debate-col for">
          <div class="debate-col-title">FOR / ARGUMENTS IN FAVOUR</div>
          ${d.for.map(p => `<div class="debate-point"><span class="debate-point-bullet">+</span><span>${p}</span></div>`).join('')}
        </div>
        <div class="debate-col against">
          <div class="debate-col-title">AGAINST / COUNTERARGUMENTS</div>
          ${d.against.map(p => `<div class="debate-point"><span class="debate-point-bullet">−</span><span>${p}</span></div>`).join('')}
        </div>
      </div>
      <div class="debate-neutral">
        <div class="debate-neutral-label">UPSC MAINS APPROACH</div>
        ${d.neutral}
      </div>
    </div>
  `).join('');
}
