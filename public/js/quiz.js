/* ╔══════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — quiz.js                ║
   ╚══════════════════════════════════════════╝ */

const QUIZ = (() => {
  let qList=[], current=0, score=0, wrong=0, skipped=0, mode='', cfg=null;
  let timerInterval=null, timeLeft=0, selectedSubject='';

  function getAllQ() {
    const base = typeof QUESTION_BANK!=='undefined' ? QUESTION_BANK : [];
    const extra = typeof EXTRA_QUESTIONS!=='undefined' ? EXTRA_QUESTIONS : [];
    return [...base, ...extra];
  }

  function renderModes() {
    document.getElementById('quizModeSelect').style.display='block';
    document.getElementById('quizActive').style.display='none';
    if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
  }

  function start(modeId, subject) {
    mode = modeId; selectedSubject = subject||'';
    score=0; wrong=0; skipped=0; current=0;
    const all = getAllQ();

    if(modeId==='subject' && !subject){
      document.getElementById('subjectSelectArea').style.display='block';
      const chips = document.getElementById('quizSubjectChips');
      const subjects=[..new Set(all.map(q=>q.subject))];
      chips.innerHTML = subjects.map(s=>`<button class="subject-chip" onclick="QUIZ.start('subject','${s}')">${s}</button>`).join('');
      return;
    }
    document.getElementById('subjectSelectArea').style.display='none';

    // Build pool
    let pool = all;
    if(modeId==='subject' && subject) pool=all.filter(q=>q.subject===subject);
    if(modeId==='adaptive'||modeId==='weak_assault'){
      const weakNodes=Object.entries(STATE.mastery).filter(([k,v])=>v<40).map(([k])=>k);
      if(weakNodes.length>0) pool=all.filter(q=>weakNodes.includes(q.node));
      if(pool.length<10) pool=all;
    }
    if(modeId==='current_affairs'){
      const caQs=(typeof CURRENT_AFFAIRS!=='undefined'?CURRENT_AFFAIRS:[]).map(ca=>({
        id:'ca_'+ca.id, subject:'Current Affairs', node:ca.syllabusNodes[0]||'p1',
        difficulty:'medium', year:2024, topic:ca.category,
        q:ca.mcq.q, opts:ca.mcq.opts, ans:ca.mcq.ans, explain:ca.mcq.explain, wrongExplain:'',
      }));
      pool=[...caQs,...all.filter(q=>q.topic==='Current Affairs')].slice(0,20);
      if(pool.length<5) pool=all;
    }
    if(modeId==='scheme_drill') pool=all.filter(q=>q.subject==='Governance'||q.node==='go1'||q.node==='go2');
    if(modeId==='concept_cluster'){
      // Pick questions from cross-topic nodes
      const clusterNodes=['ev2','e3','p2','s1','ir2','e5'];
      pool=all.filter(q=>clusterNodes.includes(q.node));
      if(pool.length<10) pool=all;
    }

    // Shuffle + limit + prioritize unseen
    const unseen = getUnseen(pool);
    const seen = pool.filter(q=>isSeen(q.id));
    const shuffled = [...unseen.sort(()=>Math.random()-0.5),...seen.sort(()=>Math.random()-0.5)];

    // Determine config
    cfg = typeof MOCK_CONFIGS!=='undefined' ? MOCK_CONFIGS.find(c=>c.id===modeId)||null : null;
    let limit = 20;
    let timeLimit = 0;
    let hasNeg = false;

    if(cfg){ limit=cfg.questions; timeLimit=cfg.timeMin*60; hasNeg=cfg.negMarking; }
    else if(modeId==='timed'||modeId==='speed_drill'){ limit=20; timeLimit=600; }
    else if(modeId==='full_prelims'){ limit=100; timeLimit=7200; hasNeg=true; }
    else if(modeId==='prelims'){ limit=100; timeLimit=7200; hasNeg=true; }
    else if(modeId==='death_sprint'){ limit=50; timeLimit=1800; hasNeg=true; }

    // For full_prelims: distribute by subject
    if(modeId==='full_prelims'||modeId==='prelims'){
      qList=[];
      const dist=cfg?cfg.subjectDist:{Polity:25,Economy:20,Environment:20,History:15,Geography:10,'Sci & Tech':5,Governance:3,'Int. Relations':2};
      Object.entries(dist).forEach(([subj,count])=>{
        const sq=all.filter(q=>q.subject===subj).sort(()=>Math.random()-0.5).slice(0,count);
        qList.push(...sq);
      });
      qList=qList.sort(()=>Math.random()-0.5);
    } else {
      qList=shuffled.slice(0,limit);
    }

    if(qList.length===0){ alert('No questions available for this mode yet!'); return; }

    document.getElementById('quizModeSelect').style.display='none';
    document.getElementById('quizActive').style.display='block';

    if(timeLimit>0){
      timeLeft=timeLimit;
      document.getElementById('quizTimer').style.display='flex';
      runTimer(hasNeg);
    } else {
      document.getElementById('quizTimer').style.display='none';
    }

    window._quizNeg=hasNeg;
    showQuestion();
  }

  function runTimer(hasNeg){
    if(timerInterval) clearInterval(timerInterval);
    timerInterval=setInterval(()=>{
      timeLeft--;
      const m=Math.floor(timeLeft/60),s=timeLeft%60;
      const td=document.getElementById('timerDisplay');
      if(td) td.textContent=`${m}:${s.toString().padStart(2,'0')}`;
      const tw=document.getElementById('quizTimer');
      if(timeLeft<=60 && tw) tw.classList.add('warning');
      if(timeLeft<=0){clearInterval(timerInterval);timerInterval=null;showResults();}
    },1000);
  }

  function showQuestion(){
    const q=qList[current];
    updateProgress();
    document.getElementById('quizActive').innerHTML=buildQuestionHTML(q, current, qList.length, window._quizNeg||false);
  }

  function buildQuestionHTML(q, idx, total, negMarking){
    return `
      <div class="quiz-header">
        <button class="back-btn" onclick="QUIZ.exit()">✕ Exit</button>
        <div class="quiz-progress">
          <div class="qp-bar"><div class="qp-fill" id="quizProgressFill" style="width:${(idx/total)*100}%"></div></div>
          <span id="quizQNum">${idx+1}/${total}</span>
        </div>
        <div class="quiz-timer" id="quizTimer" style="display:none">⏱ <span id="timerDisplay">—</span></div>
      </div>
      ${negMarking?'<div style="font-size:11px;color:var(--red);text-align:right;margin-bottom:8px;">⚠ Negative marking: −1/3</div>':''}
      <div class="question-card" id="quizCard">
        <div class="qc-subject">${q.subject} · ${q.topic||''} · ${q.year||''}</div>
        <div class="qc-text">${q.q}</div>
        <div class="qc-opts">
          ${q.opts.map((opt,i)=>`<button class="q-opt" onclick="QUIZ.answer(${i})" id="qopt${i}">${opt}</button>`).join('')}
        </div>
      </div>`;
  }

  function answer(idx){
    const q=qList[current];
    const correct=idx===q.ans;
    if(correct) score++;
    else wrong++;
    markSeen(q.id);
    logAnswer(q.node, correct, q.id);
    if(correct) addXP(XP_REWARDS.quiz_correct, `Quiz: ${q.subject}`);

    // Disable all options, highlight
    q.opts.forEach((_,i)=>{
      const btn=document.getElementById('qopt'+i);
      if(!btn) return;
      btn.disabled=true;
      if(i===q.ans) btn.classList.add('correct');
      else if(i===idx && !correct) btn.classList.add('wrong');
    });

    const card=document.getElementById('quizCard');
    if(card){
      card.innerHTML+=`
        <div class="question-feedback">
          <div class="qf-label">${correct?'✅ Correct!':'❌ Incorrect'}</div>
          <p>${q.explain}</p>
          ${!correct&&q.wrongExplain?`<div class="explain-box"><div class="explain-label">Why you might have chosen wrongly:</div>${q.wrongExplain}</div>`:''}
        </div>
        <button class="next-btn" onclick="QUIZ.next()">${current+1<qList.length?'Next →':'See Results →'}</button>`;
    }
  }

  function next(){
    current++;
    if(current>=qList.length){ showResults(); return; }
    showQuestion();
    // Re-attach timer display if needed
    const td=document.getElementById('timerDisplay');
    const tw=document.getElementById('quizTimer');
    if(tw && timerInterval){
      tw.style.display='flex';
      const m=Math.floor(timeLeft/60),s=timeLeft%60;
      if(td) td.textContent=`${m}:${s.toString().padStart(2,'0')}`;
    }
  }

  function showResults(){
    if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
    const total=qList.length;
    const pct=total>0?Math.round(score/total*100):0;
    addXP(XP_REWARDS.quiz_complete,'Quiz Complete!');
    const color=pct>=70?'var(--green)':pct>=50?'var(--gold)':'var(--red)';
    document.getElementById('quizActive').innerHTML=`
      <div class="quiz-result-summary">
        <div class="qrs-score" style="color:${color}">${pct}%</div>
        <div class="qrs-label">${score} correct out of ${total} questions</div>
        <div class="qrs-breakdown">
          <div class="qrs-stat"><div class="val" style="color:var(--green)">${score}</div><div class="lbl">Correct</div></div>
          <div class="qrs-stat"><div class="val" style="color:var(--red)">${wrong}</div><div class="lbl">Wrong</div></div>
          <div class="qrs-stat"><div class="val">${total-score-wrong}</div><div class="lbl">Skipped</div></div>
        </div>
        <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          <button class="btn-primary" onclick="QUIZ.renderModes()">Try Again</button>
          <button class="btn-secondary" onclick="navigate('revision')">Revise Weak Topics</button>
          <button class="btn-secondary" onclick="navigate('performance')">View Analytics</button>
        </div>
      </div>`;
  }

  function exit(){
    if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
    renderModes();
  }

  return {start,answer,next,exit,renderModes};
})();
