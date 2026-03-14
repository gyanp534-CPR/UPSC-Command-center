/* ╔══════════════════════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — panels.js                             ║
   ║  Current Affairs · Pattern · Concepts · Debate · Essay  ║
   ║  Plan · Revision · Schemes · Performance                ║
   ╚══════════════════════════════════════════════════════════╝ */

// ══════════════════════════════════════════════
// CURRENT AFFAIRS
// ══════════════════════════════════════════════
const AFFAIRS = (() => {
  let expanded = null;

  function render() {
    const el = document.getElementById('affairsPanel');
    if (!el) return;
    const items = typeof CURRENT_AFFAIRS !== 'undefined' ? CURRENT_AFFAIRS : [];
    if (items.length === 0) {
      el.innerHTML = `<div class="empty-state"><div class="empty-icon">📡</div><div class="empty-msg">Current affairs data loading...</div></div>`;
      return;
    }
    el.innerHTML = items.map(ca => `
      <div class="ca-card ${expanded === ca.id ? 'expanded' : ''}" onclick="AFFAIRS.toggle('${ca.id}')">
        <div class="ca-header">
          <div class="ca-category">${ca.category}</div>
          <div class="ca-date">${ca.date}</div>
        </div>
        <div class="ca-title">${ca.title}</div>
        <div class="ca-tags">${(ca.syllabusTopics || []).map(t => `<span class="ca-tag">${t}</span>`).join('')}</div>
        ${expanded === ca.id ? `
          <div class="ca-details">${ca.summary}</div>
          <div class="ca-mcq">
            <div class="ca-mcq-label">🎯 EXAM-LINKED MCQ</div>
            <div class="qc-text">${ca.mcq.q}</div>
            <div class="qc-opts" id="ca_opts_${ca.id}">
              ${ca.mcq.opts.map((o, i) => `<button class="q-opt" onclick="AFFAIRS.answerMCQ(event,'${ca.id}',${i})">${o}</button>`).join('')}
            </div>
            <div id="affairs_fb_${ca.id}" style="display:none" class="question-feedback"></div>
          </div>` : ''}
      </div>`).join('');
  }

  function toggle(id) {
    expanded = expanded === id ? null : id;
    render();
    if (expanded === id) {
      if (!STATE.currentAffairsRead.includes(id)) {
        STATE.currentAffairsRead.push(id);
        saveState();
      }
    }
  }

  function answerMCQ(e, caId, idx) {
    e.stopPropagation();
    const ca = (typeof CURRENT_AFFAIRS !== 'undefined' ? CURRENT_AFFAIRS : []).find(c => c.id === caId);
    if (!ca) return;
    const correct = idx === ca.mcq.ans;
    const container = document.getElementById('ca_opts_' + caId);
    if (container) {
      container.querySelectorAll('.q-opt').forEach((btn, i) => {
        btn.disabled = true;
        if (i === ca.mcq.ans) btn.classList.add('correct');
        else if (i === idx && !correct) btn.classList.add('wrong');
      });
    }
    const fb = document.getElementById('affairs_fb_' + caId);
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = `<div class="qf-label">${correct ? '✅ Correct!' : '❌ Incorrect'}</div><p>${ca.mcq.explain}</p>`;
    }
    if (correct) addXP(XP_REWARDS.quiz_correct, 'Current Affairs MCQ');
    logAnswer((ca.syllabusNodes || ['p1'])[0], correct, 'ca_' + caId);
  }

  return { render, toggle, answerMCQ };
})();


