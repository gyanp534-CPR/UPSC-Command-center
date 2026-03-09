// ══════════════════════════════════════════
//  UPSC COMMAND CENTER — APP ENGINE
// ══════════════════════════════════════════

const App = (() => {
  // ── STATE ──
  const state = {
    currentPanel: 'feed',
    mcq: {
      pool: [],
      currentIndex: 0,
      answered: false,
      timerVal: 90,
      timerInterval: null,
      session: { correct: 0, wrong: 0, skipped: 0, times: [] },
      startTime: null,
      filterSubject: 'All',
      filterDifficulty: 'All',
      bookmarks: JSON.parse(localStorage.getItem('upsc_bookmarks') || '[]'),
      wrongAnswers: JSON.parse(localStorage.getItem('upsc_wrong') || '[]'),
    },
    revision: {
      topics: JSON.parse(JSON.stringify(REVISION_TOPICS)) // deep copy
    },
    mains: {
      currentQuestion: 0,
      answers: {},
      wordCounts: {}
    },
    news: { expanded: null, filter: 'All' },
    schemes: { filter: 'All', search: '' },
    progress: JSON.parse(localStorage.getItem('upsc_progress') || JSON.stringify({
      totalAttempted: 0, totalCorrect: 0, subjectStats: {}, streak: 6, lastStudied: null
    }))
  };

  // ── INIT ──
  function init() {
    buildStreak();
    renderFeed();
    shuffleMCQPool();
    renderMCQ();
    renderMainsQuestion();
    renderRevision();
    renderSchemes();
    renderAnalytics();
    renderEssayStudio();
    updateProgressBars();
    updateHeaderStats();
    initSearch();
  }

  // ── PANEL SWITCH ──
  function switchPanel(panel, srcType) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab, .bnav-tab').forEach(t => t.classList.remove('active'));

    const panelEl = document.getElementById('panel-' + panel);
    if (!panelEl) return;
    panelEl.classList.add('active');
    state.currentPanel = panel;

    // Sync both navbars
    document.querySelectorAll('[data-panel="' + panel + '"]').forEach(t => t.classList.add('active'));

    if (panel === 'revision') setTimeout(drawForgettingCurve, 60);
    if (panel === 'analytics') setTimeout(() => { drawAccuracyChart(); drawRadarChart(); }, 60);
    if (srcType === 'mobile') window.scrollTo(0, 0);
  }

  // ── STREAK ──
  function buildStreak() {
    ['streakD', 'streakM'].forEach(id => {
      const row = document.getElementById(id);
      if (!row) return;
      row.innerHTML = '';
      for (let i = 1; i <= 31; i++) {
        const d = document.createElement('div');
        d.className = 'streak-day' + (i < 7 ? ' done' : i === 7 ? ' partial' : '');
        d.textContent = i;
        row.appendChild(d);
      }
    });
  }

  // ── HEADER STATS ──
  function updateHeaderStats() {
    const pct = state.progress.totalAttempted > 0
      ? Math.round((state.progress.totalCorrect / state.progress.totalAttempted) * 100) : 68;
    document.querySelectorAll('.js-readiness').forEach(el => el.textContent = pct + '%');
    document.querySelectorAll('.js-streak').forEach(el => el.textContent = state.progress.streak);
  }

  // ── PROGRESS BARS ──
  function updateProgressBars() {
    const subjects = {
      'Polity': 84, 'Economy': 61, 'History': 78,
      'Environment': 42, 'Sci & Tech': 55, 'Geography': 70
    };
    Object.entries(subjects).forEach(([subj, pct]) => {
      const bars = document.querySelectorAll('.bar-fill[data-subject="' + subj + '"]');
      bars.forEach(b => { b.style.width = pct + '%'; });
    });
  }

  // ══════════════════════
  //  DAILY FEED
  // ══════════════════════
  function renderFeed(filter = 'All') {
    const container = document.getElementById('feedGrid');
    if (!container) return;
    const data = filter === 'All' ? NEWS_DATA : NEWS_DATA.filter(n => n.tag === filter || n.cardClass === filter.toLowerCase());
    container.innerHTML = data.map(n => `
      <div class="news-card ${n.cardClass}" onclick="App.expandNews(${n.id})">
        <span class="news-tag ${n.tagClass}">${n.tag}</span>
        <div class="news-headline">${n.headline}</div>
        <div class="news-excerpt">${n.excerpt}</div>
        <div class="news-meta">
          <span class="news-source">${n.source} · ${n.date}</span>
          <span class="news-badge ${n.badgeClass}">${n.badge}</span>
        </div>
      </div>
    `).join('');
  }

  function expandNews(id) {
    const news = NEWS_DATA.find(n => n.id === id);
    if (!news) return;
    const modal = document.getElementById('newsModal');
    document.getElementById('newsModalTitle').textContent = news.headline;
    document.getElementById('newsModalBody').innerHTML = `
      <div class="modal-tags" style="margin-bottom:1rem">
        <span class="news-tag ${news.tagClass}">${news.tag}</span>
        <span class="news-badge ${news.badgeClass}" style="padding:0.2rem 0.5rem">${news.badge}</span>
        <span style="font-family:var(--mono);font-size:0.55rem;color:var(--dust);margin-left:0.5rem">${news.date}</span>
      </div>
      <p style="font-size:1rem;line-height:1.7;margin-bottom:1.25rem">${news.excerpt}</p>
      <div class="modal-section">
        <div class="modal-section-title">📌 Prelims Key Points</div>
        <ul class="modal-list">
          ${news.prelims_points.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-section" style="margin-top:1rem">
        <div class="modal-section-title">✍️ Mains Angle</div>
        <p class="modal-mains">${news.mains_angle}</p>
      </div>
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNewsModal() {
    document.getElementById('newsModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ══════════════════════
  //  MCQ ENGINE
  // ══════════════════════
  function shuffleMCQPool() {
    let pool = [...QUESTION_BANK];
    if (state.mcq.filterSubject !== 'All') pool = pool.filter(q => q.subject === state.mcq.filterSubject);
    if (state.mcq.filterDifficulty !== 'All') pool = pool.filter(q => q.difficulty === state.mcq.filterDifficulty);
    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    // Boost weak subjects
    state.mcq.pool = pool;
    state.mcq.currentIndex = 0;
    state.mcq.answered = false;
    state.mcq.session = { correct: 0, wrong: 0, skipped: 0, times: [] };
  }

  function renderMCQ() {
    const pool = state.mcq.pool;
    if (!pool.length) return;
    const idx = state.mcq.currentIndex % pool.length;
    const q = pool[idx];
    const container = document.getElementById('mcqCard');
    if (!container) return;

    const isBookmarked = state.mcq.bookmarks.includes(q.id);

    container.innerHTML = `
      <div class="mcq-header">
        <div>
          <div class="mcq-meta">
            <span class="news-tag tag-${q.subject.toLowerCase().replace(/ /g,'-').replace(/&/g,'')}">${q.subject}</span>
            <span class="news-tag" style="background:var(--saffron-pale);color:#8a4500">${q.year || 'Practice'}</span>
            <span class="news-tag" style="background:var(--parchment);color:var(--dust)">${q.difficulty}</span>
          </div>
        </div>
        <div style="text-align:right">
          <div class="mcq-timer" id="mcqTimer">01:30</div>
          <div class="mcq-timer-lbl">Remaining</div>
        </div>
      </div>

      <div class="question-num">Question ${idx + 1} of ${pool.length} &nbsp;·&nbsp; ${q.topic}</div>
      <div class="question-text">${q.question.replace(/\n/g, '<br>')}</div>

      <div class="options" id="mcqOptions">
        ${q.options.map((opt, i) => `
          <div class="option" id="opt-${i}" onclick="App.selectOption(${i}, ${q.correct})">
            <div class="opt-letter">${String.fromCharCode(65 + i)}</div>
            <div class="opt-text">${opt}</div>
          </div>
        `).join('')}
      </div>

      <div class="explanation" id="explanation">
        <div class="exp-label">Explanation</div>
        <div class="exp-text">${q.explanation}<br><br><strong>Syllabus:</strong> <em>${q.syllabus}</em></div>
      </div>

      <div class="mcq-actions">
        <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
          <button class="btn btn-secondary" onclick="App.skipQuestion()">Skip</button>
          <button class="btn btn-secondary ${isBookmarked ? 'btn-bookmarked' : ''}" id="bookmarkBtn" onclick="App.toggleBookmark(${q.id})">
            ${isBookmarked ? '★ Saved' : '☆ Bookmark'}
          </button>
        </div>
        <button class="btn btn-primary" onclick="App.nextQuestion()">Next →</button>
      </div>
    `;

    updateMCQStats();
    startTimer();
  }

  function selectOption(chosen, correct) {
    if (state.mcq.answered) return;
    state.mcq.answered = true;
    clearInterval(state.mcq.timerInterval);

    const elapsed = 90 - state.mcq.timerVal;
    state.mcq.session.times.push(elapsed);

    const isCorrect = chosen === correct;
    if (isCorrect) {
      state.mcq.session.correct++;
      state.progress.totalCorrect++;
    } else {
      state.mcq.session.wrong++;
      const q = state.mcq.pool[state.mcq.currentIndex % state.mcq.pool.length];
      if (!state.mcq.wrongAnswers.includes(q.id)) {
        state.mcq.wrongAnswers.push(q.id);
        localStorage.setItem('upsc_wrong', JSON.stringify(state.mcq.wrongAnswers));
      }
    }
    state.progress.totalAttempted++;
    localStorage.setItem('upsc_progress', JSON.stringify(state.progress));

    // Visual feedback
    document.querySelectorAll('.option').forEach((o, i) => {
      o.onclick = null;
      if (i === correct) o.classList.add('correct');
      else if (i === chosen && !isCorrect) o.classList.add('wrong');
    });

    document.getElementById('explanation').classList.add('show');
    updateMCQStats();
    updateHeaderStats();
  }

  function nextQuestion() {
    state.mcq.currentIndex = (state.mcq.currentIndex + 1) % state.mcq.pool.length;
    state.mcq.answered = false;
    state.mcq.timerVal = 90;
    clearInterval(state.mcq.timerInterval);
    renderMCQ();
  }

  function skipQuestion() {
    state.mcq.session.skipped++;
    nextQuestion();
  }

  function toggleBookmark(id) {
    const idx = state.mcq.bookmarks.indexOf(id);
    if (idx === -1) state.mcq.bookmarks.push(id);
    else state.mcq.bookmarks.splice(idx, 1);
    localStorage.setItem('upsc_bookmarks', JSON.stringify(state.mcq.bookmarks));
    const btn = document.getElementById('bookmarkBtn');
    if (btn) {
      btn.textContent = state.mcq.bookmarks.includes(id) ? '★ Saved' : '☆ Bookmark';
      btn.classList.toggle('btn-bookmarked', state.mcq.bookmarks.includes(id));
    }
  }

  function startTimer() {
    clearInterval(state.mcq.timerInterval);
    state.mcq.timerVal = 90;
    state.mcq.timerInterval = setInterval(() => {
      state.mcq.timerVal--;
      const el = document.getElementById('mcqTimer');
      if (el) {
        el.textContent = String(Math.floor(state.mcq.timerVal / 60)).padStart(2, '0') + ':' + String(state.mcq.timerVal % 60).padStart(2, '0');
        if (state.mcq.timerVal <= 10) el.style.color = 'var(--red)';
        else el.style.color = 'var(--saffron)';
      }
      if (state.mcq.timerVal <= 0) {
        clearInterval(state.mcq.timerInterval);
        if (!state.mcq.answered) skipQuestion();
      }
    }, 1000);
  }

  function updateMCQStats() {
    const { correct, wrong, skipped, times } = state.mcq.session;
    const total = correct + wrong;
    const acc = total > 0 ? Math.round((correct / total) * 100) : 0;
    const avgTime = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
    const m = Math.floor(avgTime / 60), s = avgTime % 60;
    const statEls = {
      'stat-correct': correct,
      'stat-wrong': wrong,
      'stat-acc': acc + '%',
      'stat-time': (m > 0 ? m + ':' : '') + String(s).padStart(2, '0') + (m === 0 ? 's' : '')
    };
    Object.entries(statEls).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  }

  function setMCQFilter(type, value) {
    if (type === 'subject') state.mcq.filterSubject = value;
    if (type === 'difficulty') state.mcq.filterDifficulty = value;
    document.querySelectorAll('.mcq-filter-' + type).forEach(b => b.classList.toggle('active', b.dataset.value === value));
    shuffleMCQPool();
    renderMCQ();
  }

  // ══════════════════════
  //  MAINS LAB
  // ══════════════════════
  function renderMainsQuestion(idx) {
    if (idx !== undefined) state.mains.currentQuestion = idx;
    const q = MAINS_QUESTIONS[state.mains.currentQuestion];
    if (!q) return;

    document.getElementById('mainsPromptLabel').textContent = `${q.paper} · ${q.topic} · ${q.marks} Marks · ${q.words} Words · ${q.time} min`;
    document.getElementById('mainsPromptText').textContent = q.question;

    // Structure guide
    document.getElementById('mainsStructure').innerHTML = q.structure.map(s => `
      <div class="structure-item">
        <div class="structure-num">${s.num}</div>
        <div><strong>${s.head}</strong><br><span style="font-size:0.74rem;color:#666">${s.detail}</span></div>
      </div>
    `).join('');

    // Keywords
    document.getElementById('mainsKeywords').innerHTML = q.keywords.map(k => `
      <span class="keyword-chip">${k}</span>
    `).join('');

    // Restore saved answer
    const saved = state.mains.answers[q.id] || '';
    const textarea = document.getElementById('mainsTextarea');
    if (textarea) {
      textarea.value = saved;
      updateWordCount(q.id, saved, q.words);
    }

    // Update question navigator
    document.querySelectorAll('.mains-q-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === state.mains.currentQuestion);
    });
  }

  function updateWordCount(qId, text, limit) {
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    state.mains.wordCounts[qId] = words;
    const el = document.getElementById('wordCounter');
    if (el) {
      el.textContent = words + ' / ' + limit + ' words';
      el.style.color = words > limit ? 'var(--red)' : words > limit * 0.9 ? 'var(--saffron)' : 'var(--dust)';
    }
  }

  function saveAnswer() {
    const q = MAINS_QUESTIONS[state.mains.currentQuestion];
    const textarea = document.getElementById('mainsTextarea');
    if (textarea && q) {
      state.mains.answers[q.id] = textarea.value;
      updateWordCount(q.id, textarea.value, q.words);
    }
  }

  function submitAnswer() {
    const q = MAINS_QUESTIONS[state.mains.currentQuestion];
    const textarea = document.getElementById('mainsTextarea');
    if (!textarea || !textarea.value.trim()) {
      alert('Please write your answer before submitting.');
      return;
    }
    // Show AI evaluation modal (simulated)
    const modal = document.getElementById('evalModal');
    document.getElementById('evalBody').innerHTML = `
      <div style="text-align:center;padding:2rem">
        <div style="font-family:var(--mono);font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--dust);margin-bottom:1rem">Analysing your answer...</div>
        <div class="eval-loading"></div>
      </div>
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Simulate AI response after delay
    setTimeout(() => {
      const words = textarea.value.trim().split(/\s+/).length;
      const hasKeywords = q.keywords.filter(k => textarea.value.toLowerCase().includes(k.toLowerCase()));
      const score = Math.min(10, 4 + hasKeywords.length + (words > 180 ? 1 : 0));
      document.getElementById('evalBody').innerHTML = `
        <div class="eval-score-row">
          <div class="eval-score">${score}<span style="font-size:1rem">/15</span></div>
          <div>
            <div style="font-family:var(--display);font-size:1.2rem;letter-spacing:0.08em">${score >= 10 ? 'Good Answer' : score >= 7 ? 'Average Answer' : 'Needs Improvement'}</div>
            <div style="font-family:var(--mono);font-size:0.6rem;color:var(--dust);margin-top:0.2rem">${words} words · ${q.words} target</div>
          </div>
        </div>
        <div class="eval-section">
          <div class="eval-section-title">✅ Keywords Used (${hasKeywords.length}/${q.keywords.length})</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem">
            ${q.keywords.map(k => `<span class="keyword-chip ${hasKeywords.includes(k) ? 'used' : 'missed'}">${hasKeywords.includes(k) ? '✓ ' : '✗ '}${k}</span>`).join('')}
          </div>
        </div>
        <div class="eval-section" style="margin-top:0.85rem">
          <div class="eval-section-title">💡 Suggestions</div>
          <ul class="modal-list">
            ${words < q.words * 0.7 ? '<li>Expand your answer — currently below 70% of target word count</li>' : ''}
            ${hasKeywords.length < 3 ? '<li>Include more subject-specific terminology and constitutional references</li>' : ''}
            <li>Ensure you have a clear introduction that defines the core concept</li>
            <li>Each body paragraph should have: point → explanation → example → link back to question</li>
            ${score < 8 ? '<li>Add contemporary examples and recent Supreme Court judgements</li>' : '<li>Good use of examples — consider adding comparative international perspective</li>'}
          </ul>
        </div>
        <div class="eval-section" style="margin-top:0.85rem">
          <div class="eval-section-title">📋 Model Answer Structure</div>
          ${q.structure.map(s => `<div class="structure-item"><div class="structure-num">${s.num}</div><div><strong>${s.head}</strong> — ${s.detail}</div></div>`).join('')}
        </div>
      `;
    }, 1800);
  }

  function closeEvalModal() {
    document.getElementById('evalModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ══════════════════════
  //  SYLLABUS MAP
  // ══════════════════════
  function mapTopic() {
    const val = document.getElementById('topicInput').value.trim().toLowerCase();
    const result = document.getElementById('syllabusResult');
    const topicEl = document.getElementById('mappedTopic');
    const cardsEl = document.getElementById('mappingCards');

    const mapped = SYLLABUS_MAP[val];
    const papers = mapped ? mapped.papers : ['GS I', 'GS II', 'GS III', 'Essay Paper'];
    const desc = mapped ? mapped.description : 'Check relevant GS papers for this topic';

    topicEl.textContent = document.getElementById('topicInput').value;
    const tagCols = ['tag-polity', 'tag-economy', 'tag-environment', 'tag-ir', 'tag-science', 'tag-polity'];
    cardsEl.innerHTML = papers.map((p, i) => `<span class="news-tag ${tagCols[i % tagCols.length]}">${p}</span>`).join('');

    const descEl = document.getElementById('mappingDesc');
    if (descEl) descEl.textContent = desc;
    result.style.display = 'block';
  }

  function initSearch() {
    const input = document.getElementById('topicInput');
    if (input) {
      input.addEventListener('keydown', e => { if (e.key === 'Enter') mapTopic(); });
      // Live suggestions
      input.addEventListener('input', () => {
        const val = input.value.toLowerCase();
        const suggestions = Object.keys(SYLLABUS_MAP).filter(k => k.startsWith(val)).slice(0, 5);
        const sg = document.getElementById('topicSuggestions');
        if (sg) {
          sg.innerHTML = suggestions.map(s => `<div class="suggestion" onclick="App.selectSuggestion('${s}')">${s}</div>`).join('');
          sg.style.display = suggestions.length && val ? 'block' : 'none';
        }
      });
    }
  }

  function selectSuggestion(val) {
    document.getElementById('topicInput').value = val;
    const sg = document.getElementById('topicSuggestions');
    if (sg) sg.style.display = 'none';
    mapTopic();
  }

  // ══════════════════════
  //  REVISION ENGINE
  // ══════════════════════
  function renderRevision() {
    const grid = document.getElementById('revisionGrid');
    if (!grid) return;
    const sorted = [...state.revision.topics].sort((a, b) => {
      const order = { overdue: 0, due: 1, fresh: 2 };
      return order[a.urgency] - order[b.urgency];
    });
    grid.innerHTML = sorted.map(t => `
      <div class="rev-card">
        <div class="rev-urgency urgency-${t.urgency}"></div>
        <div class="rev-topic">${t.topic}</div>
        <div class="rev-subject">${t.subject} · ${t.paper}</div>
        <div style="display:flex;gap:0.25rem;margin-bottom:0.3rem">
          ${[0, 7, 30, 90].map((_, i) => `
            <div class="rev-dot ${i < t.revisions.length ? 'dot-done' : i === t.revisions.length ? 'dot-today' : 'dot-future'}"></div>
          `).join('')}
        </div>
        <div class="rev-next" style="${t.urgency === 'overdue' ? 'color:var(--red)' : ''}">${t.urgency === 'overdue' ? '⚠ ' : ''}${t.nextRevision}</div>
        ${t.urgency !== 'fresh' ? `<button class="btn btn-primary" style="margin-top:0.6rem;font-size:0.55rem;padding:0.4rem 0.8rem" onclick="App.markRevised(${t.id})">Mark Revised ✓</button>` : ''}
      </div>
    `).join('');
  }

  function markRevised(id) {
    const topic = state.revision.topics.find(t => t.id === id);
    if (!topic) return;
    topic.revisions.push(topic.revisions.length * 7);
    topic.urgency = 'fresh';
    topic.nextRevision = 'Next in ' + ([7, 30, 90, 180][topic.revisions.length - 1] || 90) + ' days';
    renderRevision();
  }

  function addRevisionTopic() {
    const name = prompt('Enter topic name:');
    const subject = prompt('Enter subject (Polity/Economy/History/Geography/Environment/Governance):');
    if (!name || !subject) return;
    state.revision.topics.push({
      id: Date.now(), topic: name, subject, paper: 'GS',
      studied: new Date().toISOString().split('T')[0],
      revisions: [0], urgency: 'due', nextRevision: 'Due today · Day 1'
    });
    renderRevision();
  }

  // ══════════════════════
  //  SCHEMES TRACKER
  // ══════════════════════
  function renderSchemes(filter, search) {
    if (filter !== undefined) state.schemes.filter = filter;
    if (search !== undefined) state.schemes.search = search;

    const cat = state.schemes.filter;
    const q = state.schemes.search.toLowerCase();

    let data = cat === 'All' ? SCHEMES_DATA : SCHEMES_DATA.filter(s => s.category === cat);
    if (q) data = data.filter(s => s.name.toLowerCase().includes(q) || s.objective.toLowerCase().includes(q) || s.ministry.toLowerCase().includes(q));

    // Filter buttons
    document.querySelectorAll('.scheme-filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === (cat || 'All')));

    const tbody = document.getElementById('schemesBody');
    if (!tbody) return;
    tbody.innerHTML = data.map(s => `
      <tr>
        <td><div class="scheme-name">${s.name}</div><div class="scheme-ministry">Est. ${s.year}</div></td>
        <td style="font-size:0.76rem;min-width:110px">${s.ministry}</td>
        <td style="font-size:0.76rem">${s.objective}</td>
        <td style="font-size:0.76rem">${s.beneficiaries}</td>
        <td style="font-family:var(--mono);font-size:0.7rem;white-space:nowrap">${s.budget}</td>
        <td><span class="news-tag ${s.type === 'Central' ? 'tag-polity' : 'tag-economy'}" style="margin:0">${s.type}</span></td>
      </tr>
    `).join('');

    const count = document.getElementById('schemesCount');
    if (count) count.textContent = data.length + ' schemes';
  }

  // ══════════════════════
  //  ESSAY STUDIO
  // ══════════════════════
  function renderEssayStudio() {
    const container = document.getElementById('essayPrompts');
    if (!container) return;
    container.innerHTML = ESSAY_PROMPTS.map((e, i) => `
      <div class="essay-card" onclick="App.selectEssay(${i})">
        <div class="essay-category">${e.category}</div>
        <div class="essay-topic">${e.topic}</div>
        <div class="essay-hints">${e.hints.slice(0, 2).map(h => `<span class="hint-chip">${h}</span>`).join('')}</div>
      </div>
    `).join('');
  }

  function selectEssay(idx) {
    const essay = ESSAY_PROMPTS[idx];
    document.getElementById('essayTopicDisplay').textContent = essay.topic;
    document.getElementById('essayHints').innerHTML = essay.hints.map(h => `<span class="keyword-chip">${h}</span>`).join('');
    document.getElementById('essayPanel').style.display = 'block';
    document.getElementById('essayTextarea').value = '';
    document.getElementById('essayWordCount').textContent = '0 / 1000 words';
  }

  // ══════════════════════
  //  ANALYTICS CHARTS
  // ══════════════════════
  function renderAnalytics() {
    // Update AI recommendations dynamically
    const weakEl = document.getElementById('analyticsWeak');
    if (weakEl) {
      const subjectPcts = { 'Environment': 42, 'Medieval History': 44, 'Fiscal Policy': 51, 'Sci & Tech': 55, 'Ethics Cases': 58 };
      weakEl.innerHTML = Object.entries(subjectPcts).map(([s, p]) => `
        <div style="display:flex;justify-content:space-between;padding:0.3rem 0;border-bottom:1px dashed var(--dust-light)">
          <span style="font-size:0.8rem">${s}</span>
          <span style="font-family:var(--mono);font-size:0.62rem;color:${p < 50 ? 'var(--red)' : 'var(--saffron)'}">${p}%</span>
        </div>
      `).join('');
    }
  }

  // ══════════════════════
  //  DRAWER / MODAL
  // ══════════════════════
  function openDrawer() {
    document.getElementById('sidebarDrawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.getElementById('sidebarDrawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  // ══════════════════════
  //  CANVAS CHARTS
  // ══════════════════════
  function setupCanvas(id, h) {
    const c = document.getElementById(id);
    if (!c) return null;
    const w = Math.max(c.parentElement.clientWidth - 32, 80);
    c.width = w; c.height = h;
    c.style.width = '100%'; c.style.height = h + 'px';
    return c;
  }

  function drawForgettingCurve() {
    const c = setupCanvas('forgettingCurve', 110);
    if (!c) return;
    const ctx = c.getContext('2d'), W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#faf7f0'; ctx.fillRect(0, 0, W, H);

    const pad = 36, uW = W - pad - 8;
    ctx.strokeStyle = '#d4c4a8'; ctx.lineWidth = 0.5;
    for (let y = 16; y < H - 7; y += (H - 23) / 4) {
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W - 8, y); ctx.stroke();
    }

    // Without revision
    ctx.beginPath(); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.8; ctx.setLineDash([4, 3]);
    for (let px = 0; px <= uW; px++) {
      const t = px / uW * 30, y = H - 11 - (100 * Math.exp(-0.5 * t) / 100) * (H - 23);
      px ? ctx.lineTo(pad + px, y) : ctx.moveTo(pad + px, y);
    }
    ctx.stroke(); ctx.setLineDash([]);

    // With SRS
    const pts = [];
    for (let px = 0; px <= uW; px++) {
      const t = px / uW * 30;
      let r = 100 * Math.exp(-0.3 * t);
      [0, 7, 30].forEach(rv => { if (t > rv && t <= rv + 3) r = Math.min(100, r + 30); });
      pts.push({ x: pad + px, y: H - 11 - (Math.min(r, 100) / 100) * (H - 23) });
    }
    ctx.beginPath(); ctx.strokeStyle = '#1a6b3c'; ctx.lineWidth = 2;
    pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke();

    [1, 7, 30].forEach(d => {
      const px = (d / 30) * uW;
      ctx.beginPath(); ctx.arc(pad + px, H - 11 - 0.70 * (H - 23), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#e8760a'; ctx.fill();
    });
    ctx.fillStyle = '#a89070'; ctx.font = '9px JetBrains Mono,monospace';
    ctx.fillText('D1', pad, H - 1); ctx.fillText('D7', pad + (7 / 30) * uW - 6, H - 1); ctx.fillText('D30', W - 30, H - 1);
  }

  function drawAccuracyChart() {
    const c = setupCanvas('accuracyChart', 155);
    if (!c) return;
    const ctx = c.getContext('2d'), W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#faf7f0'; ctx.fillRect(0, 0, W, H);
    const data = [62, 58, 65, 70, 68, 72, 69, 74, 71, 75, 73, 78, 75, 72, 76, 79, 77, 80, 78, 82, 79, 83, 80, 75, 78, 82, 80, 83, 81, 85];
    const pl = 28, pr = 8, pt = 8, pb = 18, cW = W - pl - pr, cH = H - pt - pb;
    ctx.strokeStyle = '#d4c4a8'; ctx.lineWidth = 0.5;
    [60, 70, 80, 90].forEach(v => {
      const y = pt + cH - ((v - 50) / 50) * cH;
      ctx.beginPath(); ctx.moveTo(pl, y); ctx.lineTo(pl + cW, y); ctx.stroke();
      ctx.fillStyle = '#a89070'; ctx.font = '9px JetBrains Mono,monospace'; ctx.fillText(v + '%', 0, y + 3);
    });
    ctx.beginPath();
    data.forEach((v, i) => { const x = pl + (i / (data.length - 1)) * cW, y = pt + cH - ((v - 50) / 50) * cH; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.lineTo(pl + cW, pt + cH); ctx.lineTo(pl, pt + cH); ctx.closePath(); ctx.fillStyle = 'rgba(232,118,10,0.12)'; ctx.fill();
    ctx.beginPath(); ctx.strokeStyle = '#e8760a'; ctx.lineWidth = 2;
    data.forEach((v, i) => { const x = pl + (i / (data.length - 1)) * cW, y = pt + cH - ((v - 50) / 50) * cH; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
  }

  function drawRadarChart() {
    const c = setupCanvas('radarChart', 175);
    if (!c) return;
    const ctx = c.getContext('2d'), W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = '#faf7f0'; ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2 + 5, R = Math.min(W, H) / 2 - 30;
    const subjects = ['Polity', 'Economy', 'History', 'Geography', 'Env.', 'Sci&Tech'];
    const scores = [0.84, 0.61, 0.78, 0.70, 0.42, 0.55], N = subjects.length;
    [0.25, 0.5, 0.75, 1].forEach(r => {
      ctx.beginPath(); ctx.strokeStyle = '#d4c4a8'; ctx.lineWidth = 0.5;
      for (let i = 0; i <= N; i++) { const a = (i / N) * Math.PI * 2 - Math.PI / 2; i ? ctx.lineTo(cx + Math.cos(a) * R * r, cy + Math.sin(a) * R * r) : ctx.moveTo(cx + Math.cos(a) * R * r, cy + Math.sin(a) * R * r); }
      ctx.closePath(); ctx.stroke();
    });
    for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2 - Math.PI / 2; ctx.beginPath(); ctx.strokeStyle = '#d4c4a8'; ctx.lineWidth = 0.5; ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
    ctx.beginPath();
    scores.forEach((s, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2; i ? ctx.lineTo(cx + Math.cos(a) * R * s, cy + Math.sin(a) * R * s) : ctx.moveTo(cx + Math.cos(a) * R * s, cy + Math.sin(a) * R * s); });
    ctx.closePath(); ctx.fillStyle = 'rgba(26,107,60,0.15)'; ctx.fill(); ctx.strokeStyle = '#1a6b3c'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#0d0d0d'; ctx.font = 'bold 8.5px JetBrains Mono,monospace';
    subjects.forEach((s, i) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2, x = cx + Math.cos(a) * (R + 16), y = cy + Math.sin(a) * (R + 16); ctx.textAlign = Math.cos(a) > 0.1 ? 'left' : Math.cos(a) < -0.1 ? 'right' : 'center'; ctx.fillText(s, x, y + 3); });
  }

  // Resize redraw
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const id = document.querySelector('.panel.active')?.id;
      if (id === 'panel-revision') drawForgettingCurve();
      if (id === 'panel-analytics') { drawAccuracyChart(); drawRadarChart(); }
    }, 150);
  });

  // Public API
  return {
    init, switchPanel, openDrawer, closeDrawer,
    expandNews, closeNewsModal,
    renderFeed,
    selectOption, nextQuestion, skipQuestion, toggleBookmark, setMCQFilter,
    renderMainsQuestion, saveAnswer, submitAnswer, closeEvalModal,
    mapTopic, selectSuggestion,
    markRevised, addRevisionTopic,
    renderSchemes,
    selectEssay,
    drawForgettingCurve, drawAccuracyChart, drawRadarChart
  };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
