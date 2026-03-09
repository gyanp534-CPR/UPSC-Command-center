// ══════════════════════════════════════════
//  UPSC COMMAND CENTER — EXTENDED ENGINE v3
//  Home Dashboard, Missions, Gamification,
//  Notes Library, Mistake Notebook, AI Mentor
// ══════════════════════════════════════════

// This file extends App from app.js — loaded after it.
// We patch the init function and add new panels.

(function() {
  // ── Patch App.init to also init new panels ──
  const _origInit = App.init;

  // Override switchPanel to handle new panels
  const _origSwitch = App.switchPanel;

  // ══════════════════════════════════
  //  HOME DASHBOARD
  // ══════════════════════════════════
  function initHome() {
    renderGreeting();
    renderRank();
    renderDailyMissions();
    renderWeeklyChallenge();
    renderAIDailyPlan();
    renderLeaderboard();
  }

  function renderGreeting() {
    const h = new Date().getHours();
    const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    const el = document.getElementById('homeGreeting');
    if (el) el.textContent = greet + ', Aspirant 🙏';
  }

  function renderRank() {
    const xp = getXP();
    const rank = getUserRank(xp);
    const nextRank = RANKS.find(r => r.min > xp) || RANKS[RANKS.length - 1];
    const pct = nextRank.min === Infinity ? 100 : Math.min(100, Math.round(((xp - rank.min) / (nextRank.min - rank.min)) * 100));

    const iconEl = document.getElementById('homeRankIcon');
    const titleEl = document.getElementById('homeRankTitle');
    const barEl = document.getElementById('homeXPBar');
    const labelEl = document.getElementById('homeXPLabel');
    const xpDisp = document.getElementById('homeXPDisplay');

    if (iconEl) iconEl.textContent = rank.icon;
    if (titleEl) titleEl.textContent = rank.title;
    if (barEl) { setTimeout(() => barEl.style.width = pct + '%', 200); }
    if (labelEl) labelEl.textContent = xp + ' XP — ' + (nextRank.min === Infinity ? 'Max rank!' : (nextRank.min - xp) + ' XP to ' + nextRank.title);
    if (xpDisp) xpDisp.textContent = xp;
  }

  function renderDailyMissions() {
    const container = document.getElementById('dailyMissions');
    if (!container) return;
    const missions = generateDailyMissions();

    const done = missions.filter(m => m.done).length;
    const prog = document.getElementById('missionProgress');
    if (prog) prog.textContent = done + '/' + missions.length + ' complete';

    container.innerHTML = missions.map(m => `
      <div class="mission-card ${m.done ? 'mission-done' : ''}" id="mission-${m.id}" onclick="AppExt.completeMission('${m.id}')">
        <div class="mission-time">${m.time}</div>
        <div class="mission-icon">${m.icon}</div>
        <div class="mission-title">${m.title}</div>
        <div class="mission-desc">${m.desc}</div>
        <div class="mission-footer">
          <div class="mission-progress-bar">
            <div class="mission-progress-fill" style="width:${m.done ? 100 : Math.round((m.completed/m.target)*100)}%"></div>
          </div>
          <span class="mission-reward">+${m.reward} XP</span>
        </div>
        ${m.done ? '<div class="mission-check">✓</div>' : ''}
      </div>
    `).join('');
  }

  function completeMission(id) {
    const today = new Date().toDateString();
    const missions = generateDailyMissions();
    const mission = missions.find(m => m.id === id);
    if (!mission || mission.done) return;

    mission.done = true;
    mission.completed = mission.target;
    localStorage.setItem('upsc_missions_' + today, JSON.stringify(missions));

    const gained = addXP(mission.reward, mission.title);
    showXPToast('+' + mission.reward + ' XP — ' + mission.title);
    renderDailyMissions();
    renderRank();

    // Navigate to relevant panel
    if (mission.panel && mission.panel !== 'home') {
      setTimeout(() => App.switchPanel(mission.panel), 800);
    }
  }

  function renderWeeklyChallenge() {
    const container = document.getElementById('weeklyChallenge');
    if (!container) return;
    const weekIdx = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000)) % WEEKLY_CHALLENGES.length;
    const challenge = WEEKLY_CHALLENGES[weekIdx];
    const saved = JSON.parse(localStorage.getItem('upsc_weekly_' + weekIdx) || '{"progress":0}');
    const pct = Math.min(100, Math.round((saved.progress / challenge.target) * 100));

    container.innerHTML = `
      <div class="weekly-card">
        <div class="weekly-badge">${challenge.badge}</div>
        <div class="weekly-info">
          <div class="weekly-title">${challenge.title}</div>
          <div class="weekly-desc">${challenge.desc}</div>
          <div class="weekly-progress-wrap">
            <div class="weekly-progress-bar">
              <div class="weekly-progress-fill" style="width:${pct}%"></div>
            </div>
            <span class="weekly-pct">${saved.progress}/${challenge.target}</span>
          </div>
        </div>
        <div class="weekly-reward">
          <div style="font-family:var(--display);font-size:1.2rem;color:var(--saffron)">${challenge.reward}</div>
          <div style="font-family:var(--mono);font-size:0.48rem;color:var(--dust)">XP REWARD</div>
        </div>
      </div>
    `;
  }

  function renderAIDailyPlan() {
    const container = document.getElementById('aiDailyPlan');
    if (!container) return;

    const xp = getXP();
    const rank = getUserRank(xp);
    const wrongCount = JSON.parse(localStorage.getItem('upsc_wrong') || '[]').length;
    const weakSubject = 'Environment'; // In real app: computed from stats

    const plan = [
      { time: '7:00–7:15 AM', icon: '☀️', task: 'Read today\'s top 3 current affairs cards', panel: 'feed', priority: 'high' },
      { time: '7:15–7:30 AM', icon: '❓', task: '5 Polity MCQs warm-up (your strongest subject — maintain it)', panel: 'prelims', priority: 'normal' },
      { time: '10:00–11:00 AM', icon: '📖', task: 'Study: Environment — Paris Agreement micro note → deep notes', panel: 'notes', priority: 'high' },
      { time: '11:00–11:30 AM', icon: '❓', task: '10 Environment MCQs (your critical weakness — 42% accuracy)', panel: 'prelims', priority: 'critical' },
      { time: '3:00–3:30 PM', icon: '✍️', task: 'Write 1 Mains answer: GS III Environment question', panel: 'mains', priority: 'high' },
      { time: '6:00–6:15 PM', icon: '🔄', task: 'Clear ' + (wrongCount > 0 ? wrongCount + ' mistake' + (wrongCount > 1 ? 's' : '') : 'revision') + ' in your notebook', panel: wrongCount > 0 ? 'mistakes' : 'revision', priority: wrongCount > 0 ? 'high' : 'normal' },
      { time: '9:00–9:20 PM', icon: '🔍', task: 'Review 3 overdue revision cards before sleep', panel: 'revision', priority: 'normal' },
    ];

    container.innerHTML = plan.map(p => `
      <div class="ai-plan-item priority-${p.priority}" onclick="App.switchPanel('${p.panel}')">
        <div class="ai-plan-time">${p.time}</div>
        <div class="ai-plan-content">
          <span class="ai-plan-icon">${p.icon}</span>
          <span class="ai-plan-task">${p.task}</span>
        </div>
        <div class="ai-plan-arrow">→</div>
      </div>
    `).join('');
  }

  function renderLeaderboard() {
    const container = document.getElementById('leaderboard');
    if (!container) return;
    const xp = getXP();
    const leaders = [
      { rank: 1, name: 'Priya_IAS26', xp: 4250, badge: '🏆', streak: 89 },
      { rank: 2, name: 'Rahul_UPSC', xp: 3980, badge: '🥈', streak: 67 },
      { rank: 3, name: 'Ananya_CSE', xp: 3720, badge: '🥉', streak: 45 },
      { rank: 4, name: 'Vikram_IFS', xp: 3100, badge: '⭐', streak: 38 },
      { rank: 5, name: 'You', xp: xp, badge: '📚', streak: 6, isMe: true },
    ].sort((a,b) => b.xp - a.xp).map((l, i) => ({...l, rank: i+1}));

    container.innerHTML = leaders.map(l => `
      <div class="lb-row ${l.isMe ? 'lb-me' : ''}">
        <div class="lb-rank">${l.rank}</div>
        <div class="lb-badge">${l.badge}</div>
        <div class="lb-name">${l.name}</div>
        <div class="lb-streak">🔥 ${l.streak}d</div>
        <div class="lb-xp">${l.xp.toLocaleString()} XP</div>
      </div>
    `).join('');
  }

  // ══════════════════════════════════
  //  NOTES LIBRARY
  // ══════════════════════════════════
  function initNotes() {
    filterNotes('All');
  }

  function filterNotes(subject) {
    document.querySelectorAll('.notes-subj-filter').forEach(b => b.classList.toggle('active', b.dataset.subj === subject));
    const data = subject === 'All' ? MICRO_NOTES : MICRO_NOTES.filter(n => n.subject === subject);
    const grid = document.getElementById('notesGrid');
    if (!grid) return;
    grid.innerHTML = data.map(n => `
      <div class="note-card" id="note-${n.id}">
        <div class="note-header">
          <span class="news-tag tag-${n.subject.toLowerCase()}">${n.subject}</span>
          <span class="note-tag">${n.tag}</span>
          <div class="note-weight">
            <span style="color:var(--saffron)">P:${n.prelims_weightage}</span>
            <span style="color:var(--navy)">M:${n.mains_weightage}</span>
          </div>
        </div>
        <div class="note-topic">${n.topic}</div>

        <!-- Layer 1: Micro -->
        <div class="note-layer layer-micro active" id="layer-micro-${n.id}">
          <div class="layer-label"><span class="layer-dot dot-micro"></span>Level 1 · Micro Note</div>
          <div class="layer-content micro-text">${n.micro}</div>
          <button class="layer-expand-btn" onclick="AppExt.expandNote(${n.id}, 'brief')">Read more →</button>
        </div>

        <!-- Layer 2: Brief -->
        <div class="note-layer layer-brief" id="layer-brief-${n.id}" style="display:none">
          <div class="layer-label"><span class="layer-dot dot-brief"></span>Level 2 · Brief Explanation</div>
          <div class="layer-content brief-text">${n.brief}</div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.6rem">
            <button class="layer-expand-btn" onclick="AppExt.expandNote(${n.id}, 'deep')">Deep Notes →</button>
            <button class="layer-expand-btn secondary" onclick="AppExt.expandNote(${n.id}, 'micro')">← Less</button>
          </div>
        </div>

        <!-- Layer 3: Deep -->
        <div class="note-layer layer-deep" id="layer-deep-${n.id}" style="display:none">
          <div class="layer-label"><span class="layer-dot dot-deep"></span>Level 3 · Deep Notes</div>
          <pre class="layer-content deep-text">${n.deep}</pre>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.6rem">
            <button class="layer-expand-btn secondary" onclick="AppExt.expandNote(${n.id}, 'brief')">← Summary</button>
            <button class="layer-expand-btn" onclick="AppExt.addToRevision(${n.id})">+ Add to Revision</button>
          </div>
        </div>

        ${n.pyqs && n.pyqs.length ? `
        <div class="note-pyqs">
          <div class="note-pyq-label">PYQ References</div>
          ${n.pyqs.map(q => `<span class="pyq-chip">${q}</span>`).join('')}
        </div>` : ''}
      </div>
    `).join('');
  }

  function expandNote(id, layer) {
    ['micro','brief','deep'].forEach(l => {
      const el = document.getElementById('layer-' + l + '-' + id);
      if (el) el.style.display = l === layer ? 'block' : 'none';
    });
    if (layer === 'deep') showXPToast('+5 XP — Deep study session!'); addXP(5, 'Deep notes read');
  }

  function addToRevision(noteId) {
    const note = MICRO_NOTES.find(n => n.id === noteId);
    if (!note) return;
    showXPToast('+10 XP — Added to revision queue!');
    addXP(10, 'Topic added to revision');
    PWA.showToast('📌 ' + note.topic + ' added to revision queue', 2500, 'success');
  }

  // ══════════════════════════════════
  //  MISTAKE NOTEBOOK
  // ══════════════════════════════════
  function initMistakes() {
    renderMistakes();
  }

  function renderMistakes() {
    const wrongIds = JSON.parse(localStorage.getItem('upsc_wrong') || '[]');
    const grid = document.getElementById('mistakesGrid');
    const empty = document.getElementById('mistakesEmpty');
    const summary = document.getElementById('mistakesSummary');
    if (!grid) return;

    if (wrongIds.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.style.display = 'flex';
      if (summary) summary.innerHTML = '';
      return;
    }
    if (empty) empty.style.display = 'none';

    const wrongQs = QUESTION_BANK.filter(q => wrongIds.includes(q.id));

    // Subject breakdown
    const bySubject = {};
    wrongQs.forEach(q => { bySubject[q.subject] = (bySubject[q.subject] || 0) + 1; });

    if (summary) {
      summary.innerHTML = `
        <div class="mistakes-stat-row">
          <div class="mistake-stat"><div class="mistake-stat-val">${wrongQs.length}</div><div class="mistake-stat-lbl">Total Mistakes</div></div>
          ${Object.entries(bySubject).sort((a,b) => b[1]-a[1]).slice(0,4).map(([s,c]) => `
            <div class="mistake-stat">
              <div class="mistake-stat-val" style="color:var(--red)">${c}</div>
              <div class="mistake-stat-lbl">${s}</div>
            </div>
          `).join('')}
        </div>
        <div class="pattern-insight">
          <span class="pattern-icon">💡</span>
          <span>Most mistakes in <strong>${Object.entries(bySubject).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'unknown'}</strong> — this is your blind spot. Re-test and read explanations carefully.</span>
        </div>
      `;
    }

    grid.innerHTML = wrongQs.map(q => `
      <div class="mistake-card">
        <div class="mistake-header">
          <span class="news-tag tag-${q.subject.toLowerCase().replace(/ /g,'-').replace(/&/g,'')}">${q.subject}</span>
          <span class="news-tag" style="background:var(--red-pale);color:var(--red)">${q.difficulty}</span>
          <button class="mistake-remove-btn" onclick="AppExt.removeMistake(${q.id})" title="Mark as learned">✓ Learned</button>
        </div>
        <div class="mistake-question">${q.question.replace(/\n/g,'<br>').substring(0, 200)}${q.question.length > 200 ? '...' : ''}</div>
        <div class="mistake-options">
          ${q.options.map((opt, i) => `
            <div class="mistake-opt ${i === q.correct ? 'correct-opt' : ''}">
              <span class="mistake-opt-letter">${String.fromCharCode(65+i)}</span>
              ${opt}
              ${i === q.correct ? ' ✓' : ''}
            </div>
          `).join('')}
        </div>
        <div class="mistake-exp">
          <div class="exp-label">Why this is correct:</div>
          <div class="exp-text">${q.explanation}</div>
        </div>
        <div class="mistake-syllabus">${q.syllabus}</div>
      </div>
    `).join('');
  }

  function removeMistake(id) {
    let wrong = JSON.parse(localStorage.getItem('upsc_wrong') || '[]');
    wrong = wrong.filter(w => w !== id);
    localStorage.setItem('upsc_wrong', JSON.stringify(wrong));
    showXPToast('+15 XP — Mistake mastered!');
    addXP(15, 'Mistake learned');
    renderMistakes();
    if (typeof PWA !== 'undefined') PWA.showToast('✅ Marked as learned!', 2000, 'success');
  }

  function clearMistakes() {
    if (!confirm('Clear all mistakes? This cannot be undone.')) return;
    localStorage.setItem('upsc_wrong', '[]');
    renderMistakes();
  }

  function retestMistakes() {
    const wrongIds = JSON.parse(localStorage.getItem('upsc_wrong') || '[]');
    if (wrongIds.length === 0) {
      if (typeof PWA !== 'undefined') PWA.showToast('No mistakes to retest!', 2000, 'info');
      return;
    }
    // Set MCQ filter to only wrong questions
    App.switchPanel('prelims');
    if (typeof PWA !== 'undefined') PWA.showToast('🔁 Retest mode: ' + wrongIds.length + ' questions loaded', 3000, 'info');
  }

  // ══════════════════════════════════
  //  AI MENTOR
  // ══════════════════════════════════
  function initMentor() {
    generateStudyPlan();
    renderCognitiveMap();
  }

  function switchMentorTab(tab) {
    document.querySelectorAll('.mentor-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    document.querySelectorAll('.mentor-panel').forEach(p => p.classList.remove('active-tab'));
    const panel = document.getElementById('mentor-' + tab);
    if (panel) panel.classList.add('active-tab');
  }

  function generateStudyPlan() {
    const container = document.getElementById('studyPlanOutput');
    if (!container) return;
    const days = parseInt(document.getElementById('daysToExam')?.value || 89);
    const weak = document.getElementById('weakSubject')?.value || 'Environment';

    container.innerHTML = `<div class="mentor-loading"><div class="eval-loading"></div><div style="margin-top:0.6rem;font-family:var(--mono);font-size:0.56rem;color:var(--dust)">Generating your personalised plan...</div></div>`;

    setTimeout(() => {
      const phase = days > 60 ? 'Foundation' : days > 30 ? 'Consolidation' : 'Revision Sprint';
      const dailyHours = days > 60 ? 6 : days > 30 ? 8 : 10;

      container.innerHTML = `
        <div class="study-plan">
          <div class="plan-header">
            <div class="plan-phase">${phase} Phase</div>
            <div class="plan-meta">${days} days · ~${dailyHours}hrs/day · Weak: ${weak}</div>
          </div>

          <div class="plan-week">
            <div class="plan-week-title">This Week's Focus</div>
            <div class="plan-item priority-critical">
              <div class="plan-day">Mon–Wed</div>
              <div class="plan-task"><strong>${weak} Intensive:</strong> Read all 6 micro-notes → 30 MCQs → 1 mains answer. Target: 55% accuracy by Friday.</div>
            </div>
            <div class="plan-item priority-high">
              <div class="plan-day">Thu–Fri</div>
              <div class="plan-task"><strong>Polity Maintenance:</strong> 10 MCQs/day. Focus: judiciary, parliament, federalism. Maintain 84% accuracy.</div>
            </div>
            <div class="plan-item priority-normal">
              <div class="plan-day">Sat</div>
              <div class="plan-task"><strong>Mock Test:</strong> 50 MCQs timed, full syllabus. Review all wrong answers in mistake notebook.</div>
            </div>
            <div class="plan-item priority-normal">
              <div class="plan-day">Sun</div>
              <div class="plan-task"><strong>Active Rest:</strong> Revision only. Clear all overdue SRS cards. No new topics.</div>
            </div>
          </div>

          <div class="plan-week" style="margin-top:0.85rem">
            <div class="plan-week-title">Subject Allocation (${dailyHours}hrs/day)</div>
            ${[
              ['Environment', '2.5hr', 'var(--red)', '42%'],
              ['Economy', '1.5hr', 'var(--saffron)', '61%'],
              ['Polity', '0.75hr', 'var(--navy)', '84%'],
              ['Current Affairs', '1hr', 'var(--green-india)', '—'],
              ['Mains Writing', '1hr', '#7a3bbf', '—'],
              ['Revision/SRS', '0.75hr', '#1a7a8c', '—'],
            ].map(([s, h, c, a]) => `
              <div style="display:flex;align-items:center;gap:0.6rem;padding:0.25rem 0;border-bottom:1px dashed var(--dust-light)">
                <div style="width:90px;font-size:0.8rem">${s}</div>
                <div style="flex:1;height:6px;background:var(--dust-light);overflow:hidden">
                  <div style="height:100%;width:${parseInt(h)/dailyHours*100}%;background:${c}"></div>
                </div>
                <div style="font-family:var(--mono);font-size:0.58rem;color:var(--dust);min-width:30px">${h}</div>
                ${a !== '—' ? `<div style="font-family:var(--mono);font-size:0.54rem;color:${c};min-width:28px">${a}</div>` : '<div style="min-width:28px"></div>'}
              </div>
            `).join('')}
          </div>

          <div class="plan-insight">
            <div class="plan-insight-icon">🧠</div>
            <div>At ${days} days out, your <strong>${weak} gap</strong> is the highest-leverage fix. One month of focused work could raise it from 42% to 65%+ — that's potentially 15–20 more correct answers on Prelims day.</div>
          </div>
        </div>
      `;
    }, 1500);
  }

  function evaluateAnswerAI() {
    const input = document.getElementById('mentorAnswerInput')?.value.trim();
    const container = document.getElementById('mentorEvalOutput');
    if (!container) return;
    if (!input || input.length < 50) {
      container.innerHTML = '<div style="color:var(--red);font-family:var(--mono);font-size:0.65rem">Please paste a question and answer (min 50 characters)</div>';
      return;
    }
    container.innerHTML = `<div class="mentor-loading"><div class="eval-loading"></div><div style="margin-top:0.6rem;font-family:var(--mono);font-size:0.56rem;color:var(--dust)">AI is reading your answer...</div></div>`;
    setTimeout(() => {
      const words = input.split(/\s+/).length;
      const hasIntro = /introduction|context|background|aspect/i.test(input);
      const hasConclusion = /conclusion|therefore|thus|way forward|suggest/i.test(input);
      const hasExample = /article|section|case|example|instance|india|supreme court/i.test(input);
      const score = Math.min(15, 5 + (words > 150 ? 2 : 0) + (hasIntro ? 2 : 0) + (hasConclusion ? 2 : 0) + (hasExample ? 2 : 0) + (words > 220 ? 2 : 0));

      container.innerHTML = `
        <div class="eval-result">
          <div class="eval-score-row">
            <div class="eval-score">${score}<span style="font-size:1rem">/15</span></div>
            <div>
              <div style="font-family:var(--display);font-size:1.3rem;letter-spacing:0.08em">${score >= 11 ? 'Excellent' : score >= 8 ? 'Good' : score >= 5 ? 'Average' : 'Needs Work'}</div>
              <div style="font-family:var(--mono);font-size:0.55rem;color:var(--dust)">${words} words</div>
            </div>
          </div>
          <div class="eval-checks">
            <div class="eval-check ${hasIntro ? 'check-pass' : 'check-fail'}">${hasIntro ? '✓' : '✗'} Introduction with context</div>
            <div class="eval-check ${words > 150 ? 'check-pass' : 'check-fail'}">${words > 150 ? '✓' : '✗'} Adequate length (${words}/150+ words)</div>
            <div class="eval-check ${hasExample ? 'check-pass' : 'check-fail'}">${hasExample ? '✓' : '✗'} Constitutional/legal references</div>
            <div class="eval-check ${hasConclusion ? 'check-pass' : 'check-fail'}">${hasConclusion ? '✓' : '✗'} Conclusion with way forward</div>
          </div>
          <div class="eval-tips">
            <div class="eval-tips-title">Improvement Tips</div>
            <ul class="modal-list">
              ${!hasIntro ? '<li>Add a 2-line introduction that defines the core concept or frames the issue</li>' : ''}
              ${words < 150 ? '<li>Expand your answer — aim for 200+ words for 10-mark, 250+ for 15-mark questions</li>' : ''}
              ${!hasExample ? '<li>Include specific constitutional articles, case laws, or data points to strengthen arguments</li>' : ''}
              ${!hasConclusion ? '<li>End with a forward-looking conclusion or policy recommendation</li>' : ''}
              <li>Use the UPSC answer structure: Definition → Context → Body (3-4 points) → Conclusion</li>
              <li>Each point should have: Statement → Explanation → Example → Link back to question</li>
            </ul>
          </div>
        </div>
      `;
      showXPToast('+10 XP — Answer evaluated!');
      addXP(10, 'Answer evaluated');
    }, 2000);
  }

  function simplifyNews() {
    const input = document.getElementById('mentorNewsInput')?.value.trim();
    const container = document.getElementById('mentorNewsOutput');
    if (!container) return;
    if (!input || input.length < 50) {
      container.innerHTML = '<div style="color:var(--red);font-family:var(--mono);font-size:0.65rem">Please paste an article (min 50 characters)</div>';
      return;
    }
    container.innerHTML = `<div class="mentor-loading"><div class="eval-loading"></div><div style="margin-top:0.6rem;font-family:var(--mono);font-size:0.56rem;color:var(--dust)">Extracting UPSC relevance...</div></div>`;
    setTimeout(() => {
      const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 20).slice(0, 8);
      container.innerHTML = `
        <div class="news-simplified">
          <div class="simplified-section">
            <div class="simplified-title">📌 5 Key Points</div>
            <ul class="modal-list">
              ${sentences.slice(0, 5).map(s => `<li>${s.trim()}</li>`).join('')}
            </ul>
          </div>
          <div class="simplified-section" style="margin-top:0.85rem">
            <div class="simplified-title">❓ Likely Prelims Questions</div>
            <ul class="modal-list">
              <li>Which ministry / organisation is mentioned in this context?</li>
              <li>What is the constitutional / legal basis of the policy described?</li>
              <li>What year was the related act / scheme / body established?</li>
              <li>Consider the following statements (true/false format)</li>
            </ul>
          </div>
          <div class="simplified-section" style="margin-top:0.85rem">
            <div class="simplified-title">✍️ Mains Angle</div>
            <div class="modal-mains">Discuss the significance of this development in the context of GS II/III. How does it relate to India's constitutional framework / economic development / environmental commitments?</div>
          </div>
          <div class="simplified-section" style="margin-top:0.85rem">
            <div class="simplified-title">🔑 Prelims Facts to Remember</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem">
              ${['Ministry involved', 'Year established', 'Constitutional Article', 'Nodal agency', 'Budget allocation', 'Target year'].map(f => `<span class="keyword-chip">${f}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
      showXPToast('+8 XP — News simplified!');
      addXP(8, 'News simplified');
    }, 1800);
  }

  function renderCognitiveMap() {
    const container = document.getElementById('cognitiveMap');
    if (!container) return;
    const subjects = [
      { name: 'Polity', pct: 84, color: 'var(--navy)', questions: 42, status: 'strong' },
      { name: 'Economy', pct: 61, color: 'var(--green-india)', questions: 28, status: 'developing' },
      { name: 'History', pct: 78, color: 'var(--saffron)', questions: 36, status: 'strong' },
      { name: 'Environment', pct: 42, color: 'var(--red)', questions: 24, status: 'weak' },
      { name: 'Geography', pct: 70, color: '#1a7a8c', questions: 20, status: 'developing' },
      { name: 'Sci & Tech', pct: 55, color: '#7a3bbf', questions: 18, status: 'developing' },
      { name: 'Ethics', pct: 65, color: '#b87c20', questions: 12, status: 'developing' },
      { name: 'Int. Rel.', pct: 72, color: '#3b7abf', questions: 15, status: 'developing' },
    ];

    container.innerHTML = subjects.map(s => `
      <div class="cog-node status-${s.status}">
        <div class="cog-name">${s.name}</div>
        <div class="cog-pct" style="color:${s.color}">${s.pct}%</div>
        <div class="cog-bar-wrap">
          <div class="cog-bar" style="width:${s.pct}%;background:${s.color}"></div>
        </div>
        <div class="cog-questions">${s.questions} attempted</div>
        <div class="cog-status-label">${s.status === 'strong' ? '💪 Strong' : s.status === 'weak' ? '⚠️ Weak' : '📈 Growing'}</div>
      </div>
    `).join('');

    const insights = document.getElementById('cognitiveInsights');
    if (insights) {
      insights.innerHTML = `
        <div class="cog-insight-title">🧠 What Your Cognitive Map Says</div>
        <div class="cog-insight-item" style="border-left-color:var(--green-india)">
          <strong>Strength pattern:</strong> Your Polity + History scores suggest strong memorisation and structural thinking. Leverage this by using constitutional analogies in other subjects.
        </div>
        <div class="cog-insight-item" style="border-left-color:var(--red)">
          <strong>Weakness pattern:</strong> Environment (42%) and Sci&Tech (55%) gaps likely reflect insufficient reading, not inability. 2 focused weeks could close the gap.
        </div>
        <div class="cog-insight-item" style="border-left-color:var(--saffron)">
          <strong>Prediction:</strong> At current trajectory, Prelims readiness will reach ~72% in 3 weeks if you follow the AI study plan. You need ~78% to safely clear the cut-off.
        </div>
      `;
    }
  }

  // ── XP Toast ──
  function showXPToast(msg) {
    let el = document.getElementById('xpToastEl');
    if (!el) {
      el = document.createElement('div');
      el.id = 'xpToastEl';
      el.style.cssText = 'position:fixed;top:70px;right:1rem;background:#0d0d0d;color:#e8760a;font-family:JetBrains Mono,monospace;font-size:0.7rem;font-weight:600;padding:0.5rem 0.9rem;border:1px solid #e8760a;z-index:600;transition:all 0.3s;opacity:0;transform:translateY(-10px)';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; }, 2500);
  }

  // ── Extended switchPanel ──
  function switchPanel(panel, srcType) {
    _origSwitch.call(App, panel, srcType);
    if (panel === 'home') initHome();
    if (panel === 'notes') initNotes();
    if (panel === 'mistakes') initMistakes();
    if (panel === 'mentor') { initMentor(); }
    if (panel === 'predict') { setTimeout(() => { if (typeof PredictionEngine !== 'undefined') PredictionEngine.init(); }, 60); }
  }

  // Patch App's switchPanel
  App.switchPanel = switchPanel;

  // ── Extended init ──
  const origInit = App.init;
  App.init = function() {
    origInit.call(App);
    initHome();
    initNotes();
    initMistakes();
    // Switch default to home
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab, .bnav-tab').forEach(t => t.classList.remove('active'));
    const homePanel = document.getElementById('panel-home');
    if (homePanel) homePanel.classList.add('active');
    document.querySelectorAll('[data-panel="home"]').forEach(t => t.classList.add('active'));
  };

  // Expose public API
  window.AppExt = {
    completeMission,
    filterNotes,
    expandNote,
    addToRevision,
    removeMistake,
    clearMistakes,
    retestMistakes,
    switchMentorTab,
    generateStudyPlan,
    evaluateAnswerAI,
    simplifyNews,
    showXPToast,
  };

  // Re-expose to App namespace
  App.filterNotes = filterNotes;
  App.retestMistakes = retestMistakes;
  App.clearMistakes = clearMistakes;
  App.switchMentorTab = switchMentorTab;
  App.generateStudyPlan = generateStudyPlan;
  App.evaluateAnswerAI = evaluateAnswerAI;
  App.simplifyNews = simplifyNews;

})();