// ══════════════════════════════════════════════
// PYQ PATTERN ANALYZER
// ══════════════════════════════════════════════
const PATTERN = (() => {
  function render() {
    const el = document.getElementById('patternPanel');
    if (!el) return;
    const tf = typeof TOPIC_FREQUENCY !== 'undefined' ? TOPIC_FREQUENCY : {};
    const hp = tf.highProbability2025 || [];
    const data = tf.data || {};
    const trends = tf.trends || {};
    const declining = tf.decliningTopics || [];

    el.innerHTML = `
      <div class="prediction-alert">
        <div class="pa-header">
          <div class="pa-title">🎯 HIGH PROBABILITY — UPSC 2025</div>
          <div class="pa-subtitle">Based on 25-year frequency analysis + recent developments</div>
        </div>
        <div class="high-prob-list">
          ${hp.map((t, i) => `
            <div class="hp-row">
              <div class="hp-rank">${i + 1}</div>
              <div class="hp-info">
                <div class="hp-topic">${t.topic}</div>
                <div class="hp-why">${t.why}</div>
              </div>
              <div class="hp-meter">
                <div class="hp-bar"><div class="hp-fill" style="width:${t.probability}%"></div></div>
                <div class="hp-pct">${t.probability}%</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div class="section-card" style="margin-top:16px">
        <div class="sc-title">📈 RISING TOPICS — Study More</div>
        ${Object.entries(data).filter(([k]) => trends[k] === 'rising_fast' || trends[k] === 'consistently_high').map(([topic, years]) => {
          const vals = Object.values(years);
          const trend = vals[vals.length - 1] - vals[0];
          return `<div class="trend-row">
            <div class="tr-topic">${topic}</div>
            <div class="tr-sparkline">
              <canvas class="sparkline-canvas" id="sp_${topic.replace(/[^a-z0-9]/gi, '_')}" width="80" height="28"></canvas>
            </div>
            <div class="tr-change ${trend > 0 ? 'up' : 'down'}">
              ${trend > 0 ? '↑' : '↓'} ${Math.abs(trend)}
            </div>
          </div>`;
        }).join('')}
      </div>

      <div class="section-card" style="margin-top:12px">
        <div class="sc-title" style="color:var(--text3)">📉 PROPORTIONALLY DECLINING — Less Priority</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">
          ${declining.map(t => `<span style="background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:8px;padding:5px 10px;font-size:12px;color:var(--text3)">${t}</span>`).join('')}
        </div>
      </div>`;

    setTimeout(() => {
      Object.entries(data).forEach(([topic, years]) => {
        const id = 'sp_' + topic.replace(/[^a-z0-9]/gi, '_');
        const canvas = document.getElementById(id);
        if (!canvas) return;
        drawSparkline(canvas, Object.values(years));
      });
    }, 60);
  }

  function drawSparkline(canvas, values) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const min = Math.min(...values), max = Math.max(...values);
    const range = max - min || 1;
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = (i / (values.length - 1)) * (W - 4) + 2;
      const y = H - ((v - min) / range) * (H - 6) - 3;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#7c6af7';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
    // Fill area under sparkline
    const lastX = ((values.length - 1) / (values.length - 1)) * (W - 4) + 2;
    ctx.lineTo(lastX, H);
    ctx.lineTo(2, H);
    ctx.closePath();
    ctx.fillStyle = 'rgba(124,106,247,0.15)';
    ctx.fill();
  }

  return { render };
})();


// ══════════════════════════════════════════════
// CONCEPT ENGINE
// ══════════════════════════════════════════════
const CONCEPTS = (() => {
  let activeIdx = null;

  function render() {
    const el = document.getElementById('conceptGrid');
    if (!el) return;
    const items = typeof CONCEPT_OF_DAY !== 'undefined' ? CONCEPT_OF_DAY : [];
    el.innerHTML = items.map((c, i) => `
      <div class="concept-card ${activeIdx === i ? 'active' : ''}">
        <div class="cc-top" onclick="CONCEPTS.toggle(${i})">
          <div class="cc-subject-pill">${c.subject}</div>
          <div class="cc-name">${c.concept}</div>
          <div class="cc-toggle-icon">${activeIdx === i ? '▲' : '▼'}</div>
        </div>
        ${activeIdx === i ? `
          <div class="cc-body">
            <div class="cc-explanation">${c.explanation || c.body || ''}</div>
            ${c.eli5 ? `
              <div class="cc-eli5-box">
                <div class="cc-eli5-label">🧒 ELI5 — Explain Like I'm 5</div>
                <div class="cc-eli5-text">${c.eli5}</div>
              </div>` : ''}
            ${c.examAngle ? `
              <div class="cc-exam-angle">
                <div class="cc-exam-label">🎯 EXAM ANGLE</div>
                <div>${c.examAngle}</div>
              </div>` : ''}
            <div class="cc-actions">
              <button class="btn-sm accent" onclick="CONCEPTS.markDone(${i})">+${XP_REWARDS.concept_day} XP  ✓ Done</button>
              <button class="btn-sm ghost" onclick="navigate('quiz');QUIZ.start('subject','${c.subject}')">Practice Questions</button>
            </div>
          </div>` : ''}
      </div>`).join('');
  }

  function toggle(i) {
    activeIdx = activeIdx === i ? null : i;
    render();
  }

  function markDone(i) {
    if (!STATE.conceptsTodayDone) {
      STATE.conceptsTodayDone = true;
      STATE.habitLoop.morningDone = true;
      addXP(XP_REWARDS.concept_day, 'Concept of the Day');
      saveState();
      showXPToast('+' + XP_REWARDS.concept_day + ' XP — Concept mastered!');
    }
    activeIdx = null;
    render();
  }

  return { render, toggle, markDone };
})();


// ══════════════════════════════════════════════
// DEBATE MODE
// ══════════════════════════════════════════════
const DEBATE = (() => {
  let activeIdx = null;

  function renderList() {
    const listEl = document.getElementById('debateList');
    const activeEl = document.getElementById('debateActive');
    if (listEl) listEl.style.display = 'block';
    if (activeEl) activeEl.style.display = 'none';

    const items = typeof DEBATE_TOPICS !== 'undefined' ? DEBATE_TOPICS : [];
    if (!listEl) return;
    listEl.innerHTML = `
      <div class="debate-intro">
        <p style="color:var(--text2);font-size:13px;line-height:1.7">UPSC Mains GS-II and Essay papers require balanced multi-dimensional arguments. Pick any topic and study both sides rigorously.</p>
      </div>
      <div class="debate-topic-list">
        ${items.map((d, i) => `
          <div class="debate-topic-card" onclick="DEBATE.open(${i})">
            <div class="dtc-number">${String(i + 1).padStart(2, '0')}</div>
            <div class="dtc-info">
              <div class="dtc-topic">${d.topic}</div>
              <div class="dtc-tags">${(d.tags || ['Policy', 'Governance']).map(t => `<span class="dtc-tag">${t}</span>`).join('')}</div>
            </div>
            <div class="dtc-arrow">→</div>
          </div>`).join('')}
      </div>`;
  }

  function open(i) {
    activeIdx = i;
    const d = (typeof DEBATE_TOPICS !== 'undefined' ? DEBATE_TOPICS : [])[i];
    if (!d) return;
    const listEl = document.getElementById('debateList');
    const activeEl = document.getElementById('debateActive');
    if (listEl) listEl.style.display = 'none';
    if (!activeEl) return;
    activeEl.style.display = 'block';
    activeEl.innerHTML = `
      <button class="back-btn" onclick="DEBATE.renderList()">← All Topics</button>
      <div class="debate-active-wrap">
        <div class="debate-question">${d.topic}</div>
        <div class="debate-sides-grid">
          <div class="debate-side for-side">
            <div class="ds-header for-header">✅ FOR</div>
            <ul class="ds-list">
              ${d.for.map(p => `<li class="ds-point">${p}</li>`).join('')}
            </ul>
          </div>
          <div class="debate-side against-side">
            <div class="ds-header against-header">❌ AGAINST</div>
            <ul class="ds-list">
              ${d.against.map(p => `<li class="ds-point">${p}</li>`).join('')}
            </ul>
          </div>
        </div>
        ${d.neutral ? `
          <div class="debate-balanced">
            <div class="db-label">⚖️ UPSC BALANCED PERSPECTIVE</div>
            <p>${d.neutral}</p>
          </div>` : ''}
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
          <button class="btn-primary" onclick="navigate('essay');ESSAY.renderList()">Write Essay on This →</button>
          <button class="btn-secondary" onclick="navigate('mains');MAINS.render()">Mains Answer Practice →</button>
        </div>
      </div>`;
  }

  return { renderList, open };
})();


// ══════════════════════════════════════════════
// ESSAY STUDIO
// ══════════════════════════════════════════════
const ESSAY = (() => {
  let activeEssay = null;

  function renderList() {
    const listEl = document.getElementById('essayTopicList');
    const editorEl = document.getElementById('essayEditor');
    if (editorEl) editorEl.style.display = 'none';
    if (!listEl) return;
    listEl.style.display = 'block';

    const topics = typeof ESSAY_TOPICS !== 'undefined' ? ESSAY_TOPICS : [];
    listEl.innerHTML = `
      <div class="essay-intro">
        <p style="color:var(--text2);font-size:13px;line-height:1.7">
          UPSC Mains Essay Paper: 2 essays · 1000-1200 words each · 3 hours total. 
          Use the structured framework, aim for multi-dimensional analysis.
        </p>
      </div>
      <div class="essay-topics-grid">
        ${topics.map(t => `
          <div class="essay-topic-card" onclick="ESSAY.open('${t.id}')">
            <div class="etc-meta">
              <span class="etc-category">${t.category}</span>
              <span class="etc-difficulty ${t.difficulty}">${t.difficulty}</span>
            </div>
            <div class="etc-title">${t.title}</div>
            <div class="etc-keywords">
              ${t.keywords.slice(0, 4).map(k => `<span class="keyword-chip">${k}</span>`).join('')}
              ${t.keywords.length > 4 ? `<span class="keyword-chip" style="color:var(--text3)">+${t.keywords.length - 4}</span>` : ''}
            </div>
          </div>`).join('')}
      </div>`;
  }

  function open(id) {
    const topics = typeof ESSAY_TOPICS !== 'undefined' ? ESSAY_TOPICS : [];
    activeEssay = topics.find(t => t.id === id);
    if (!activeEssay) return;

    const listEl = document.getElementById('essayTopicList');
    const editorEl = document.getElementById('essayEditor');
    if (listEl) listEl.style.display = 'none';
    if (!editorEl) return;
    editorEl.style.display = 'block';

    const fw = typeof MAINS_FRAMEWORKS !== 'undefined' ? MAINS_FRAMEWORKS : {};
    const steps = fw.essay_structure || [
      'Introduction — Context + central argument (50-80 words)',
      'Body Para 1 — Historical / Constitutional angle',
      'Body Para 2 — Economic / Social dimension',
      'Body Para 3 — Comparative / Global perspective',
      'Body Para 4 — Critical analysis + counterarguments',
      'Conclusion — Way forward + aspirational ending'
    ];

    document.getElementById('essayTopicTitle').textContent = activeEssay.title;
    document.getElementById('essayKeywords').innerHTML = activeEssay.keywords.map(k => `<span class="keyword-chip">${k}</span>`).join('');
    document.getElementById('frameworkSteps').innerHTML = steps.map((s, i) => `
      <div class="fw-step">
        <div class="fw-step-num">${i + 1}</div>
        <div class="fw-step-text">${s}</div>
      </div>`).join('');

    const ta = document.getElementById('essayTextarea');
    if (ta) {
      ta.value = '';
      ta.oninput = () => {
        const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
        const wcEl = document.getElementById('wordCount');
        if (wcEl) wcEl.textContent = wc;
        const bar = document.getElementById('wordCountBar');
        if (bar) bar.style.width = Math.min(100, (wc / 1200) * 100) + '%';
      };
    }
    const fb = document.getElementById('essayFeedback');
    if (fb) fb.style.display = 'none';
  }

  function evaluate() {
    const ta = document.getElementById('essayTextarea');
    if (!ta || !ta.value.trim()) { alert('Write your essay first!'); return; }
    const text = ta.value;
    const wc = text.trim().split(/\s+/).filter(Boolean).length;
    if (wc < 50) { alert('Please write at least 50 words for evaluation.'); return; }

    const keywords = activeEssay ? activeEssay.keywords : [];
    const kwHits = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
    const kwScore = Math.round((kwHits.length / (keywords.length || 1)) * 100);
    const lengthScore = wc >= 1000 ? 100 : wc >= 700 ? 80 : wc >= 400 ? 60 : wc >= 200 ? 40 : 20;
    const hasParas = (text.match(/\n\n/g) || []).length >= 3;
    const hasIntro = text.length > 0 && text.substring(0, 200).split(' ').length >= 20;
    const structureScore = hasParas ? (hasIntro ? 90 : 70) : 50;
    const overall = Math.round(kwScore * 0.4 + lengthScore * 0.35 + structureScore * 0.25);
    const grade = overall >= 80 ? 'Excellent' : overall >= 65 ? 'Good' : overall >= 50 ? 'Average' : 'Needs Work';
    const gradeColor = overall >= 80 ? 'var(--green)' : overall >= 65 ? 'var(--gold)' : overall >= 50 ? 'var(--accent)' : 'var(--red)';

    addXP(XP_REWARDS.essay_submit, 'Essay Evaluated!');

    const fb = document.getElementById('essayFeedback');
    if (!fb) return;
    fb.style.display = 'block';
    fb.innerHTML = `
      <div class="essay-result-card">
        <div class="erc-score-row">
          <div class="erc-score" style="color:${gradeColor}">${overall}%</div>
          <div class="erc-grade" style="color:${gradeColor}">${grade}</div>
        </div>
        <div class="erc-bars">
          ${[['Keyword Coverage', kwScore, `Used ${kwHits.length}/${keywords.length} key terms`],
             ['Length & Depth', lengthScore, `${wc} words`],
             ['Structure', structureScore, hasParas ? 'Multiple paragraphs detected' : 'Add more paragraph breaks']
            ].map(([label, score, note]) => `
            <div class="erc-bar-row">
              <div class="erc-bar-label">${label}</div>
              <div class="erc-bar-track"><div class="erc-bar-fill" style="width:${score}%"></div></div>
              <div class="erc-bar-score">${score}%</div>
              <div class="erc-bar-note">${note}</div>
            </div>`).join('')}
        </div>
        ${kwHits.length > 0 ? `<div class="erc-kw-found">✅ Keywords found: ${kwHits.join(', ')}</div>` : ''}
        ${kwHits.length < keywords.length ? `
          <div class="erc-kw-missing">
            ⚠️ Missing: ${keywords.filter(k => !text.toLowerCase().includes(k.toLowerCase())).join(', ')}
          </div>` : ''}
        <div class="erc-tip">
          💡 UPSC Tip: Structure + multi-dimensional analysis outweigh word count alone. 
          Each body paragraph should address a different dimension (constitutional, economic, social, global).
        </div>
      </div>`;
    fb.scrollIntoView({ behavior: 'smooth' });
  }

  function backToList() { renderList(); }

  return { renderList, open, evaluate, backToList };
})();


// ══════════════════════════════════════════════
// STUDY PLAN
// ══════════════════════════════════════════════
const PLAN = (() => {
  function render() {
    const el = document.getElementById('planContent');
    if (!el) return;

    const result = STATE.diagResult;
    if (!result) {
      el.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🗓️</div>
          <div class="empty-title">No plan generated yet</div>
          <div class="empty-msg">Complete the Diagnostic Scan to get a personalized study plan calibrated to your current level.</div>
          <button class="btn-primary" style="margin-top:20px" onclick="navigate('diagnostic')">Take Diagnostic Scan →</button>
        </div>`;
      return;
    }

    const tpls = typeof STUDY_PLAN_TEMPLATES !== 'undefined' ? STUDY_PLAN_TEMPLATES : {};
    const level = (result.level || 'beginner').toLowerCase();
    const tpl = tpls[level] || Object.values(tpls)[0];

    if (!tpl) {
      el.innerHTML = '<div class="empty-state"><div class="empty-msg">Plan template not available. Please check data files.</div></div>';
      return;
    }

    const weak = Object.entries(result.subjectScores || {})
      .filter(([, v]) => v < 40)
      .map(([k]) => k);
    const strong = Object.entries(result.subjectScores || {})
      .filter(([, v]) => v >= 70)
      .map(([k]) => k);

    el.innerHTML = `
      <div class="plan-hero">
        <div class="ph-level">${level.charAt(0).toUpperCase() + level.slice(1)} Track</div>
        <div class="ph-meta">
          ${tpl.weeks || 12} weeks · ${tpl.dailyHours || 4} hours/day · Diagnostic score: ${result.pct}%
        </div>
        ${weak.length > 0 ? `<div class="ph-alert">Priority focus: <strong>${weak.slice(0, 3).join(', ')}</strong></div>` : ''}
      </div>

      ${(tpl.phases || []).map((phase, i) => `
        <div class="plan-phase">
          <div class="pp-header">
            <div class="pp-badge">Phase ${i + 1}</div>
            <div class="pp-duration">${phase.duration || '2–3 weeks'}</div>
          </div>
          <div class="pp-focus">${phase.focus}</div>
          <div class="pp-tasks">
            ${(phase.tasks || []).map(t => `
              <div class="pp-task">
                <span class="pp-task-dot">▸</span>
                <span>${t}</span>
              </div>`).join('')}
          </div>
        </div>`).join('')}

      ${weak.length > 0 ? `
        <div class="plan-weak-zones">
          <div class="pwz-title">⚠️ Weak Zone Protocol</div>
          ${weak.map(s => `
            <div class="pwz-item">
              <span class="pwz-subject">${s}</span>
              <span class="pwz-action">+ 30 min daily · Start with NCERT module · Weekly mock test on this subject</span>
            </div>`).join('')}
        </div>` : ''}

      ${strong.length > 0 ? `
        <div class="section-card" style="margin-top:12px">
          <div class="sc-title" style="color:var(--green)">✅ Strong Zones — Maintain</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
            ${strong.map(s => `<span class="keyword-chip" style="color:var(--green);border-color:rgba(34,197,94,0.3)">${s}</span>`).join('')}
          </div>
        </div>` : ''}

      <div class="plan-daily-schedule section-card" style="margin-top:12px">
        <div class="sc-title">📅 DAILY SCHEDULE TEMPLATE</div>
        ${[
          ['6:00–7:00 AM', 'Concept of the Day + Quick revision (NCERT)'],
          ['7:00–9:00 AM', 'Subject deep-dive (follow phase focus)'],
          ['4:00–6:00 PM', 'Practice quiz + PYQ questions (20–30 questions)'],
          ['6:00–7:00 PM', 'Current Affairs reading + MCQ'],
          ['9:00–10:00 PM', 'Spaced revision + Mistake notebook'],
        ].map(([time, task]) => `
          <div class="pds-row">
            <div class="pds-time">${time}</div>
            <div class="pds-task">${task}</div>
          </div>`).join('')}
      </div>`;
  }

  return { render };
})();


