/* ╔══════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — diagnostic.js          ║
   ╚══════════════════════════════════════════╝ */

const DIAGNOSTIC = (() => {
  let questions = [];
  let current = 0;
  let answers = [];

  function start() {
    questions = [...DIAGNOSTIC_QUESTIONS].sort(() => Math.random() - 0.5);
    current = 0;
    answers = [];
    document.getElementById('diagStart').style.display = 'none';
    document.getElementById('diagResults').style.display = 'none';
    document.getElementById('diagActive').style.display = 'block';
    showQuestion();
  }

  function showQuestion() {
    const q = questions[current];
    updateProgress();
    const subj = document.getElementById('diagSubject');
    const card = document.getElementById('diagQuestionCard');
    if (subj) subj.textContent = q.subject;
    card.style.display = 'block';
    card.innerHTML = `
      <div class="qc-subject">${q.subject} · ${q.difficulty}</div>
      <div class="qc-text">${q.q}</div>
      <div class="qc-opts">
        ${q.opts.map((opt,i) => `<button class="q-opt" onclick="DIAGNOSTIC.answer(${i})">${opt}</button>`).join('')}
      </div>`;
  }

  function answer(idx) {
    const q = questions[current];
    const correct = idx === q.ans;
    answers.push({ qId: q.id, nodeId: q.node, correct, subject: q.subject });
    logAnswer(q.node, correct, q.id);

    // Highlight options
    const opts = document.querySelectorAll('.qc-opts .q-opt');
    opts.forEach((opt, i) => {
      opt.disabled = true;
      if (i === q.ans) opt.classList.add('correct');
      else if (i === idx && !correct) opt.classList.add('wrong');
    });

    if (correct) addXP(XP_REWARDS.diag_correct, 'Diagnostic');

    // Show explain + next
    const card = document.getElementById('diagQuestionCard');
    card.innerHTML += `
      <div class="question-feedback">
        <div class="qf-label">${correct ? '✅ Correct!' : '❌ Incorrect'}</div>
        <p>${q.explain}</p>
        ${!correct && q.wrongExplain ? `<div class="explain-box"><div class="explain-label">Why you may have got it wrong:</div>${q.wrongExplain}</div>` : ''}
      </div>
      <button class="next-btn" onclick="DIAGNOSTIC.next()">${current + 1 < questions.length ? 'Next Question →' : 'See Results →'}</button>`;
  }

  function next() {
    current++;
    if (current >= questions.length) return showResults();
    showQuestion();
  }

  function updateProgress() {
    const fill = document.getElementById('diagProgressFill');
    const label = document.getElementById('diagQNum');
    const subj = document.getElementById('diagSubject');
    const pct = (current / questions.length) * 100;
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = `Q ${current+1}/${questions.length}`;
    if (subj) subj.textContent = questions[current]?.subject || '';
  }

  function showResults() {
    document.getElementById('diagActive').style.display = 'none';
    document.getElementById('diagResults').style.display = 'block';
    addXP(XP_REWARDS.diag_complete, 'Completed Diagnostic!');
    STATE.diagnosed = true;

    // Subject scores
    const subjects = ['Polity','Economy','Environment','History','Geography','Sci & Tech','Governance','Int. Relations'];
    const subjectScores = {};
    subjects.forEach(s => {
      const sq = answers.filter(a => a.subject === s);
      subjectScores[s] = sq.length > 0 ? Math.round(sq.filter(a => a.correct).length / sq.length * 100) : 0;
    });

    const totalCorrect = answers.filter(a => a.correct).length;
    const pct = Math.round(totalCorrect / answers.length * 100);
    const level = pct >= 70 ? 'Advanced' : pct >= 45 ? 'Intermediate' : 'Foundation';

    STATE.diagResult = { level, subjectScores, totalCorrect, pct };
    saveState();

    // Update revision queue for weak subjects
    subjects.forEach(s => {
      if ((subjectScores[s] || 0) < 40) {
        KNOWLEDGE_GRAPH.filter(n => n.subject === s).forEach(n => addToRevision(n.id));
      }
    });

    // Render
    document.getElementById('resultsLevel').textContent = level;
    document.getElementById('resultsScore').textContent = `${totalCorrect}/${answers.length} — ${pct}%`;

    const breakdown = document.getElementById('subjectBreakdown');
    const colors = { 'Polity':'#7c6af7','Economy':'#22c55e','Environment':'#06b6d4','History':'#f59e0b','Geography':'#a855f7','Sci & Tech':'#f97316','Governance':'#ef4444','Int. Relations':'#ec4899' };
    breakdown.innerHTML = subjects.map(s => {
      const sc = subjectScores[s] || 0;
      return `<div class="sb-item">
        <span class="sb-subj">${s}</span>
        <div class="sb-bar"><div class="sb-fill" style="width:${sc}%;background:${colors[s]||'#7c6af7'}"></div></div>
        <span class="sb-pct">${sc}%</span>
      </div>`;
    }).join('');
    renderRadar();
  }

  return { start, answer, next };
})();
