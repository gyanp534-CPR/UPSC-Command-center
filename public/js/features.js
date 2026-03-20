/* ╔══════════════════════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — features.js                           ║
   ║  5 Council Features:                                    ║
   ║  1. Concept Cluster Explorer                            ║
   ║  2. PYQ Lineage Tracker                                 ║
   ║  3. Policy Timeline Visualizer                          ║
   ║  4. Adaptive Mock Generator                             ║
   ║  5. Mains Thinking Trainer                              ║
   ╚══════════════════════════════════════════════════════════╝ */

// ══════════════════════════════════════════════
// 1. CONCEPT CLUSTER EXPLORER
// ══════════════════════════════════════════════
const CLUSTER = (() => {
  let activeCluster = null;

  const CLUSTER_COLORS = {
    cc1: '#22c55e', cc2: '#7c6af7', cc3: '#06b6d4',
    cc4: '#a855f7', cc5: '#f59e0b', cc6: '#ef4444',
  };

  function render() {
    const gridEl = document.getElementById('clusterGrid');
    const detailEl = document.getElementById('clusterDetail');
    if (!gridEl) return;
    if (detailEl) detailEl.style.display = 'none';
    gridEl.style.display = 'block';

    const clusters = typeof CONCEPT_CLUSTERS !== 'undefined' ? CONCEPT_CLUSTERS : [];

    gridEl.innerHTML = `
      <div class="cluster-intro">
        <p style="color:var(--text2);font-size:13px;line-height:1.7;margin-bottom:16px">
          UPSC doesn't test subjects — it tests <strong style="color:var(--accent)">concept networks</strong>. 
          Each cluster shows how multiple topics from different subjects are tested together in a single question.
        </p>
      </div>
      <div class="cluster-cards-grid">
        ${clusters.map(c => {
          const color = c.color || CLUSTER_COLORS[c.id] || '#7c6af7';
          const mastered = (c.nodes || []).filter(nid => getMastery(nid) >= 70).length;
          const total = (c.nodes || []).length;
          const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
          return `
            <div class="cluster-card" onclick="CLUSTER.open('${c.id}')" style="--cluster-color:${color}">
              <div class="cc-icon">${c.icon || '🔗'}</div>
              <div class="cc-name">${c.name}</div>
              <div class="cc-desc">${c.description.slice(0, 90)}${c.description.length > 90 ? '…' : ''}</div>
              <div class="cc-nodes-row">
                ${(c.nodes || []).slice(0, 5).map(nid => {
                  const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === nid);
                  const m = getMastery(nid);
                  const dot = m >= 70 ? '#22c55e' : m >= 30 ? color : '#333355';
                  return node ? `<span class="cc-node-dot" style="background:${dot}" title="${node.topic}"></span>` : '';
                }).join('')}
                ${(c.nodes || []).length > 5 ? `<span style="font-size:11px;color:var(--text3)">+${c.nodes.length - 5}</span>` : ''}
              </div>
              <div class="cc-progress">
                <div class="cc-progress-bar">
                  <div class="cc-progress-fill" style="width:${pct}%;background:${color}"></div>
                </div>
                <span class="cc-progress-label">${mastered}/${total} mastered</span>
              </div>
              <div class="cc-pyq-years">
                PYQ: ${(c.pyqYears || []).slice(-5).join(', ')}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function open(id) {
    const clusters = typeof CONCEPT_CLUSTERS !== 'undefined' ? CONCEPT_CLUSTERS : [];
    activeCluster = clusters.find(c => c.id === id);
    if (!activeCluster) return;

    const gridEl = document.getElementById('clusterGrid');
    const detailEl = document.getElementById('clusterDetail');
    const contentEl = document.getElementById('clusterDetailContent');
    if (gridEl) gridEl.style.display = 'none';
    if (detailEl) detailEl.style.display = 'block';
    if (!contentEl) return;

    const c = activeCluster;
    const color = c.color || CLUSTER_COLORS[c.id] || '#7c6af7';

    // Cross-linked clusters
    const allClusters = typeof CONCEPT_CLUSTERS !== 'undefined' ? CONCEPT_CLUSTERS : [];
    const crossLinked = (c.crossLinks || []).map(cid => allClusters.find(x => x.id === cid)).filter(Boolean);

    contentEl.innerHTML = `
      <div class="cluster-detail-hero" style="border-color:${color}">
        <div class="cdh-icon">${c.icon || '🔗'}</div>
        <div class="cdh-name">${c.name}</div>
        <div class="cdh-desc">${c.description}</div>
      </div>

      <div class="cluster-exam-angle section-card">
        <div class="sc-title">🎯 EXAM ANGLE</div>
        <p style="color:var(--text2);font-size:13px;line-height:1.7">${c.examAngle || ''}</p>
        <div class="pyq-years-row">
          ${(c.pyqYears || []).map(y => `<span class="pyq-year-chip">${y}</span>`).join('')}
        </div>
      </div>

      <div class="section-card" style="margin-top:12px">
        <div class="sc-title">🧩 CONCEPTS IN THIS CLUSTER</div>
        <div class="cluster-concepts-list">
          ${(c.concepts || []).map(concept => {
            const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === concept.link);
            const mastery = node ? getMastery(concept.link) : 0;
            const mColor = mastery >= 70 ? '#22c55e' : mastery >= 30 ? color : '#555577';
            return `
              <div class="cluster-concept-item">
                <div class="cci-left">
                  <div class="cci-mastery-dot" style="background:${mColor}"></div>
                  <div>
                    <div class="cci-name">${concept.name}</div>
                    <div class="cci-subject">${concept.subject}</div>
                  </div>
                </div>
                <div class="cci-right">
                  <div class="cci-mastery-bar">
                    <div class="cci-mastery-fill" style="width:${mastery}%;background:${mColor}"></div>
                  </div>
                  <span class="cci-pct">${mastery}%</span>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>

      ${crossLinked.length > 0 ? `
        <div class="section-card" style="margin-top:12px">
          <div class="sc-title">🔀 CONNECTED CLUSTERS</div>
          <p style="color:var(--text3);font-size:12px;margin-bottom:12px">UPSC often combines questions from these clusters too</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            ${crossLinked.map(cl => `
              <div class="cross-cluster-chip" onclick="CLUSTER.open('${cl.id}')" style="border-color:${cl.color || '#7c6af7'}">
                <span>${cl.icon || '🔗'}</span>
                <span>${cl.name}</span>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <button class="btn-primary" onclick="QUIZ.start('concept_cluster');navigate('quiz')">
          Quiz This Cluster →
        </button>
        <button class="btn-secondary" onclick="navigate('pyqlineage')">
          Track PYQ Lineage →
        </button>
      </div>`;
  }

  function backToGrid() {
    activeCluster = null;
    render();
  }

  return { render, open, backToGrid };
})();


// ══════════════════════════════════════════════
// 2. PYQ LINEAGE TRACKER
// ══════════════════════════════════════════════
const PYQLINEAGE = (() => {
  let activeConcept = null;

  function render() {
    const listEl = document.getElementById('pyqLineageList');
    const detailEl = document.getElementById('pyqLineageDetail');
    if (!listEl) return;
    if (detailEl) detailEl.style.display = 'none';
    listEl.style.display = 'block';

    const lineage = typeof PYQ_LINEAGE !== 'undefined' ? PYQ_LINEAGE : [];

    listEl.innerHTML = `
      <div class="pyq-intro">
        <p style="color:var(--text2);font-size:13px;line-height:1.7;margin-bottom:16px">
          UPSC evolves the <em>angle</em> of questions on the same concept over 25 years. 
          Understanding that evolution helps you predict the next question.
        </p>
      </div>
      <div class="pyq-lineage-list">
        ${lineage.map(item => {
          const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === item.node);
          const yearsCount = (item.evolution || []).length;
          const latest = (item.evolution || []).slice(-1)[0];
          return `
            <div class="pyq-lineage-card" onclick="PYQLINEAGE.open('${item.concept.replace(/'/g, "\\'")}')">
              <div class="plc-header">
                <div class="plc-concept">${item.concept}</div>
                <div class="plc-meta">
                  <span class="plc-subject">${item.subject}</span>
                  <span class="plc-count">${yearsCount} tracked years</span>
                </div>
              </div>
              <div class="plc-timeline-preview">
                ${(item.evolution || []).map(e => `
                  <div class="plc-year-dot" title="${e.year}: ${e.angle}">
                    <div class="plc-dot"></div>
                    <div class="plc-year-label">${e.year}</div>
                  </div>`).join('')}
              </div>
              ${latest ? `<div class="plc-latest">Latest (${latest.year}): <em>${latest.angle}</em></div>` : ''}
              <div class="plc-next">
                Next angle: <strong style="color:var(--accent)">${item.nextAngle}</strong>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function open(conceptName) {
    const lineage = typeof PYQ_LINEAGE !== 'undefined' ? PYQ_LINEAGE : [];
    activeConcept = lineage.find(l => l.concept === conceptName);
    if (!activeConcept) return;

    const listEl = document.getElementById('pyqLineageList');
    const detailEl = document.getElementById('pyqLineageDetail');
    const contentEl = document.getElementById('pyqLineageDetailContent');
    if (listEl) listEl.style.display = 'none';
    if (detailEl) detailEl.style.display = 'block';
    if (!contentEl) return;

    const item = activeConcept;
    const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === item.node);
    const mastery = node ? getMastery(item.node) : 0;

    contentEl.innerHTML = `
      <div class="pyq-detail-hero">
        <div class="pdh-concept">${item.concept}</div>
        <div class="pdh-meta">
          <span>${item.subject}</span>
          ${node ? `<span>Node: ${node.topic}</span>` : ''}
          <span style="color:${mastery >= 70 ? 'var(--green)' : mastery >= 30 ? 'var(--accent)' : 'var(--red)'}">
            ${mastery}% mastery
          </span>
        </div>
      </div>

      <div class="section-card" style="margin-top:12px">
        <div class="sc-title">📅 25-YEAR EVOLUTION TIMELINE</div>
        <div class="pyq-evolution-timeline">
          ${(item.evolution || []).map((e, i) => `
            <div class="pet-item">
              <div class="pet-connector ${i < item.evolution.length - 1 ? 'has-next' : ''}"></div>
              <div class="pet-dot ${i === item.evolution.length - 1 ? 'latest' : ''}"></div>
              <div class="pet-content">
                <div class="pet-year">${e.year}</div>
                <div class="pet-angle">${e.angle}</div>
                <div class="pet-q">${e.q}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div class="section-card insight-card" style="margin-top:12px">
        <div class="sc-title">🔍 UPSC INTELLIGENCE INSIGHT</div>
        <p style="color:var(--text2);font-size:13px;line-height:1.8">${item.insight}</p>
      </div>

      <div class="section-card next-angle-card" style="margin-top:12px;border-color:rgba(124,106,247,0.3)">
        <div class="sc-title" style="color:var(--accent)">🎯 PREDICTED NEXT ANGLE (2025)</div>
        <p style="font-size:14px;font-weight:600;color:var(--text1);line-height:1.7">${item.nextAngle}</p>
        <p style="color:var(--text3);font-size:12px;margin-top:8px">
          Study this dimension specifically. UPSC rarely repeats the exact same angle — it moves forward.
        </p>
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <button class="btn-primary" onclick="QUIZ.start('subject','${item.subject}');navigate('quiz')">
          Practice Questions →
        </button>
        <button class="btn-secondary" onclick="navigate('pattern')">
          View Topic Frequency →
        </button>
      </div>`;
  }

  function backToList() {
    activeConcept = null;
    render();
  }

  return { render, open, backToList };
})();


// ══════════════════════════════════════════════
// 3. POLICY TIMELINE VISUALIZER
// ══════════════════════════════════════════════
const TIMELINE = (() => {
  let activeTimelineId = null;

  const TYPE_STYLES = {
    launch:    { color: '#22c55e',  icon: '🚀', label: 'Launch' },
    policy:    { color: '#7c6af7',  icon: '📜', label: 'Policy' },
    event:     { color: '#f59e0b',  icon: '⚡', label: 'Event' },
    milestone: { color: '#06b6d4',  icon: '🏆', label: 'Milestone' },
  };

  function render() {
    const selectorEl = document.getElementById('timelineSelector');
    const contentEl = document.getElementById('timelineContent');
    if (!selectorEl || !contentEl) return;

    const timelines = typeof POLICY_TIMELINES !== 'undefined' ? POLICY_TIMELINES : [];
    if (timelines.length === 0) {
      contentEl.innerHTML = '<div class="empty-state"><div class="empty-msg">Timeline data not found.</div></div>';
      return;
    }

    if (!activeTimelineId) activeTimelineId = timelines[0].id;

    // Selector tabs
    selectorEl.innerHTML = `
      <div class="timeline-tabs">
        ${timelines.map(t => `
          <button class="timeline-tab ${activeTimelineId === t.id ? 'active' : ''}"
            onclick="TIMELINE.switchTo('${t.id}')"
            style="${activeTimelineId === t.id ? '--tab-color:' + t.color : ''}">
            <span>${t.icon}</span>
            <span>${t.title}</span>
          </button>`).join('')}
      </div>`;

    // Active timeline
    const tl = timelines.find(t => t.id === activeTimelineId);
    if (!tl) return;

    contentEl.innerHTML = `
      <div class="timeline-header">
        <div class="tlh-icon" style="color:${tl.color}">${tl.icon}</div>
        <div>
          <div class="tlh-title">${tl.title}</div>
          <div class="tlh-subject">${tl.subject}</div>
        </div>
      </div>

      <div class="timeline-body">
        ${(tl.events || []).map((event, i) => {
          const style = TYPE_STYLES[event.type] || TYPE_STYLES.policy;
          const isLast = i === tl.events.length - 1;
          return `
            <div class="tl-item ${isLast ? 'last' : ''}">
              <div class="tl-left">
                <div class="tl-year">${event.year}</div>
                <div class="tl-connector ${isLast ? 'last' : ''}"></div>
              </div>
              <div class="tl-node" style="background:${style.color}">
                <span>${style.icon}</span>
              </div>
              <div class="tl-content">
                <div class="tl-type-badge" style="color:${style.color};border-color:${style.color}20;background:${style.color}10">
                  ${style.label}
                </div>
                <div class="tl-event">${event.event}</div>
                <div class="tl-significance">${event.significance}</div>
              </div>
            </div>`;
        }).join('')}
      </div>

      <div class="timeline-exam-note section-card" style="margin-top:16px">
        <div class="sc-title">🎯 EXAM INTELLIGENCE</div>
        <p style="color:var(--text2);font-size:13px;line-height:1.7">
          UPSC tests timelines by asking about: 
          (1) <strong>which year</strong> something happened, 
          (2) <strong>what came before/after</strong> a policy, 
          (3) the <strong>significance</strong> of a milestone.
          Know the sequence — not just individual facts.
        </p>
      </div>`;
  }

  function switchTo(id) {
    activeTimelineId = id;
    render();
  }

  return { render, switchTo };
})();


// ══════════════════════════════════════════════
// 4. ADAPTIVE MOCK GENERATOR
// ══════════════════════════════════════════════
const MOCK = (() => {
  let activeConfig = null;
  let activeSubject = null;
  let inSession = false;

  function render() {
    const configsEl = document.getElementById('mockConfigs');
    const activeEl = document.getElementById('mockActive');
    if (!configsEl) return;
    if (activeEl) activeEl.style.display = 'none';
    configsEl.style.display = 'block';

    const configs = typeof MOCK_CONFIGS !== 'undefined' ? MOCK_CONFIGS : [];
    const allQ = getAllQuestions();

    // Compute weak nodes for adaptive description
    const weakNodes = Object.entries(STATE.mastery || {})
      .filter(([, v]) => v < 40)
      .map(([k]) => k);
    const weakSubjects = [...new Set(
      weakNodes.map(nid => {
        const node = KNOWLEDGE_GRAPH.nodes.find(n => n.id === nid);
        return node ? node.subject : null;
      }).filter(Boolean)
    )];

    configsEl.innerHTML = `
      <div class="mock-intro">
        <p style="color:var(--text2);font-size:13px;line-height:1.7;margin-bottom:16px">
          Generate a custom mock paper. The <strong style="color:var(--accent)">Adaptive</strong> modes 
          use your weak zone data to build targeted tests. 
          All mocks track results and update your mastery scores.
        </p>
        ${weakSubjects.length > 0 ? `
          <div class="mock-weak-alert">
            ⚠️ Weak zones detected: <strong>${weakSubjects.slice(0, 3).join(', ')}</strong>
            — Adaptive and Weak Assault modes will target these.
          </div>` : ''}
      </div>

      <div class="mock-configs-grid">
        ${configs.map(cfg => {
          const available = allQ.length;
          const canRun = available >= Math.min(cfg.questions, 10);
          return `
            <div class="mock-config-card ${!canRun ? 'disabled' : ''}"
              onclick="${canRun ? `MOCK.launch('${cfg.id}')` : ''}">
              <div class="mcc-icon">${cfg.icon || '📝'}</div>
              <div class="mcc-label">${cfg.label}</div>
              <div class="mcc-details">
                <span class="mcc-chip">${cfg.questions}Q</span>
                <span class="mcc-chip">${cfg.timeMin} min</span>
                ${cfg.negMarking ? '<span class="mcc-chip neg">−⅓</span>' : ''}
              </div>
              <div class="mcc-desc">${cfg.desc}</div>
            </div>`;
        }).join('')}
      </div>

      <!-- Subject Deep Dive selector -->
      <div class="mock-subject-select section-card" style="margin-top:16px">
        <div class="sc-title">📚 SUBJECT DEEP DIVE — Choose Subject</div>
        <div class="mock-subject-chips">
          ${[...new Set(allQ.map(q => q.subject))].map(s => `
            <button class="subject-chip ${activeSubject === s ? 'active' : ''}"
              onclick="MOCK.setSubject('${s}');MOCK.launch('subject_deep')">
              ${s}
            </button>`).join('')}
        </div>
      </div>`;
  }

  function getAllQuestions() {
    const base = typeof QUESTION_BANK !== 'undefined' ? QUESTION_BANK : [];
    const extra = typeof EXTRA_QUESTIONS !== 'undefined' ? EXTRA_QUESTIONS : [];
    return [...base, ...extra];
  }

  function setSubject(s) {
    activeSubject = s;
  }

  function launch(configId) {
    const configs = typeof MOCK_CONFIGS !== 'undefined' ? MOCK_CONFIGS : [];
    activeConfig = configs.find(c => c.id === configId);
    if (!activeConfig) return;

    const configsEl = document.getElementById('mockConfigs');
    const activeEl = document.getElementById('mockActive');
    if (configsEl) configsEl.style.display = 'none';
    if (!activeEl) return;
    activeEl.style.display = 'block';
    inSession = true;

    const all = getAllQuestions();
    let pool = [...all];

    // Build pool based on config
    if (configId === 'adaptive_30' || configId === 'weak_assault') {
      const weakNodes = Object.entries(STATE.mastery || {})
        .filter(([, v]) => v < 40)
        .map(([k]) => k);
      if (weakNodes.length >= 3) {
        pool = all.filter(q => weakNodes.includes(q.node));
      }
    } else if (configId === 'subject_deep' && activeSubject) {
      pool = all.filter(q => q.subject === activeSubject);
    } else if (configId === 'current_affairs') {
      const caQs = (typeof CURRENT_AFFAIRS !== 'undefined' ? CURRENT_AFFAIRS : []).map(ca => ({
        id: 'ca_' + ca.id,
        subject: 'Current Affairs',
        node: (ca.syllabusNodes || ['p1'])[0],
        difficulty: 'medium',
        year: 2024,
        topic: ca.category,
        q: ca.mcq.q,
        opts: ca.mcq.opts,
        ans: ca.mcq.ans,
        explain: ca.mcq.explain,
        wrongExplain: '',
      }));
      pool = [...caQs, ...all.filter(q => q.subject === 'Current Affairs')];
    } else if (configId === 'concept_cluster') {
      const clusterNodes = (typeof CONCEPT_CLUSTERS !== 'undefined' ? CONCEPT_CLUSTERS : [])
        .flatMap(c => c.nodes || []);
      pool = all.filter(q => clusterNodes.includes(q.node));
    } else if (configId === 'full_prelims' && activeConfig.subjectDist) {
      // Distribute by subject
      pool = [];
      Object.entries(activeConfig.subjectDist).forEach(([subj, count]) => {
        const subjQ = all.filter(q => q.subject === subj)
          .sort(() => Math.random() - 0.5)
          .slice(0, count);
        pool.push(...subjQ);
      });
      pool = pool.sort(() => Math.random() - 0.5);
    }

    if (pool.length < 5) pool = all;

    // Prioritise unseen questions
    const unseen = pool.filter(q => !isSeen(q.id)).sort(() => Math.random() - 0.5);
    const seen = pool.filter(q => isSeen(q.id)).sort(() => Math.random() - 0.5);
    const finalPool = [...unseen, ...seen].slice(0, activeConfig.questions);

    if (finalPool.length === 0) {
      activeEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <div class="empty-msg">Not enough questions available for this configuration.</div>
          <button class="btn-secondary" onclick="MOCK.render()">← Back</button>
        </div>`;
      return;
    }

    // Hand off to QUIZ engine with our pool
    window._mockPool = finalPool;
    window._mockConfig = activeConfig;
    activeEl.innerHTML = buildMockUI(finalPool, activeConfig);
    startMockSession(finalPool, activeConfig);
  }

  function buildMockUI(pool, cfg) {
    return `
      <div class="mock-session-header">
        <button class="back-btn" onclick="MOCK.exitSession()">✕ Exit</button>
        <div class="msh-info">
          <span class="msh-label">${cfg.label}</span>
          <span class="msh-count">Q <span id="mockQNum">1</span>/${pool.length}</span>
        </div>
        <div class="msh-timer" id="mockTimer" style="display:${cfg.timeMin > 0 ? 'flex' : 'none'}">
          ⏱ <span id="mockTimerDisplay">—</span>
        </div>
      </div>
      ${cfg.negMarking ? '<div class="neg-warning">⚠ Negative marking active: −⅓ per wrong answer</div>' : ''}
      <div class="mock-progress-bar">
        <div class="mock-progress-fill" id="mockProgressFill" style="width:0%"></div>
      </div>
      <div id="mockQuestionArea"></div>`;
  }

  let _mockState = null;
  let _mockTimer = null;

  function startMockSession(pool, cfg) {
    _mockState = {
      pool,
      cfg,
      current: 0,
      score: 0,
      wrong: 0,
      skipped: 0,
      timeLeft: cfg.timeMin * 60,
      answers: [],
    };

    if (cfg.timeMin > 0) {
      _mockTimer = setInterval(() => {
        _mockState.timeLeft--;
        const m = Math.floor(_mockState.timeLeft / 60);
        const s = _mockState.timeLeft % 60;
        const disp = document.getElementById('mockTimerDisplay');
        if (disp) disp.textContent = `${m}:${s.toString().padStart(2, '0')}`;
        const tw = document.getElementById('mockTimer');
        if (tw && _mockState.timeLeft <= 60) tw.classList.add('warning');
        if (_mockState.timeLeft <= 0) {
          clearInterval(_mockTimer);
          showMockResults();
        }
      }, 1000);
    }

    showMockQuestion();
  }

  function showMockQuestion() {
    if (!_mockState) return;
    const { pool, current, cfg } = _mockState;
    const q = pool[current];
    if (!q) { showMockResults(); return; }

    const fill = document.getElementById('mockProgressFill');
    if (fill) fill.style.width = (current / pool.length * 100) + '%';
    const numEl = document.getElementById('mockQNum');
    if (numEl) numEl.textContent = current + 1;

    const area = document.getElementById('mockQuestionArea');
    if (!area) return;

    area.innerHTML = `
      <div class="mock-question-card" id="mockQCard">
        <div class="mqc-meta">
          <span class="mqc-subject">${q.subject}</span>
          <span class="mqc-topic">${q.topic || ''}</span>
          ${q.year ? `<span class="mqc-year">${q.year}</span>` : ''}
          <span class="mqc-diff ${q.difficulty}">${q.difficulty || ''}</span>
        </div>
        <div class="mqc-text">${q.q}</div>
        <div class="mqc-opts" id="mockOpts">
          ${q.opts.map((opt, i) =>
            `<button class="q-opt" onclick="MOCK.answerQuestion(${i})">${opt}</button>`
          ).join('')}
        </div>
      </div>`;
  }

  function answerQuestion(idx) {
    if (!_mockState) return;
    const { pool, current, cfg } = _mockState;
    const q = pool[current];
    if (!q) return;

    const correct = idx === q.ans;
    if (correct) _mockState.score++;
    else _mockState.wrong++;
    _mockState.answers.push({ qId: q.id, correct, nodeId: q.node });

    markSeen(q.id);
    logAnswer(q.node, correct, q.id);
    if (correct) addXP(XP_REWARDS.quiz_correct, 'Mock: ' + q.subject);

    // Show feedback on options
    const opts = document.querySelectorAll('#mockOpts .q-opt');
    opts.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('correct');
      else if (i === idx && !correct) btn.classList.add('wrong');
    });

    // Show explanation
    const card = document.getElementById('mockQCard');
    if (card) {
      const fb = document.createElement('div');
      fb.className = 'question-feedback';
      fb.innerHTML = `
        <div class="qf-label">${correct ? '✅ Correct!' : '❌ Incorrect'}</div>
        <p>${q.explain}</p>
        ${!correct && q.wrongExplain ? `<div class="explain-box"><div class="explain-label">Why you may have gone wrong:</div>${q.wrongExplain}</div>` : ''}
        <button class="next-btn" onclick="MOCK.nextQuestion()">
          ${current + 1 < pool.length ? 'Next →' : 'See Results →'}
        </button>`;
      card.appendChild(fb);
    }
  }

  function nextQuestion() {
    if (!_mockState) return;
    _mockState.current++;
    if (_mockState.current >= _mockState.pool.length) {
      showMockResults();
    } else {
      showMockQuestion();
    }
  }

  function showMockResults() {
    if (_mockTimer) { clearInterval(_mockTimer); _mockTimer = null; }
    if (!_mockState) return;

    const { pool, score, wrong, cfg } = _mockState;
    const total = pool.length;
    const skipped = total - score - wrong;
    const negPoints = cfg.negMarking ? wrong * (cfg.negValue || 0.33) : 0;
    const rawScore = score - negPoints;
    const pct = total > 0 ? Math.round((rawScore / total) * 100) : 0;
    const color = pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)';

    addXP(XP_REWARDS.quiz_complete, cfg.label + ' Complete!');
    inSession = false;

    const area = document.getElementById('mockQuestionArea');
    if (!area) return;
    area.innerHTML = `
      <div class="mock-results">
        <div class="mr-score" style="color:${color}">${pct}%</div>
        <div class="mr-label">${cfg.label} — Completed</div>

        <div class="mr-breakdown">
          <div class="mr-stat">
            <div class="mrs-val" style="color:var(--green)">${score}</div>
            <div class="mrs-label">Correct</div>
          </div>
          <div class="mr-stat">
            <div class="mrs-val" style="color:var(--red)">${wrong}</div>
            <div class="mrs-label">Wrong</div>
          </div>
          <div class="mr-stat">
            <div class="mrs-val">${skipped}</div>
            <div class="mrs-label">Skipped</div>
          </div>
          ${cfg.negMarking ? `
            <div class="mr-stat">
              <div class="mrs-val" style="color:var(--red)">−${negPoints.toFixed(1)}</div>
              <div class="mrs-label">Penalty</div>
            </div>` : ''}
        </div>

        ${cfg.negMarking ? `
          <div class="mr-net-score">
            Net Score: <strong style="color:${color}">${rawScore.toFixed(1)} / ${total}</strong>
          </div>` : ''}

        <div class="mr-interpretation">
          ${pct >= 70 ? '🌟 Excellent — Ready for this level!' :
            pct >= 55 ? '✅ Good — Keep practicing targeted weak areas.' :
            pct >= 40 ? '⚠️ Average — Focus on your weak subjects.' :
            '❌ Needs work — Revisit NCERT modules for weak topics.'}
        </div>

        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button class="btn-primary" onclick="MOCK.render()">Try Another Mock</button>
          <button class="btn-secondary" onclick="navigate('revision');REVISION.render()">Revise Weak Topics</button>
          <button class="btn-secondary" onclick="navigate('performance');PERFORMANCE.render()">View Analytics</button>
        </div>
      </div>`;
  }

  function exitSession() {
    if (_mockTimer) { clearInterval(_mockTimer); _mockTimer = null; }
    inSession = false;
    _mockState = null;
    render();
  }

  return { render, launch, setSubject, answerQuestion, nextQuestion, exitSession };
})();


// ══════════════════════════════════════════════
// 5. MAINS THINKING TRAINER
// ══════════════════════════════════════════════
const MAINS = (() => {
  let activeQuestion = null;
  let revealedModel = false;

  function render() {
    const listEl = document.getElementById('mainsQuestionList');
    const editorEl = document.getElementById('mainsEditor');
    if (!listEl) return;
    if (editorEl) editorEl.style.display = 'none';
    listEl.style.display = 'block';

    const questions = typeof MAINS_THINKING !== 'undefined' ? MAINS_THINKING : [];

    listEl.innerHTML = `
      <div class="mains-intro">
        <p style="color:var(--text2);font-size:13px;line-height:1.7;margin-bottom:16px">
          UPSC Mains GS answers require multi-dimensional thinking. 
          This trainer breaks down <strong style="color:var(--accent)">how to think</strong> about each question, 
          not just what to write.
        </p>
        <div class="mains-format-pills">
          <span class="mf-pill">150-word answers</span>
          <span class="mf-pill">250-word answers</span>
          <span class="mf-pill">Keyword scoring</span>
          <span class="mf-pill">Structure feedback</span>
          <span class="mf-pill">Model answer reveal</span>
        </div>
      </div>
      <div class="mains-question-list">
        ${questions.map(q => `
          <div class="mains-q-card" onclick="MAINS.open('${q.id}')">
            <div class="mqc-header">
              <span class="mqc-paper">${q.paperType}</span>
              <span class="mqc-diff ${q.difficulty}">${q.difficulty}</span>
              <span class="mqc-words">${q.wordTarget} words</span>
            </div>
            <div class="mqc-subject">${q.subject}</div>
            <div class="mqc-question">${q.question}</div>
            <div class="mqc-dims">
              ${(q.keyDimensions || []).slice(0, 3).map(d => `
                <span class="mqc-dim-chip">${d.dimension}</span>`).join('')}
              ${(q.keyDimensions || []).length > 3 ? `<span class="mqc-dim-chip">+${q.keyDimensions.length - 3}</span>` : ''}
            </div>
          </div>`).join('')}
      </div>`;
  }

  function open(id) {
    const questions = typeof MAINS_THINKING !== 'undefined' ? MAINS_THINKING : [];
    activeQuestion = questions.find(q => q.id === id);
    if (!activeQuestion) return;
    revealedModel = false;

    const listEl = document.getElementById('mainsQuestionList');
    const editorEl = document.getElementById('mainsEditor');
    const contentEl = document.getElementById('mainsEditorContent');
    if (listEl) listEl.style.display = 'none';
    if (editorEl) editorEl.style.display = 'block';
    if (!contentEl) return;

    const q = activeQuestion;

    contentEl.innerHTML = `
      <!-- Question display -->
      <div class="mains-q-display">
        <div class="mqd-meta">
          <span class="mqd-paper">${q.paperType}</span>
          <span class="mqd-subject">${q.subject}</span>
          <span class="mqd-words">Target: ${q.wordTarget} words</span>
        </div>
        <div class="mqd-question">${q.question}</div>
      </div>

      <!-- Thinking Framework -->
      <div class="section-card" style="margin-top:14px">
        <div class="sc-title">🧠 DIMENSIONS TO ADDRESS</div>
        <p style="color:var(--text3);font-size:12px;margin-bottom:12px">
          UPSC awards marks for multi-dimensional coverage. Address each dimension.
        </p>
        <div class="mains-dimensions">
          ${(q.keyDimensions || []).map((dim, i) => `
            <div class="mains-dim-item">
              <div class="mdi-header" onclick="MAINS.toggleDim(${i})">
                <div class="mdi-number">${i + 1}</div>
                <div class="mdi-name">${dim.dimension}</div>
                <div class="mdi-toggle" id="dimtoggle_${i}">▼</div>
              </div>
              <div class="mdi-hint" id="dimhint_${i}" style="display:none">
                <p>${dim.hint}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Recommended Structure -->
      <div class="section-card" style="margin-top:12px">
        <div class="sc-title">📋 RECOMMENDED STRUCTURE</div>
        <div class="mains-structure-steps">
          ${(q.modelStructure || []).map((step, i) => `
            <div class="mss-step">
              <div class="mss-num">${i + 1}</div>
              <div class="mss-text">${step}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Keywords to include -->
      <div class="section-card" style="margin-top:12px">
        <div class="sc-title">🔑 KEYWORDS — Must Include</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">
          ${(q.keywords || []).map(k => `<span class="keyword-chip mains-kw" id="kw_${k.replace(/[^a-z0-9]/gi,'_')}">${k}</span>`).join('')}
        </div>
      </div>

      <!-- Answer Writing Area -->
      <div class="section-card mains-write-area" style="margin-top:12px">
        <div class="sc-title">✍️ WRITE YOUR ANSWER</div>
        <div class="mains-word-counter">
          <span>Words: <strong id="mainsWordCount">0</strong> / ${q.wordTarget}</span>
          <div class="mwc-bar-track">
            <div class="mwc-bar-fill" id="mainsWordBar" style="width:0%"></div>
          </div>
        </div>
        <textarea
          id="mainsTextarea"
          class="mains-textarea"
          placeholder="Structure your answer:&#10;&#10;Introduction (2-3 lines): Set context and state your argument.&#10;&#10;Body Para 1: [Dimension 1]&#10;&#10;Body Para 2: [Dimension 2]&#10;&#10;... continue for each dimension ...&#10;&#10;Conclusion: Way forward / balanced view (2-3 lines)."
          oninput="MAINS.updateWordCount()"
        ></textarea>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
          <button class="btn-primary" onclick="MAINS.evaluate()">Evaluate Answer →</button>
          <button class="btn-secondary" onclick="MAINS.revealModel()">
            ${revealedModel ? 'Hide Model Structure' : 'Show Model Structure'}
          </button>
        </div>
      </div>

      <!-- Evaluation result (hidden initially) -->
      <div id="mainsEvalResult" style="display:none"></div>

      <!-- Model Answer structure (hidden initially) -->
      <div id="mainsModelAnswer" style="display:none">
        <div class="section-card mains-model-card" style="margin-top:12px;border-color:rgba(124,106,247,0.3)">
          <div class="sc-title" style="color:var(--accent)">📖 MODEL ANSWER STRUCTURE</div>
          <div class="mains-model-steps">
            ${(q.modelStructure || []).map((step, i) => `
              <div class="mms-step">
                <div class="mms-num">${i + 1}</div>
                <div class="mms-text">${step}</div>
              </div>`).join('')}
          </div>
          <div class="mains-model-keywords">
            <div style="font-size:12px;color:var(--text3);margin:12px 0 8px">KEY ARGUMENTS TO COVER:</div>
            ${(q.keyDimensions || []).map(d => `
              <div class="mmk-item">
                <strong style="color:var(--accent)">${d.dimension}:</strong>
                <span style="color:var(--text2)">${d.hint}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  function toggleDim(i) {
    const hint = document.getElementById('dimhint_' + i);
    const toggle = document.getElementById('dimtoggle_' + i);
    if (!hint) return;
    const isOpen = hint.style.display !== 'none';
    hint.style.display = isOpen ? 'none' : 'block';
    if (toggle) toggle.textContent = isOpen ? '▼' : '▲';
  }

  function updateWordCount() {
    const ta = document.getElementById('mainsTextarea');
    const wcel = document.getElementById('mainsWordCount');
    const barEl = document.getElementById('mainsWordBar');
    if (!ta) return;
    const wc = ta.value.trim().split(/\s+/).filter(Boolean).length;
    if (wcel) wcel.textContent = wc;
    const target = activeQuestion ? activeQuestion.wordTarget : 250;
    const pct = Math.min(100, Math.round((wc / target) * 100));
    if (barEl) {
      barEl.style.width = pct + '%';
      barEl.style.background = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--accent)' : 'var(--gold)';
    }

    // Highlight keywords as user types
    if (activeQuestion) {
      const text = ta.value.toLowerCase();
      (activeQuestion.keywords || []).forEach(k => {
        const el = document.getElementById('kw_' + k.replace(/[^a-z0-9]/gi, '_'));
        if (!el) return;
        const found = text.includes(k.toLowerCase());
        el.classList.toggle('kw-found', found);
        el.classList.toggle('kw-missing', !found);
      });
    }
  }

  function evaluate() {
    const ta = document.getElementById('mainsTextarea');
    if (!ta || !ta.value.trim()) { alert('Write your answer first!'); return; }
    if (!activeQuestion) return;

    const text = ta.value;
    const wc = text.trim().split(/\s+/).filter(Boolean).length;
    const q = activeQuestion;

    // Keyword scoring
    const keywords = q.keywords || [];
    const kwFound = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()));
    const kwScore = Math.round((kwFound.length / (keywords.length || 1)) * 100);

    // Dimension coverage (check hints/keywords)
    const dims = q.keyDimensions || [];
    const dimsCovered = dims.filter(d => {
      const hintWords = d.hint.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      return hintWords.some(w => text.toLowerCase().includes(w));
    });
    const dimScore = dims.length > 0 ? Math.round((dimsCovered.length / dims.length) * 100) : 50;

    // Length score
    const target = q.wordTarget || 250;
    const lengthScore = wc >= target ? 100 : wc >= target * 0.8 ? 85 : wc >= target * 0.6 ? 65 : wc >= target * 0.4 ? 45 : 25;

    // Structure score (paragraphs)
    const paraCount = (text.match(/\n\n/g) || []).length;
    const structureScore = paraCount >= 4 ? 90 : paraCount >= 3 ? 75 : paraCount >= 2 ? 60 : paraCount >= 1 ? 45 : 30;

    const overall = Math.round(kwScore * 0.3 + dimScore * 0.3 + lengthScore * 0.25 + structureScore * 0.15);
    const grade = overall >= 80 ? 'Excellent' : overall >= 65 ? 'Good' : overall >= 50 ? 'Average' : 'Needs Work';
    const gradeColor = overall >= 80 ? 'var(--green)' : overall >= 65 ? 'var(--gold)' : overall >= 50 ? 'var(--accent)' : 'var(--red)';

    addXP(XP_REWARDS.essay_submit, 'Mains Answer Evaluated');

    const el = document.getElementById('mainsEvalResult');
    if (!el) return;
    el.style.display = 'block';
    el.innerHTML = `
      <div class="mains-eval-card section-card" style="margin-top:12px">
        <div class="sc-title">📊 EVALUATION RESULT</div>

        <div class="mec-score-row">
          <div class="mec-score" style="color:${gradeColor}">${overall}%</div>
          <div class="mec-grade" style="color:${gradeColor}">${grade}</div>
          <div class="mec-wc">${wc} / ${target} words</div>
        </div>

        <div class="mec-criteria">
          ${[
            ['Keyword Coverage', kwScore, `${kwFound.length}/${keywords.length} key terms`],
            ['Dimension Coverage', dimScore, `${dimsCovered.length}/${dims.length} dimensions addressed`],
            ['Length & Depth', lengthScore, wc >= target ? 'On target' : `${target - wc} more words needed`],
            ['Structure (Paragraphs)', structureScore, paraCount >= 3 ? `${paraCount} paragraphs — good` : 'Add more paragraph breaks'],
          ].map(([label, score, note]) => `
            <div class="mec-bar-row">
              <div class="mec-bar-label">${label}</div>
              <div class="mec-bar-track">
                <div class="mec-bar-fill" style="width:${score}%;background:${score >= 70 ? 'var(--green)' : score >= 50 ? 'var(--gold)' : 'var(--red)'}"></div>
              </div>
              <div class="mec-bar-score">${score}%</div>
              <div class="mec-bar-note">${note}</div>
            </div>`).join('')}
        </div>

        ${kwFound.length > 0 ? `<div class="mec-kw-good">✅ Keywords found: ${kwFound.join(', ')}</div>` : ''}
        ${kwFound.length < keywords.length ? `
          <div class="mec-kw-miss">
            ⚠️ Missing: ${keywords.filter(k => !text.toLowerCase().includes(k.toLowerCase())).join(', ')}
          </div>` : ''}

        ${dimsCovered.length < dims.length ? `
          <div class="mec-dims-miss">
            📌 Dimensions to strengthen: 
            ${dims.filter(d => !dimsCovered.includes(d)).map(d => d.dimension).join(', ')}
          </div>` : ''}

        <div class="mec-tip">
          💡 UPSC marker tip: The examiner checks for (1) introduction that defines the issue, 
          (2) multiple dimensions addressed, (3) examples/data, (4) balanced conclusion with way forward.
          Each of these is worth marks independently.
        </div>

        <button class="btn-secondary" style="margin-top:12px" onclick="MAINS.revealModel()">
          View Model Answer Structure
        </button>
      </div>`;

    el.scrollIntoView({ behavior: 'smooth' });
  }

  function revealModel() {
    revealedModel = !revealedModel;
    const el = document.getElementById('mainsModelAnswer');
    if (el) el.style.display = revealedModel ? 'block' : 'none';
    // Update button text
    const btns = document.querySelectorAll('#mainsEditorContent .btn-secondary');
    btns.forEach(btn => {
      if (btn.textContent.includes('Model') || btn.textContent.includes('Hide')) {
        btn.textContent = revealedModel ? 'Hide Model Structure' : 'Show Model Structure';
      }
    });
    if (revealedModel) {
      const el2 = document.getElementById('mainsModelAnswer');
      if (el2) el2.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function backToList() {
    activeQuestion = null;
    revealedModel = false;
    render();
  }

  return { render, open, toggleDim, updateWordCount, evaluate, revealModel, backToList };
})();

// ══════════════════════════════════════════════
// AI MCQ GENERATOR
// ══════════════════════════════════════════════
const MCQGEN = (() => {
  let generatedQs  = [];
  let quizActive   = false;
  let quizCurrent  = 0;
  let quizScore    = 0;

  const SUBJECTS = [
    'Polity', 'Economy', 'Environment', 'History',
    'Geography', 'Sci & Tech', 'Governance', 'Int. Relations',
    'Current Affairs',
  ];

  const TOPICS_BY_SUBJECT = {
    'Polity':          ['Fundamental Rights', 'DPSP', 'Parliament', 'Judiciary', 'Federalism', 'Elections', 'Constitutional Amendments', 'Emergency Provisions'],
    'Economy':         ['GDP and National Income', 'Monetary Policy', 'Fiscal Policy', 'Agriculture', 'Digital Economy', 'Banking', 'Trade Policy', 'Budget'],
    'Environment':     ['Climate Change', 'Biodiversity', 'Protected Areas', 'Pollution', 'International Conventions', 'Renewable Energy', 'Green Hydrogen'],
    'History':         ['Ancient India', 'Medieval India', 'Freedom Struggle', 'Post-Independence', 'Art and Culture'],
    'Geography':       ['Physical Geography', 'Indian Geography', 'Agriculture', 'Population', 'Natural Resources'],
    'Sci & Tech':      ['Space Technology (ISRO)', 'Biotechnology', 'AI and Digital', 'Cybersecurity', 'Defence Technology'],
    'Governance':      ['E-Governance', 'Social Policy', 'Anti-Corruption Bodies', 'Civil Services'],
    'Int. Relations':  ['South Asia', 'Multilateral Groupings', 'India-China', 'India-USA', 'Global Order'],
    'Current Affairs': ['Climate & Environment', 'Economy & Finance', 'Polity & Governance', 'Science & Technology', 'International Relations'],
  };

  function render() {
    const el = document.getElementById('panel-mcqgen');
    if (!el) return;

    if (!AI.hasKey()) {
      el.innerHTML = `
        <div class="panel-header">
          <h1>⚡ AI MCQ Generator</h1>
          <div class="panel-subtitle">Generate unlimited UPSC-style questions on any topic</div>
        </div>
        <div id="mcqgen-setup-area"></div>`;
      AI.renderSetup('mcqgen-setup-area', true);
      return;
    }

    el.innerHTML = `
      <div class="panel-header">
        <h1>⚡ AI MCQ Generator</h1>
        <div class="panel-subtitle">Generate unlimited UPSC-style questions on any topic</div>
      </div>

      <!-- Config form -->
      <div class="mcqgen-form section-card">
        <div class="mgf-row">
          <label class="mgf-label">Subject</label>
          <select id="mcqSubject" class="mgf-select" onchange="MCQGEN.updateTopics()">
            ${SUBJECTS.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>

        <div class="mgf-row">
          <label class="mgf-label">Topic</label>
          <select id="mcqTopic" class="mgf-select">
            ${(TOPICS_BY_SUBJECT['Polity'] || []).map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>

        <div class="mgf-row">
          <label class="mgf-label">Custom Topic <span style="color:var(--text3)">(optional)</span></label>
          <input id="mcqCustomTopic" class="mgf-input" type="text"
            placeholder="e.g. Puttaswamy judgment, PANCHAMRIT commitments..." />
        </div>

        <div class="mgf-two-col">
          <div class="mgf-row">
            <label class="mgf-label">Questions</label>
            <div class="mgf-chips" id="countChips">
              ${[3, 5, 10].map((n, i) =>
                `<button class="mgf-chip ${i === 1 ? 'active' : ''}"
                  onclick="MCQGEN.setCount(${n}, this)">${n}Q</button>`
              ).join('')}
            </div>
          </div>
          <div class="mgf-row">
            <label class="mgf-label">Difficulty</label>
            <div class="mgf-chips" id="diffChips">
              ${['easy', 'medium', 'hard'].map((d, i) =>
                `<button class="mgf-chip ${i === 1 ? 'active' : ''}"
                  onclick="MCQGEN.setDiff('${d}', this)">${d}</button>`
              ).join('')}
            </div>
          </div>
        </div>

        <button class="btn-primary" style="width:100%;margin-top:4px"
          onclick="MCQGEN.generate()" id="mcqGenBtn">
          ⚡ Generate Questions
        </button>
      </div>

      <!-- Output area -->
      <div id="mcqgen-output" style="margin-top:16px"></div>`;
  }

  function updateTopics() {
    const subj  = document.getElementById('mcqSubject')?.value;
    const sel   = document.getElementById('mcqTopic');
    if (!sel || !subj) return;
    const topics = TOPICS_BY_SUBJECT[subj] || [];
    sel.innerHTML = topics.map(t => `<option value="${t}">${t}</option>`).join('');
  }

  let _count = 5, _diff = 'medium';
  function setCount(n, btn) {
    _count = n;
    document.querySelectorAll('#countChips .mgf-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  function setDiff(d, btn) {
    _diff = d;
    document.querySelectorAll('#diffChips .mgf-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }

  async function generate() {
    const subj   = document.getElementById('mcqSubject')?.value || 'Polity';
    const topic  = document.getElementById('mcqCustomTopic')?.value.trim()
                || document.getElementById('mcqTopic')?.value
                || 'Constitutional Framework';
    const btn    = document.getElementById('mcqGenBtn');
    const output = document.getElementById('mcqgen-output');
    if (!output) return;

    if (btn) { btn.disabled = true; btn.textContent = 'Generating...'; }
    output.innerHTML = AI.loadingHTML(`Generating ${_count} ${_diff} questions on "${topic}"...`);

    try {
      const qs = await AI.generateMCQ(topic, subj, _count, _diff);
      if (!qs || qs.length === 0) throw new Error('No questions returned');

      generatedQs = qs.map((q, i) => ({
        ...q,
        id:      'aiq_' + Date.now() + '_' + i,
        subject: subj,
        topic,
        node:    KNOWLEDGE_GRAPH.nodes.find(n => n.subject === subj)?.id || 'p1',
      }));

      quizActive  = false;
      renderGenerated(output, topic);

    } catch (err) {
      output.innerHTML = AI.errorHTML('Generation failed: ' + err.message, 'MCQGEN.generate()');
    }

    if (btn) { btn.disabled = false; btn.textContent = '⚡ Generate Questions'; }
  }

  function renderGenerated(output, topic) {
    output.innerHTML = `
      <div class="mcqgen-result-header">
        <div class="mgrh-topic">${generatedQs.length} questions on: <strong>${topic}</strong></div>
        <button class="btn-primary" onclick="MCQGEN.startQuiz()">Practice Now →</button>
      </div>
      <div class="mcqgen-preview">
        ${generatedQs.map((q, i) => `
          <div class="mgp-item">
            <div class="mgp-num">Q${i + 1}</div>
            <div class="mgp-text">${q.q}</div>
          </div>`).join('')}
      </div>`;
  }

  function startQuiz() {
    quizActive  = true;
    quizCurrent = 0;
    quizScore   = 0;
    const output = document.getElementById('mcqgen-output');
    if (output) showQuizQ(output);
  }

  function showQuizQ(output) {
    if (!output) return;
    const q = generatedQs[quizCurrent];
    output.innerHTML = `
      <div class="mcqgen-quiz-header">
        <div class="mqh-progress">${quizCurrent + 1} / ${generatedQs.length}</div>
        <div class="mqh-bar"><div class="mqh-fill" style="width:${(quizCurrent / generatedQs.length) * 100}%"></div></div>
        <button class="btn-sm ghost" onclick="MCQGEN.exitQuiz()">✕</button>
      </div>
      <div class="question-card ai-question-card">
        <div class="qc-subject" style="color:var(--cyan)">🤖 AI-Generated · ${q.subject} · ${q.topic}</div>
        <div class="qc-text">${q.q}</div>
        <div class="qc-opts">
          ${q.opts.map((opt, i) =>
            `<button class="q-opt" onclick="MCQGEN.answer(${i})">${opt}</button>`
          ).join('')}
        </div>
      </div>`;
  }

  function answer(idx) {
    const q      = generatedQs[quizCurrent];
    const correct= idx === q.ans;
    if (correct) { quizScore++; addXP(XP_REWARDS.quiz_correct, 'AI MCQ'); }
    logAnswer(q.node, correct, q.id);

    document.querySelectorAll('.qc-opts .q-opt').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('correct');
      else if (i === idx && !correct) btn.classList.add('wrong');
    });

    const card = document.querySelector('.ai-question-card');
    if (card) {
      const fb = document.createElement('div');
      fb.className = 'question-feedback';
      fb.innerHTML = `
        <div class="qf-label">${correct ? '✅ Correct!' : '❌ Incorrect'}</div>
        <p>${q.explain}</p>
        ${!correct && q.wrongExplain ? `<div class="explain-box"><div class="explain-label">Common trap:</div>${q.wrongExplain}</div>` : ''}
        <button class="next-btn" onclick="MCQGEN.nextQ()">
          ${quizCurrent + 1 < generatedQs.length ? 'Next →' : 'Finish →'}
        </button>`;
      card.appendChild(fb);
    }
  }

  function nextQ() {
    quizCurrent++;
    const output = document.getElementById('mcqgen-output');
    if (quizCurrent >= generatedQs.length) {
      showQuizResults(output);
    } else {
      showQuizQ(output);
    }
  }

  function showQuizResults(output) {
    const pct   = Math.round((quizScore / generatedQs.length) * 100);
    const color = pct >= 70 ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--red)';
    addXP(XP_REWARDS.quiz_complete, 'AI MCQ Set Complete');
    if (!output) return;
    output.innerHTML = `
      <div class="quiz-result-summary">
        <div class="qrs-score" style="color:${color}">${pct}%</div>
        <div class="qrs-label">${quizScore}/${generatedQs.length} correct on AI-generated questions</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px">
          <button class="btn-primary" onclick="MCQGEN.startQuiz()">Retry Same Set</button>
          <button class="btn-secondary" onclick="MCQGEN.generate()">Generate New Set</button>
        </div>
      </div>`;
  }

  function exitQuiz() {
    const output = document.getElementById('mcqgen-output');
    if (output && generatedQs.length > 0) {
      renderGenerated(output, generatedQs[0].topic);
    }
  }

  return { render, updateTopics, setCount, setDiff, generate, startQuiz, answer, nextQ, exitQuiz };
})();