// ══════════════════════════════════════════════
// REVISION ENGINE
// ══════════════════════════════════════════════
const REVISION = (() => {
  function render() {
    const el = document.getElementById('revisionDue');
    if (!el) return;
    const due = getDueRevisions();

    if (due.length === 0) {
      el.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon" style="font-size:48px">🌟</div>
          <div class="empty-title">All caught up!</div>
          <div class="empty-msg">No revisions due today. Your spaced repetition schedule is on track.</div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
            <button class="btn-primary" onclick="navigate('quiz');QUIZ.start('adaptive')">Adaptive Quiz →</button>
            <button class="btn-secondary" onclick="navigate('ncert')">Study New Module →</button>
          </div>
        </div>`;
      return;
    }

    const now = Date.now();
    el.innerHTML = `
      <div class="revision-count">${due.length} topic${due.length !== 1 ? 's' : ''} due for revision</div>
      <div class="revision-list">
        ${due.map(r => {
          const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === r.nodeId);
          if (!node) return '';
          const daysSince = Math.floor((now - r.lastRevised) / 86400000);
          const isOverdue = daysSince > (2 ** r.intervalIndex);
          return `
            <div class="revision-item ${isOverdue ? 'overdue' : 'due-today'}">
              <div class="ri-urgency-bar"></div>
              <div class="ri-content">
                <div class="ri-topic">${node.topic}</div>
                <div class="ri-meta">
                  <span class="ri-subject">${node.subject}</span>
                  <span class="ri-days ${isOverdue ? 'overdue' : ''}">
                    ${isOverdue ? `⚠ ${daysSince} days overdue` : '🔔 Due today'}
                  </span>
                </div>
                <div class="ri-subtopics">${(node.subtopics || []).slice(0, 3).join(' · ')}</div>
              </div>
              <button class="ri-revise-btn" onclick="REVISION.revise('${r.nodeId}')">
                Revise →
              </button>
            </div>`;
        }).join('')}
      </div>`;
  }

  function revise(nodeId) {
    const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === nodeId);
    if (!node) return;
    advanceRevision(nodeId);
    addXP(XP_REWARDS.revision, 'Revision: ' + node.topic);
    STATE.habitLoop.eveningDone = true;
    saveState();

    const el = document.getElementById('revisionFlashcards');
    if (!el) return;
    el.style.display = 'block';
    el.innerHTML = `
      <div class="revision-card fade-in">
        <div class="rev-card-header">
          <span class="rev-subject">${node.subject}</span>
          <span class="rev-xp">+${XP_REWARDS.revision} XP earned</span>
        </div>
        <div class="rev-topic">${node.topic}</div>
        <div class="rev-subtopics">
          ${(node.subtopics || []).map(s => `<div class="rev-subtopic-item">▸ ${s}</div>`).join('')}
        </div>
        ${(node.prereqs || []).length > 0 ? `
          <div class="rev-prereqs">
            <div style="font-size:11px;color:var(--text3);margin-bottom:6px">PREREQUISITE TOPICS:</div>
            ${node.prereqs.map(pid => {
              const pn = KNOWLEDGE_GRAPH.nodes.find(n => n.id === pid);
              return pn ? `<span class="keyword-chip">${pn.topic}</span>` : '';
            }).join('')}
          </div>` : ''}
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
          <button class="btn-primary" onclick="QUIZ.start('subject','${node.subject}');navigate('quiz')">
            Test Yourself →
          </button>
          <button class="btn-secondary" onclick="document.getElementById('revisionFlashcards').style.display='none';REVISION.render()">
            Next Revision
          </button>
        </div>
      </div>`;

    render();
  }

  return { render, revise };
})();


// ══════════════════════════════════════════════
// SCHEME TRACKER
// ══════════════════════════════════════════════
const SCHEMES = (() => {
  let currentFilter = 'all';
  let searchTerm = '';

  function render() {
    const el = document.getElementById('schemeCards');
    if (!el) return;
    const schemes = typeof GOVT_SCHEMES !== 'undefined' ? GOVT_SCHEMES : [];

    let filtered = [...schemes];
    if (currentFilter !== 'all') {
      filtered = filtered.filter(s => {
        const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === s.node);
        return node && node.subject === currentFilter;
      });
    }
    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm) ||
        (s.benefit || '').toLowerCase().includes(searchTerm) ||
        (s.ministry || '').toLowerCase().includes(searchTerm)
      );
    }

    if (filtered.length === 0) {
      el.innerHTML = `<div class="empty-state"><div class="empty-icon">🗂️</div><div class="empty-msg">No schemes match your filter.</div></div>`;
      return;
    }

    el.innerHTML = `
      <div class="scheme-count">${filtered.length} scheme${filtered.length !== 1 ? 's' : ''}</div>
      <div class="scheme-grid">
        ${filtered.map(s => {
          const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === s.node);
          return `
            <div class="scheme-card">
              <div class="sc-header">
                <div class="sc-name">${s.name}</div>
                ${node ? `<div class="sc-subject-tag">${node.subject}</div>` : ''}
              </div>
              <div class="sc-meta">${s.ministry || ''} ${s.year ? '· ' + s.year : ''}</div>
              <div class="sc-benefit">${s.benefit || ''}</div>
              ${s.target ? `<div class="sc-target">👥 ${s.target}</div>` : ''}
            </div>`;
        }).join('')}
      </div>`;
  }

  function filter(subj) {
    currentFilter = subj;
    document.querySelectorAll('.scheme-filter-tabs .tab-btn').forEach(b => {
      const label = b.textContent.trim();
      b.classList.toggle('active',
        (subj === 'all' && label === 'All') || label === subj
      );
    });
    render();
  }

  function search(term) {
    searchTerm = term.toLowerCase().trim();
    render();
  }

  return { render, filter, search };
})();


// ══════════════════════════════════════════════
// PERFORMANCE ANALYTICS
// ══════════════════════════════════════════════
const PERFORMANCE = (() => {
  function render() {
    const el = document.getElementById('performanceContent');
    if (!el) return;

    const history = STATE.history || [];
    const total = history.length;
    const correct = history.filter(h => h.correct).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const nodes = KNOWLEDGE_GRAPH.nodes || [];

    // Subject-level accuracy
    const subjectStats = {};
    nodes.forEach(n => {
      const subjectHistory = history.filter(h => h.nodeId === n.id);
      if (!subjectStats[n.subject]) subjectStats[n.subject] = { total: 0, correct: 0 };
      subjectStats[n.subject].total += subjectHistory.length;
      subjectStats[n.subject].correct += subjectHistory.filter(h => h.correct).length;
    });

    // Mastery distribution
    const masteryBuckets = { mastered: 0, learning: 0, weak: 0, untouched: 0 };
    nodes.forEach(n => {
      const m = getMastery(n.id);
      if (m >= 70) masteryBuckets.mastered++;
      else if (m >= 30) masteryBuckets.learning++;
      else if (m > 0) masteryBuckets.weak++;
      else masteryBuckets.untouched++;
    });

    // Recent activity (last 7 days)
    const now = Date.now();
    const weekAgo = now - 7 * 86400000;
    const recentHistory = history.filter(h => h.date && new Date(h.date).getTime() > weekAgo);

    el.innerHTML = `
      <!-- Overview Stats -->
      <div class="perf-stats-grid">
        <div class="perf-stat-card">
          <div class="psc-value">${total}</div>
          <div class="psc-label">Questions Attempted</div>
        </div>
        <div class="perf-stat-card">
          <div class="psc-value" style="color:${accuracy >= 70 ? 'var(--green)' : accuracy >= 50 ? 'var(--gold)' : 'var(--red)'}">${accuracy}%</div>
          <div class="psc-label">Overall Accuracy</div>
        </div>
        <div class="perf-stat-card">
          <div class="psc-value" style="color:var(--accent)">${STATE.xp || 0}</div>
          <div class="psc-label">Total XP</div>
        </div>
        <div class="perf-stat-card">
          <div class="psc-value" style="color:var(--gold)">${STATE.streak || 0}🔥</div>
          <div class="psc-label">Day Streak</div>
        </div>
      </div>

      <!-- Mastery Distribution -->
      <div class="section-card" style="margin-top:16px">
        <div class="sc-title">🧠 KNOWLEDGE COVERAGE</div>
        <div class="mastery-dist-bars">
          ${[
            ['Mastered (70%+)', masteryBuckets.mastered, 'var(--green)'],
            ['Learning (30–69%)', masteryBuckets.learning, 'var(--accent)'],
            ['Weak (1–29%)', masteryBuckets.weak, 'var(--gold)'],
            ['Not Started', masteryBuckets.untouched, 'var(--text3)'],
          ].map(([label, count, color]) => {
            const pct = nodes.length > 0 ? Math.round((count / nodes.length) * 100) : 0;
            return `
              <div class="mdb-row">
                <div class="mdb-label">${label}</div>
                <div class="mdb-bar-track">
                  <div class="mdb-bar-fill" style="width:${pct}%;background:${color}"></div>
                </div>
                <div class="mdb-count" style="color:${color}">${count} nodes</div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Subject Accuracy -->
      <div class="section-card" style="margin-top:12px">
        <div class="sc-title">📊 SUBJECT ACCURACY</div>
        ${Object.entries(subjectStats).length === 0
          ? `<div style="color:var(--text3);font-size:13px;padding:12px 0">Complete some practice quizzes to see subject-level stats.</div>`
          : Object.entries(subjectStats).map(([subject, stats]) => {
              const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              const color = pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)';
              return `
                <div class="subject-acc-row">
                  <div class="sar-subject">${subject}</div>
                  <div class="sar-bar-track">
                    <div class="sar-bar-fill" style="width:${pct}%;background:${color}"></div>
                  </div>
                  <div class="sar-pct" style="color:${color}">${pct}%</div>
                  <div class="sar-count">${stats.total}Q</div>
                </div>`;
            }).join('')
        }
      </div>

      <!-- Radar -->
      <div class="section-card" style="margin-top:12px">
        <div class="sc-title">🕸️ MASTERY RADAR</div>
        <canvas id="perfRadarCanvas" width="280" height="280" style="display:block;margin:0 auto"></canvas>
      </div>

      <!-- Mistake Intelligence -->
      ${history.filter(h => !h.correct).length > 0 ? `
        <div class="section-card" style="margin-top:12px">
          <div class="sc-title" style="color:var(--red)">🔍 MISTAKE INTELLIGENCE</div>
          <div class="mistake-subjects">
            ${(() => {
              const mistakesBySubject = {};
              history.filter(h => !h.correct).forEach(h => {
                const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === h.nodeId);
                if (!node) return;
                if (!mistakesBySubject[node.subject]) mistakesBySubject[node.subject] = 0;
                mistakesBySubject[node.subject]++;
              });
              return Object.entries(mistakesBySubject)
                .sort(([, a], [, b]) => b - a)
                .map(([subj, count]) => `
                  <div class="mistake-row">
                    <span class="mr-subject">${subj}</span>
                    <span class="mr-count">${count} mistake${count !== 1 ? 's' : ''}</span>
                    <button class="btn-sm ghost" onclick="QUIZ.start('subject','${subj}');navigate('quiz')">Drill →</button>
                  </div>`).join('');
            })()}
          </div>
        </div>` : ''}

      <!-- No data state -->
      ${total === 0 ? `
        <div class="empty-state" style="margin-top:20px">
          <div class="empty-icon">📊</div>
          <div class="empty-msg">Start practicing to see detailed analytics here.</div>
          <button class="btn-primary" style="margin-top:16px" onclick="navigate('quiz')">Start Practicing →</button>
        </div>` : ''}`;

    // Draw performance radar
    setTimeout(() => {
      const perfCanvas = document.getElementById('perfRadarCanvas');
      if (perfCanvas && typeof renderRadar === 'function') renderRadar(perfCanvas);
    }, 80);
  }

  return { render };
})();
