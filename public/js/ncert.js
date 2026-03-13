/* ╔══════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — ncert.js               ║
   ╚══════════════════════════════════════════╝ */

const NCERT = (() => {
  let activeModule=null, activeStep=0, flippedCards={};

  const SUBJECT_COLORS = {
    'Polity':'#7c6af7','Economy':'#22c55e','Environment':'#06b6d4',
    'History':'#f59e0b','Geography':'#a855f7','Sci & Tech':'#f97316',
  };

  function renderList(){
    document.getElementById('ncertLesson').style.display='none';
    const el=document.getElementById('ncertModuleList');
    if(!el) return;
    el.innerHTML=`<div class="ncert-grid">
      ${NCERT_MODULES.map(m=>{
        const color=SUBJECT_COLORS[m.subject]||'#7c6af7';
        const done=STATE.mastery[m.nodeId]||0;
        const pct=Math.min(100,done);
        return `<div class="ncert-module-card" onclick="NCERT.openModule('${m.id}')" style="--mc:${color}">
          <div class="nm-subject" style="color:${color}">${m.subject}</div>
          <div class="nm-title">${m.title}</div>
          <div class="nm-meta">
            <span>📖 ${m.lessons.length} lessons</span>
            <span>⏱ ~${m.lessons.length*5} min</span>
            <span style="color:${pct>50?'var(--green)':'var(--text3)'}">${pct>0?pct+'% mastery':'Not started'}</span>
          </div>
          <div class="nm-progress-bar">
            <div class="nm-progress-fill" style="width:${pct}%;background:${color}"></div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function openModule(id){
    activeModule=NCERT_MODULES.find(m=>m.id===id);
    if(!activeModule) return;
    activeStep=0; flippedCards={};
    document.getElementById('ncertModuleList').innerHTML='';
    document.getElementById('ncertLesson').style.display='block';
    renderStep();
  }

  function renderStep(){
    const m=activeModule;
    const lesson=m.lessons[activeStep];
    if(!lesson) return;
    // Dots
    const dotsEl=document.getElementById('lessonDots');
    if(dotsEl){
      dotsEl.innerHTML=m.lessons.map((_,i)=>`<div class="lpd ${i<activeStep?'done':i===activeStep?'active':''}"></div>`).join('');
    }
    const content=document.getElementById('lessonContent');
    if(!content) return;

    let html='';
    if(lesson.type==='concept'){
      html=`<div class="lesson-step">
        <div class="ls-type concept">📘 CONCEPT</div>
        <div class="ls-title">${lesson.title}</div>
        <div class="ls-body">${lesson.body}</div>
        ${lesson.keywords?`<div class="ls-keywords">${lesson.keywords.map(k=>`<span class="keyword-chip">${k}</span>`).join('')}</div>`:''}
      </div>`;
    } else if(lesson.type==='example'){
      html=`<div class="lesson-step">
        <div class="ls-type example">💡 EXAMPLE</div>
        <div class="ls-title">${lesson.title}</div>
        <div class="ls-body">${lesson.body}</div>
      </div>`;
    } else if(lesson.type==='eli5'){
      html=`<div class="lesson-step">
        <div class="ls-type concept" style="color:var(--gold)">🧒 ELI5 — Explain Like I'm 5</div>
        <div class="ls-title">${lesson.title}</div>
        <div class="ls-body">${lesson.body}</div>
      </div>`;
    } else if(lesson.type==='quiz'){
      html=`<div class="lesson-step">
        <div class="ls-type quiz">⚡ QUICK CHECK</div>
        <div class="ls-title">${lesson.title||'Test Your Understanding'}</div>
        <div class="qc-text" style="margin-bottom:16px">${lesson.q}</div>
        <div class="qc-opts">
          ${lesson.opts.map((o,i)=>`<button class="q-opt" id="ncertopt${i}" onclick="NCERT.checkAnswer(${i})">${o}</button>`).join('')}
        </div>
        <div id="ncertFeedback" style="display:none" class="question-feedback"></div>
      </div>`;
      return renderContent(content, html, false);
    } else if(lesson.type==='flashcard'){
      html=`<div class="lesson-step">
        <div class="ls-type flashcard">🃏 FLASHCARD</div>
        <div class="ls-title">${lesson.title||'Recall'}</div>
        <p style="font-size:13px;color:var(--text2);margin-bottom:12px;">Tap card to reveal answer</p>
        ${(lesson.cards||[]).map((card,i)=>`
          <div class="flashcard-wrap">
            <div class="flashcard ${flippedCards[i]?'flipped':''}" onclick="NCERT.flipCard(${i})">
              <div class="fc-front"><div><div class="fc-hint">Question</div><div class="fc-text">${card.q}</div></div></div>
              <div class="fc-back"><div><div class="fc-hint">Answer</div><div class="fc-answer">${card.a}</div></div></div>
            </div>
          </div>`).join('')}
      </div>`;
    } else if(lesson.type==='summary'){
      html=`<div class="lesson-step">
        <div class="ls-type concept" style="color:var(--cyan)">📋 SUMMARY</div>
        <div class="ls-title">${lesson.title}</div>
        <div class="ls-body">${lesson.body}</div>
        ${lesson.keypoints?`<div class="ls-keywords" style="flex-direction:column;align-items:flex-start;gap:8px;margin-top:12px">
          ${lesson.keypoints.map(p=>`<div style="display:flex;gap:8px;font-size:13px"><span style="color:var(--accent)">▸</span><span>${p}</span></div>`).join('')}
        </div>`:''}
      </div>`;
    }

    renderContent(content, html, true);
  }

  function renderContent(el, html, showNav){
    const navHTML=showNav?`<div class="lesson-nav">
      ${activeStep>0?`<button class="btn-secondary" onclick="NCERT.prevStep()">← Back</button>`:''}
      <button class="btn-primary" style="flex:1" onclick="NCERT.nextStep()">
        ${activeStep<activeModule.lessons.length-1?'Continue →':'Complete Module ✓'}
      </button>
    </div>`:'';
    el.innerHTML=html+navHTML;
  }

  function checkAnswer(idx){
    const lesson=activeModule.lessons[activeStep];
    const correct=idx===lesson.ans;
    lesson.opts.forEach((_,i)=>{
      const btn=document.getElementById('ncertopt'+i);
      if(!btn) return;
      btn.disabled=true;
      if(i===lesson.ans) btn.classList.add('correct');
      else if(i===idx&&!correct) btn.classList.add('wrong');
    });
    const fb=document.getElementById('ncertFeedback');
    if(fb){
      fb.style.display='block';
      fb.innerHTML=`<div class="qf-label">${correct?'✅ Correct!':'❌ Incorrect'}</div>
        <p>${lesson.explain||''}</p>
        ${!correct&&lesson.wrongExplain?`<div class="explain-box"><div class="explain-label">Why you may have got it wrong:</div>${lesson.wrongExplain}</div>`:''}
        <button class="next-btn" onclick="NCERT.nextStep()">${activeStep<activeModule.lessons.length-1?'Continue →':'Finish Module ✓'}</button>`;
    }
    if(correct) addXP(XP_REWARDS.ncert_correct,'NCERT Quiz');
    logAnswer(activeModule.nodeId||'p1', correct, 'ncert_'+activeModule.id+'_'+activeStep);
  }

  function flipCard(i){
    flippedCards[i]=!flippedCards[i];
    const card=document.querySelectorAll('.flashcard')[i];
    if(card) card.classList.toggle('flipped',!!flippedCards[i]);
  }

  function nextStep(){
    if(!activeModule) return;
    if(activeStep<activeModule.lessons.length-1){
      activeStep++;
      renderStep();
    } else {
      // Module complete
      const prev=getMastery(activeModule.nodeId||'p1');
      setMastery(activeModule.nodeId||'p1', prev+20);
      addXP(XP_REWARDS.ncert_module,'NCERT Module Complete!');
      addToRevision(activeModule.nodeId||'p1');
      // Complete screen
      const content=document.getElementById('lessonContent');
      if(content) content.innerHTML=`<div style="text-align:center;padding:40px 20px;">
        <div style="font-size:48px;margin-bottom:16px;">🎓</div>
        <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:8px;">Module Complete!</div>
        <div style="color:var(--text2);font-size:14px;margin-bottom:24px;">+50 XP earned. Topic added to revision schedule.</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <button class="btn-primary" onclick="NCERT.backToList()">Back to Modules</button>
          <button class="btn-secondary" onclick="navigate('quiz')">Practice Questions</button>
        </div>
      </div>`;
    }
  }

  function prevStep(){
    if(activeStep>0){ activeStep--; renderStep(); }
  }

  function backToList(){
    activeModule=null; activeStep=0;
    document.getElementById('ncertLesson').style.display='none';
    renderList();
  }

  return {renderList,openModule,checkAnswer,nextStep,prevStep,backToList,flipCard};
})();
