// ══════════════════════════════════════════════════════════════
//  UPSC PATTERN ENGINE — PREDICTION SYSTEM
//  Brain 1: Frequency + Gap Analyser
//  Brain 2: Topic Probability Model
//  Brain 3: Simulated Paper Generator
//  Output: Statistical forecasting for UPSC 2026
// ══════════════════════════════════════════════════════════════

const PredictionEngine = (() => {

  // ── STATE ──
  let state = {
    activeTab: 'forecast',
    simulatedPaper: [],
    simulatedAnswers: {},
    simulatedAnswered: false,
    currentSimQ: 0,
    activeTopic: null,
    chartInstances: {},
  };

  // ══════════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════════
  function init() {
    renderForecast();
    renderFrequencyChart();
  }

  function switchTab(tab) {
    state.activeTab = tab;
    document.querySelectorAll('.pred-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.tab === tab));
    document.querySelectorAll('.pred-panel').forEach(p =>
      p.classList.remove('active-tab'));
    const el = document.getElementById('pred-' + tab);
    if (el) el.classList.add('active-tab');

    if (tab === 'forecast') renderForecast();
    if (tab === 'frequency') { renderFrequencyChart(); renderFrequencyTable(); }
    if (tab === 'gaps') renderGapAnalysis();
    if (tab === 'waves') renderThemeWaves();
    if (tab === 'simulator') renderSimulatorIntro();
    if (tab === 'mains') renderPredictedMains();
    if (tab === 'verbs') renderVerbAnalysis();
  }

  // ══════════════════════════════════════════════════════════════
  //  BRAIN 1 — FORECAST PANEL
  // ══════════════════════════════════════════════════════════════
  function renderForecast() {
    const container = document.getElementById('pred-forecast');
    if (!container) return;
    const { subjectProbs, bySubject } = computeProbabilities();

    // Subject probability bars
    const subjHTML = Object.entries(subjectProbs)
      .sort((a, b) => b[1] - a[1])
      .map(([subj, prob]) => {
        const color = subjectColor(subj);
        const trend = getSubjectTrend(subj);
        return `
        <div class="forecast-subj-row" onclick="PredictionEngine.drillSubject('${subj}')">
          <div class="forecast-subj-name">${subj}</div>
          <div class="forecast-bar-wrap">
            <div class="forecast-bar" data-prob="${prob}" style="width:0%;background:${color}"></div>
          </div>
          <div class="forecast-prob">${prob}%</div>
          <div class="forecast-trend trend-${trend.key}">${trend.arrow} ${trend.label}</div>
        </div>`;
      }).join('');

    // Top 10 predicted topics
    const allTopics = TOPIC_FREQUENCY_DB
      .map(t => ({ ...t, ...computeTopicScore(t) }))
      .sort((a, b) => b.finalScore - a.finalScore);

    const topTopicsHTML = allTopics.slice(0, 12).map((t, i) => `
      <div class="pred-topic-row" onclick="PredictionEngine.showTopicDetail('${t.id}')">
        <div class="pred-topic-rank">${i + 1}</div>
        <div class="pred-topic-info">
          <div class="pred-topic-name">${t.topic}</div>
          <div class="pred-topic-meta">
            <span class="news-tag tag-${t.subject.toLowerCase().replace(/[ .&]/g, '-')}" style="font-size:0.46rem;padding:0.08rem 0.35rem">${t.subject}</span>
            ${t.gap_flag ? `<span class="gap-alert-chip">⚠️ ${t.currentGap}yr gap</span>` : ''}
          </div>
        </div>
        <div class="pred-topic-score">
          <div class="pred-score-bar-wrap">
            <div class="pred-score-bar" style="width:${Math.min(100, (t.finalScore / 15) * 100)}%;background:${subjectColor(t.subject)}"></div>
          </div>
          <span class="pred-score-label">${probabilityLabel(t.finalScore)}</span>
        </div>
      </div>
    `).join('');

    container.innerHTML = `
      <!-- Confidence meter -->
      <div class="forecast-header-box">
        <div class="forecast-confidence">
          <div class="fc-title">UPSC 2026 Prediction Engine</div>
          <div class="fc-subtitle">Statistical inference from 25 years of question data · Not a crystal ball</div>
          <div class="fc-meter-row">
            <div class="fc-meter-label">System Confidence</div>
            <div class="fc-meter-wrap">
              <div class="fc-meter-fill" style="width:67%"></div>
              <div class="fc-meter-needle" style="left:67%"></div>
            </div>
            <div class="fc-meter-pct">67%</div>
          </div>
          <div class="fc-caveat">UPSC examiners actively rotate patterns. This engine tracks trend + gap + policy relevance — not just frequency.</div>
        </div>
      </div>

      <!-- Subject probability distribution -->
      <div class="forecast-section-title">Subject Probability Distribution — Prelims 2026</div>
      <div class="forecast-subj-list" id="forecastSubjList">${subjHTML}</div>

      <!-- Top predicted topics -->
      <div class="forecast-section-title" style="margin-top:1.5rem">
        Top 12 Predicted Topics
        <span style="font-size:0.52rem;font-weight:400;color:var(--dust)">Click any topic for full analysis</span>
      </div>
      <div class="pred-topic-list">${topTopicsHTML}</div>

      <!-- Topic detail overlay -->
      <div id="topicDetailCard" class="topic-detail-card" style="display:none"></div>

      <!-- Disclaimer -->
      <div class="pred-disclaimer">
        <div class="pred-disc-icon">⚖️</div>
        <div>Pattern analysis reflects statistical tendencies from 2000–2024 UPSC papers. UPSC examiners deliberately break patterns to prevent gaming. Use this as a <em>strategic prioritisation tool</em>, not a shortcut. The 30% unpredictable portion of every paper rewards broad reading.</div>
      </div>
    `;

    // Animate bars after render
    setTimeout(() => {
      document.querySelectorAll('.forecast-bar[data-prob]').forEach(b => {
        b.style.transition = 'width 1.2s cubic-bezier(0.2,0.8,0.4,1)';
        b.style.width = b.dataset.prob + '%';
      });
      document.querySelectorAll('.pred-score-bar').forEach(b => {
        b.style.transition = 'width 1s ease';
        const w = b.style.width;
        b.style.width = '0%';
        setTimeout(() => b.style.width = w, 50);
      });
    }, 100);
  }

  function drillSubject(subj) {
    const { bySubject } = computeProbabilities();
    const topics = (bySubject[subj] || []).slice(0, 8);
    const color = subjectColor(subj);

    const overlay = document.createElement('div');
    overlay.className = 'subj-drill-overlay';
    overlay.innerHTML = `
      <div class="subj-drill-modal">
        <div class="subj-drill-header" style="border-top-color:${color}">
          <div>
            <div class="subj-drill-title">${subj} — Topic Breakdown</div>
            <div class="subj-drill-sub">${topics.length} topics analysed · Click any for full detail</div>
          </div>
          <button class="modal-close-btn" onclick="this.closest('.subj-drill-overlay').remove()">✕</button>
        </div>
        <div class="subj-drill-list">
          ${topics.map((t, i) => `
            <div class="drill-topic-row" onclick="PredictionEngine.showTopicDetail('${t.id}');this.closest('.subj-drill-overlay').remove()">
              <div class="drill-rank" style="background:${color}20;color:${color}">${i + 1}</div>
              <div class="drill-info">
                <div class="drill-name">${t.topic}</div>
                <div class="drill-subtopic">${t.subtopic}</div>
              </div>
              <div class="drill-right">
                <div class="drill-score-label" style="color:${color}">${probabilityLabel(t.finalScore)}</div>
                ${t.gap_flag ? `<div style="font-family:var(--mono);font-size:0.46rem;color:var(--red)">⚠️ GAP DUE</div>` : ''}
                ${t.trend === 'strongly_rising' ? `<div style="font-family:var(--mono);font-size:0.46rem;color:var(--green-india)">▲▲ SURGING</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  function showTopicDetail(id) {
    const topic = TOPIC_FREQUENCY_DB.find(t => t.id === id);
    if (!topic) return;
    const scored = { ...topic, ...computeTopicScore(topic) };
    const color = subjectColor(topic.subject);

    const modal = document.createElement('div');
    modal.className = 'topic-modal-overlay';
    modal.innerHTML = `
      <div class="topic-modal">
        <div class="topic-modal-header" style="border-top:3px solid ${color}">
          <div>
            <div class="topic-modal-title">${topic.topic}</div>
            <div class="topic-modal-meta">${topic.subject} · ${topic.subtopic}</div>
          </div>
          <button class="modal-close-btn" onclick="this.closest('.topic-modal-overlay').remove()">✕</button>
        </div>

        <!-- Score panel -->
        <div class="topic-score-panel" style="border-left:3px solid ${color}">
          <div class="tsp-row">
            <div class="tsp-stat">
              <div class="tsp-val" style="color:${color}">${probabilityLabel(scored.finalScore)}</div>
              <div class="tsp-lbl">2026 Probability</div>
            </div>
            <div class="tsp-stat">
              <div class="tsp-val">${topic.years.length}</div>
              <div class="tsp-lbl">Years Appeared</div>
            </div>
            <div class="tsp-stat">
              <div class="tsp-val">${topic.currentGap === 0 ? 'Active' : topic.currentGap + 'yr'}</div>
              <div class="tsp-lbl">Current Gap</div>
            </div>
            <div class="tsp-stat">
              <div class="tsp-val">${topic.avgGap.toFixed(1)}yr</div>
              <div class="tsp-lbl">Avg Gap</div>
            </div>
          </div>
        </div>

        ${topic.gap_flag ? `
        <div class="gap-alert-box">
          <div class="gap-alert-icon">⚠️</div>
          <div>${topic.gap_note}</div>
        </div>` : ''}

        <!-- Appearance timeline -->
        <div class="topic-timeline-label">Appearance History (2000–2024)</div>
        <div class="topic-timeline">
          ${Array.from({length: 25}, (_, i) => 2000 + i).map(yr => {
            const idx = topic.years.indexOf(yr);
            const count = idx >= 0 ? topic.counts[idx] : 0;
            return `<div class="timeline-yr" title="${yr}: ${count > 0 ? count + ' question' + (count>1?'s':'') : 'none'}">
              <div class="timeline-bar" style="height:${count * 18}px;background:${color};opacity:${count > 0 ? 0.8 : 0}"></div>
              <div class="timeline-yr-label">${yr % 5 === 0 ? yr.toString().slice(2) : ''}</div>
            </div>`;
          }).join('')}
        </div>

        <!-- Policy links -->
        ${topic.policyLinks.length > 0 ? `
        <div class="topic-policy-box">
          <div class="topic-policy-title">Current Policy Triggers (Why this is surging)</div>
          ${topic.policyLinks.map(p => `<div class="policy-item">→ ${p}</div>`).join('')}
        </div>` : ''}

        <!-- Study advice -->
        <div class="topic-advice">
          <div class="topic-advice-title">How to Prepare</div>
          <div class="topic-advice-text">
            ${generateStudyAdvice(topic)}
          </div>
        </div>

        <button class="btn btn-primary" style="margin-top:0.75rem;font-size:0.6rem" onclick="App.switchPanel('notes');this.closest('.topic-modal-overlay').remove()">Study Notes for This Topic →</button>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  // ══════════════════════════════════════════════════════════════
  //  BRAIN 1b — FREQUENCY CHART
  // ══════════════════════════════════════════════════════════════
  function renderFrequencyChart() {
    const container = document.getElementById('pred-frequency');
    if (!container) return;

    container.innerHTML = `
      <div class="freq-controls">
        <div class="freq-ctrl-label">Subject:</div>
        ${Object.keys(ANNUAL_SUBJECT_DATA.subjects).map(s =>
          `<button class="btn-filter freq-subj-btn ${s === 'Environment' ? 'active' : ''}"
            data-subj="${s}" onclick="PredictionEngine.updateFreqChart('${s}')">${s}</button>`
        ).join('')}
      </div>
      <div class="freq-chart-wrap">
        <canvas id="freqCanvas" height="220"></canvas>
      </div>
      <div class="freq-insight" id="freqInsight"></div>
    `;

    setTimeout(() => { updateFreqChart('Environment'); renderFrequencyTable(); }, 50);
  }

  function updateFreqChart(subj) {
    document.querySelectorAll('.freq-subj-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.subj === subj));

    const canvas = document.getElementById('freqCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const years = ANNUAL_SUBJECT_DATA.years;
    const counts = ANNUAL_SUBJECT_DATA.subjects[subj] || [];
    const color = subjectColor(subj);

    canvas.width = canvas.parentElement.offsetWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width, H = canvas.height;
    const pad = { top: 25, right: 20, bottom: 35, left: 35 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const maxVal = Math.max(...counts.filter(c => c > 0)) + 2;
    const barW = Math.max(4, (chartW / years.length) - 3);

    // Background grid
    ctx.strokeStyle = '#e8e0d0';
    ctx.lineWidth = 1;
    for (let g = 0; g <= 5; g++) {
      const y = pad.top + chartH - (g / 5) * chartH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      ctx.fillStyle = '#aaa';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(Math.round((g / 5) * maxVal), 2, y + 4);
    }

    // Bars + trend line data
    const trendPoints = [];
    years.forEach((yr, i) => {
      const x = pad.left + i * (chartW / years.length) + (chartW / years.length - barW) / 2;
      const bh = Math.max(0, (counts[i] / maxVal) * chartH);
      const y = pad.top + chartH - bh;

      // Bar gradient
      const grad = ctx.createLinearGradient(x, y, x, pad.top + chartH);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '40');
      ctx.fillStyle = grad;

      // Highlight post-2013 surge area
      if (subj === 'Environment' && yr >= 2013) {
        ctx.fillStyle = '#e8760a';
      }

      ctx.fillRect(x, y, barW, bh);
      trendPoints.push({ x: x + barW / 2, y: pad.top + chartH - (counts[i] / maxVal) * chartH });

      // Year label
      ctx.fillStyle = '#888';
      ctx.font = '9px JetBrains Mono, monospace';
      if (yr % 4 === 0) ctx.fillText(yr.toString().slice(2), x + barW / 2 - 6, H - 8);
    });

    // Trend line (moving average)
    ctx.strokeStyle = '#0f235280';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    const window = 3;
    trendPoints.forEach((pt, i) => {
      if (i < window - 1) return;
      const avg = trendPoints.slice(i - window + 1, i + 1).reduce((s, p) => s + p.y, 0) / window;
      if (i === window - 1) ctx.moveTo(pt.x, avg);
      else ctx.lineTo(pt.x, avg);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 2026 prediction marker
    const lastX = trendPoints[trendPoints.length - 1]?.x + (chartW / years.length);
    const slope = trendPoints.length >= 3
      ? (trendPoints[trendPoints.length - 1].y - trendPoints[trendPoints.length - 4].y) / 3
      : 0;
    const predY = Math.max(pad.top + 5, (trendPoints[trendPoints.length - 1]?.y || 0) + slope);

    // Predicted bar (dashed outline)
    const predCount = counts[counts.length - 1] + (slope < 0 ? 1 : slope > 0 ? -1 : 0);
    const predBH = (Math.max(1, predCount) / maxVal) * chartH;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(pad.left + years.length * (chartW / years.length) + 4, pad.top + chartH - predBH, barW, predBH);
    ctx.setLineDash([]);

    ctx.fillStyle = color;
    ctx.font = 'bold 10px JetBrains Mono, monospace';
    ctx.fillText("'26?", pad.left + years.length * (chartW / years.length) + 4, H - 8);

    // Insight text
    const insightEl = document.getElementById('freqInsight');
    if (insightEl) {
      const first5 = counts.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
      const last5 = counts.slice(-5).reduce((a, b) => a + b, 0) / 5;
      const change = ((last5 - first5) / first5 * 100).toFixed(0);
      const dir = last5 > first5 ? '▲' : '▼';
      insightEl.innerHTML = `
        <span class="freq-insight-stat">${dir} ${Math.abs(change)}% change</span>
        from 2000–2004 average (${first5.toFixed(1)} q/yr) to 2020–2024 average (${last5.toFixed(1)} q/yr).
        ${subj === 'Environment' ? ' Sharp acceleration after 2013 correlates with India\'s active participation in global climate talks.' : ''}
        ${subj === 'Sci & Tech' ? ' AI/digital governance questions driving consistent rise since 2017.' : ''}
        ${subj === 'History' ? ' Declining trend since 2014 as current affairs and governance questions expand.' : ''}
        ${subj === 'Economy' ? ' Digital economy subtopics have added 3–4 questions annually since 2017.' : ''}
      `;
    }
  }

  function renderFrequencyTable() {
    const tbl = document.getElementById('freqTable');
    if (!tbl) return;
    const years = ANNUAL_SUBJECT_DATA.years;
    const subjects = Object.keys(ANNUAL_SUBJECT_DATA.subjects);

    tbl.innerHTML = `
      <table class="freq-table">
        <thead>
          <tr>
            <th>Subject</th>
            ${years.filter(y => y % 4 === 0 || y >= 2020).map(y => `<th>${y}</th>`).join('')}
            <th class="pred-col">2026↑</th>
          </tr>
        </thead>
        <tbody>
          ${subjects.map(s => {
            const data = ANNUAL_SUBJECT_DATA.subjects[s];
            const filteredYears = years.filter(y => y % 4 === 0 || y >= 2020);
            const last3avg = data.slice(-3).reduce((a,b)=>a+b,0)/3;
            const trend2026 = Math.max(0, Math.round(last3avg + (data.slice(-1)[0] - data.slice(-4)[0]) / 3));
            return `<tr>
              <td class="freq-subj-cell" style="border-left:3px solid ${subjectColor(s)}">${s}</td>
              ${filteredYears.map(y => {
                const idx = years.indexOf(y);
                const val = data[idx];
                const max = Math.max(...data.filter(v => v > 0));
                const heat = val / max;
                return `<td class="freq-cell" style="background:${subjectColor(s)}${Math.round(heat * 40 + 5).toString(16).padStart(2,'0')}">${val}</td>`;
              }).join('')}
              <td class="pred-col pred-cell">${trend2026}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    `;
  }

  // ══════════════════════════════════════════════════════════════
  //  BRAIN 1c — GAP ANALYSIS
  // ══════════════════════════════════════════════════════════════
  function renderGapAnalysis() {
    const container = document.getElementById('pred-gaps');
    if (!container) return;

    const gapTopics = TOPIC_FREQUENCY_DB
      .filter(t => t.currentGap >= 2 || t.gap_flag)
      .sort((a, b) => b.currentGap - a.currentGap);

    const urgentGaps = gapTopics.filter(t => t.currentGap >= 5 || t.gap_flag);
    const watchGaps = gapTopics.filter(t => t.currentGap >= 2 && t.currentGap < 5 && !t.gap_flag);

    container.innerHTML = `
      <div class="gap-explainer">
        <div class="gap-explainer-icon">🔄</div>
        <div>
          <strong>Gap Analysis</strong> — UPSC topics follow cycles. A topic that appeared 5–7 years ago has historically high return probability. The AI scans every topic against its average cycle length and flags those that are <em>overdue</em>.
        </div>
      </div>

      <div class="gap-section-label urgent-label">⚠️ OVERDUE — High Return Probability</div>
      ${urgentGaps.map(t => renderGapCard(t, 'urgent')).join('')}

      <div class="gap-section-label watch-label" style="margin-top:1.2rem">👁 WATCH LIST — Gap Accumulating</div>
      ${watchGaps.map(t => renderGapCard(t, 'watch')).join('')}
    `;
  }

  function renderGapCard(t, type) {
    const color = subjectColor(t.subject);
    const avgGap = t.avgGap;
    const overduePct = Math.min(100, (t.currentGap / avgGap) * 100);
    return `
      <div class="gap-card ${type === 'urgent' ? 'gap-urgent' : 'gap-watch'}" onclick="PredictionEngine.showTopicDetail('${t.id}')">
        <div class="gap-card-top">
          <div>
            <div class="gap-topic-name">${t.topic}</div>
            <div class="gap-topic-sub"><span class="news-tag tag-${t.subject.toLowerCase().replace(/[ .&]/g,'')}" style="font-size:0.45rem">${t.subject}</span> · ${t.subtopic}</div>
          </div>
          <div class="gap-stats">
            <div class="gap-stat-item">
              <div class="gap-stat-val" style="color:${type==='urgent'?'var(--red)':color}">${t.currentGap}yr</div>
              <div class="gap-stat-lbl">Current Gap</div>
            </div>
            <div class="gap-stat-item">
              <div class="gap-stat-val">${t.avgGap.toFixed(1)}yr</div>
              <div class="gap-stat-lbl">Avg Cycle</div>
            </div>
            <div class="gap-stat-item">
              <div class="gap-stat-val">${t.lastYear}</div>
              <div class="gap-stat-lbl">Last Seen</div>
            </div>
          </div>
        </div>
        <div class="gap-overdue-label">
          Overdue meter: ${overduePct.toFixed(0)}% past average cycle
        </div>
        <div class="gap-overdue-bar-wrap">
          <div class="gap-overdue-bar" style="width:${overduePct}%;background:${type==='urgent'?'var(--red)':color}"></div>
          <div class="gap-cycle-marker" style="left:100%">avg</div>
        </div>
        ${t.gap_note ? `<div class="gap-note">${t.gap_note}</div>` : ''}
        ${t.policyLinks.length > 0 ? `<div class="gap-policy-hint">Policy fuel: ${t.policyLinks.slice(0,2).join(' · ')}</div>` : ''}
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════
  //  THEME WAVES
  // ══════════════════════════════════════════════════════════════
  function renderThemeWaves() {
    const container = document.getElementById('pred-waves');
    if (!container) return;

    container.innerHTML = `
      <div class="waves-intro">
        <strong>Theme Wave Detection</strong> — UPSC question themes don't evolve in isolation. They respond to global events: climate summits, economic reforms, technology breakthroughs. The AI maps these correlations to project emerging waves.
      </div>

      <!-- Wave timeline -->
      <div class="wave-timeline">
        ${THEME_WAVES.map((w, i) => `
          <div class="wave-event ${i === THEME_WAVES.length - 1 ? 'wave-predicted' : ''}">
            <div class="wave-year" style="background:${i === THEME_WAVES.length-1 ? 'var(--saffron)' : 'var(--navy)'}">${w.year}${i === THEME_WAVES.length-1 ? '→' : ''}</div>
            <div class="wave-connector"></div>
            <div class="wave-card">
              <div class="wave-event-text">${w.event}</div>
              <div class="wave-subjects">
                ${w.subjects.map(s => `<span class="news-tag tag-${s.toLowerCase().replace(/[ .&]/g,'-')}" style="font-size:0.44rem">${s}</span>`).join('')}
              </div>
              <div class="wave-impact">${w.impact}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- 2026 Emerging Topics -->
      <div class="emerging-box">
        <div class="emerging-title">🌊 Emerging Waves — Watch for 2026</div>
        <div class="emerging-grid">
          ${[
            { topic: 'AI Governance & IndiaAI Mission', subject: 'Sci & Tech', reason: 'IndiaAI Mission ₹10,371cr + global AI safety debate + Bletchley Declaration', heat: 98 },
            { topic: 'Green Hydrogen Economy', subject: 'Environment', reason: 'NGHM 5MMT target + hydrogen diplomacy + green fuel transition', heat: 94 },
            { topic: 'Semiconductor Sovereignty', subject: 'Economy', reason: 'Dholera fab + Micron + India Semiconductor Mission', heat: 91 },
            { topic: 'Digital Personal Data Rights', subject: 'Governance', reason: 'DPDP Act 2023 — India\'s first data protection law', heat: 96 },
            { topic: 'Indo-Pacific Architecture', subject: 'Int. Relations', reason: 'Quad, AUKUS implications, I2U2, IPEF — India\'s strategic positioning', heat: 93 },
            { topic: 'Climate Finance & Loss-Damage', subject: 'Environment', reason: 'COP29 NCQG $1T, L&D Fund operationalisation', heat: 92 },
            { topic: 'One Nation One Election', subject: 'Polity', reason: 'Kovind Committee report 2024, Constitution amendment attempt', heat: 89 },
            { topic: 'Cooperative Federalism Stress', subject: 'Polity', reason: 'Governor vs CM disputes SC judgments, GST Council SC ruling', heat: 87 },
          ].map(e => `
            <div class="emerging-card" onclick="PredictionEngine.switchTab('forecast')">
              <div class="emerging-heat-bar" style="width:${e.heat}%;background:${subjectColor(e.subject)}"></div>
              <div class="emerging-topic">${e.topic}</div>
              <div class="emerging-subj">
                <span class="news-tag tag-${e.subject.toLowerCase().replace(/[ .&]/g,'-')}" style="font-size:0.44rem">${e.subject}</span>
                <span class="emerging-heat-val">${e.heat}%</span>
              </div>
              <div class="emerging-reason">${e.reason}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════
  //  BRAIN 2 — VERB ANALYSIS
  // ══════════════════════════════════════════════════════════════
  function renderVerbAnalysis() {
    const container = document.getElementById('pred-verbs');
    if (!container) return;

    const canvas_id = 'verbCanvas';
    container.innerHTML = `
      <div class="verb-intro">
        <strong>Question Verb Analysis</strong> — The verbs UPSC uses (Discuss, Evaluate, Critically Examine) reveal the cognitive depth being tested. Tracking verb trends shows the exam is becoming more analytical and less factual.
      </div>
      <canvas id="${canvas_id}" height="200"></canvas>
      <div class="verb-cards">
        ${MAINS_VERB_TRENDS.map(v => `
          <div class="verb-card trend-${v.trend}">
            <div class="verb-name">${v.verb}</div>
            <div class="verb-trend-label trend-text-${v.trend}">
              ${v.trend === 'rising' ? '▲ Rising' : v.trend === 'declining' ? '▼ Declining' : '→ Stable'}
            </div>
            <div class="verb-count-row">
              <div class="verb-count-item"><div class="verb-count-yr">2020</div><div class="verb-count-val">${v.count2020}</div></div>
              <div class="verb-count-item"><div class="verb-count-yr">2022</div><div class="verb-count-val">${v.count2022}</div></div>
              <div class="verb-count-item"><div class="verb-count-yr">2024</div><div class="verb-count-val" style="color:${v.trend==='rising'?'var(--green-india)':v.trend==='declining'?'var(--red)':'var(--navy)'}">${v.count2024}</div></div>
            </div>
            <div class="verb-note">${v.note}</div>
          </div>
        `).join('')}
      </div>
      <div class="verb-insight">
        <strong>Key finding:</strong> "Critically Examine" usage has risen 50% from 2020 to 2024. "Explain" is declining. This signals UPSC is rewarding <em>analytical judgement</em> over factual recall. Answers that take a clear, defended position will score higher than neutral summaries.
      </div>
    `;

    setTimeout(() => drawVerbChart(canvas_id), 80);
  }

  function drawVerbChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    const W = canvas.width, H = canvas.height;
    const pad = { top: 20, right: 20, bottom: 30, left: 35 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const years = [2020, 2021, 2022, 2023, 2024];
    const risingVerbs = MAINS_VERB_TRENDS.filter(v => v.trend === 'rising' || v.verb === 'Discuss');
    const colors = ['#e8760a', '#1a6b3c', '#0f2352', '#c0392b'];

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#e8e0d0'; ctx.lineWidth = 1;
    [0, 5, 10, 15, 20].forEach(val => {
      const y = pad.top + chartH - (val / 22) * chartH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
      ctx.fillStyle = '#aaa'; ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText(val, 2, y + 4);
    });

    // Year labels
    years.forEach((yr, i) => {
      const x = pad.left + (i / (years.length - 1)) * chartW;
      ctx.fillStyle = '#888'; ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(yr, x - 14, H - 6);
    });

    // Lines
    risingVerbs.slice(0, 4).forEach((verb, vi) => {
      const counts = [verb.count2020, verb.count2021, verb.count2022, verb.count2023, verb.count2024];
      ctx.strokeStyle = colors[vi];
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      years.forEach((yr, i) => {
        const x = pad.left + (i / (years.length - 1)) * chartW;
        const y = pad.top + chartH - (counts[i] / 22) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Label at end
      const lastX = pad.left + chartW;
      const lastY = pad.top + chartH - (counts[counts.length - 1] / 22) * chartH;
      ctx.fillStyle = colors[vi];
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.fillText(verb.verb, lastX - 75, lastY - 5);
    });
  }

  // ══════════════════════════════════════════════════════════════
  //  BRAIN 3 — SIMULATED PAPER GENERATOR
  // ══════════════════════════════════════════════════════════════
  function renderSimulatorIntro() {
    const container = document.getElementById('pred-simulator');
    if (!container) return;

    container.innerHTML = `
      <div class="simulator-hero">
        <div class="sim-hero-icon">🎯</div>
        <div class="sim-hero-text">
          <div class="sim-hero-title">Simulated UPSC 2026 Paper</div>
          <div class="sim-hero-sub">AI-generated questions weighted by the probability engine · 25 questions · 30 minutes</div>
        </div>
      </div>

      <div class="sim-config">
        <div class="sim-config-row">
          <label class="sim-config-label">Questions:</label>
          <select id="simQCount" class="mentor-input" style="max-width:120px">
            <option value="10">10 questions</option>
            <option value="15">15 questions</option>
            <option value="25" selected>25 questions</option>
          </select>
        </div>
        <div class="sim-config-row">
          <label class="sim-config-label">Mode:</label>
          <select id="simMode" class="mentor-input" style="max-width:180px">
            <option value="weighted">Probability-weighted</option>
            <option value="gaps">Gap topics only</option>
            <option value="emerging">Emerging waves only</option>
          </select>
        </div>
      </div>

      <div class="sim-probability-summary">
        <div class="sim-prob-title">This paper will be drawn from:</div>
        <div class="sim-prob-bars">
          ${Object.entries({ 'Environment': 28, 'Polity': 22, 'Economy': 19, 'Sci & Tech': 14, 'Governance': 7, 'Others': 10 })
            .map(([s, p]) => `
            <div class="sim-prob-row">
              <div class="sim-prob-name">${s}</div>
              <div class="sim-prob-bar-wrap"><div class="sim-prob-fill" style="width:${p}%;background:${subjectColor(s)}"></div></div>
              <div class="sim-prob-pct">~${Math.round(25 * p / 100)} Q</div>
            </div>`).join('')}
        </div>
      </div>

      <button class="btn btn-primary sim-start-btn" onclick="PredictionEngine.startSimulation()">
        Generate & Start Simulated Paper →
      </button>

      <div class="sim-disclaimer">
        Questions are generated from a curated bank of high-probability topics identified by pattern analysis. Actual UPSC questions may differ. Treat this as a <em>strategic practice instrument</em>.
      </div>
    `;
  }

  function startSimulation() {
    const n = parseInt(document.getElementById('simQCount')?.value || 25);
    state.simulatedPaper = generateSimulatedPaper(n);
    state.simulatedAnswers = {};
    state.currentSimQ = 0;
    renderSimQuestion();
  }

  function renderSimQuestion() {
    const container = document.getElementById('pred-simulator');
    if (!container) return;
    const paper = state.simulatedPaper;
    const idx = state.currentSimQ;
    if (idx >= paper.length) { renderSimResults(); return; }
    const q = paper[idx];
    const answered = state.simulatedAnswers[idx] !== undefined;

    container.innerHTML = `
      <div class="sim-progress-header">
        <div class="sim-prog-meta">
          Simulated Paper · Q${idx + 1} of ${paper.length}
          <span class="sim-prob-tag" style="color:${q.probability_tag.includes('VERY') ? 'var(--red)' : 'var(--saffron)'}">
            ${q.probability_tag}
          </span>
        </div>
        <div class="sim-prog-bar-wrap">
          <div class="sim-prog-fill" style="width:${(idx / paper.length) * 100}%;transition:width 0.4s"></div>
        </div>
        <div class="sim-meta-tags">
          <span class="news-tag tag-${q.subject.toLowerCase().replace(/[ .&]/g,'-')}" style="font-size:0.46rem">${q.subject}</span>
          <span class="mcq-diff diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
          <span style="font-family:var(--mono);font-size:0.48rem;color:var(--dust)">${q.topic}</span>
        </div>
      </div>

      <div class="sim-question">${q.q.replace(/\n/g, '<br>')}</div>

      <div class="sim-options">
        ${q.options.map((opt, i) => {
          let cls = 'sim-option';
          if (answered) {
            if (i === q.correct) cls += ' sim-correct';
            else if (state.simulatedAnswers[idx] === i) cls += ' sim-wrong';
          }
          return `<div class="${cls}" onclick="PredictionEngine.answerSimQ(${idx}, ${i})">
            <span class="sim-opt-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
            ${answered && i === q.correct ? ' <span class="sim-correct-tick">✓</span>' : ''}
          </div>`;
        }).join('')}
      </div>

      ${answered ? `
        <div class="sim-explanation">
          <div class="sim-exp-label">Why this matters for 2026:</div>
          <div class="sim-exp-text">${q.q.includes('Directive') ? 'DPSP questions have been absent since 2017 — a 7-year gap exceeding the average cycle. Article 44 (UCC), 47 (Prohibition), and 48A (Environment) are most likely return points.' :
            q.q.includes('Chandrayaan') ? 'Space technology is a consistently rising category. Chandrayaan-3 is likely to appear in multiple forms — as a factual question, as a context for science policy, or in IR (soft power).' :
            q.q.includes('AI') || q.q.includes('IndiaAI') ? 'AI governance is the fastest-growing question category. Every aspect — IndiaAI Mission, global regulation, India\'s stance at Bletchley — is fair game.' :
            q.q.includes('Collegium') ? 'Judicial appointments and the Collegium debate have intensified with multiple SC judgments on Governor powers and NJAC. A core GS II recurring theme.' :
            'This topic shows strong recent policy activity and pattern analysis flags it as high probability for 2026.'}</div>
        </div>
        <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-top:0.85rem">
          ${idx < paper.length - 1
            ? `<button class="btn btn-primary" onclick="PredictionEngine.nextSimQ()">Next Question →</button>`
            : `<button class="btn btn-primary" onclick="PredictionEngine.renderSimResults()">See Results →</button>`}
          <button class="btn btn-secondary" onclick="PredictionEngine.renderSimulatorIntro()">Restart</button>
        </div>` :
        `<div style="font-family:var(--mono);font-size:0.56rem;color:var(--dust);margin-top:0.5rem;text-align:center">Select an answer to continue</div>`}
    `;
  }

  function answerSimQ(qIdx, optIdx) {
    if (state.simulatedAnswers[qIdx] !== undefined) return;
    state.simulatedAnswers[qIdx] = optIdx;
    const q = state.simulatedPaper[qIdx];
    if (optIdx === q.correct) {
      AppExt?.showXPToast('+12 XP — Correct (simulated paper)');
      if (typeof addXP !== 'undefined') addXP(12, 'Sim paper correct');
    }
    renderSimQuestion();
  }

  function nextSimQ() {
    state.currentSimQ++;
    renderSimQuestion();
  }

  function renderSimResults() {
    const container = document.getElementById('pred-simulator');
    if (!container) return;
    const paper = state.simulatedPaper;
    const correct = paper.filter((q, i) => state.simulatedAnswers[i] === q.correct).length;
    const total = Object.keys(state.simulatedAnswers).length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Subject breakdown
    const bySubject = {};
    paper.forEach((q, i) => {
      if (!bySubject[q.subject]) bySubject[q.subject] = { correct: 0, total: 0 };
      if (state.simulatedAnswers[i] !== undefined) {
        bySubject[q.subject].total++;
        if (state.simulatedAnswers[i] === q.correct) bySubject[q.subject].correct++;
      }
    });

    container.innerHTML = `
      <div class="sim-results">
        <div class="sim-result-header">
          <div class="sim-result-score" style="color:${pct >= 70 ? 'var(--green-india)' : pct >= 50 ? 'var(--saffron)' : 'var(--red)'}">
            ${correct}/${total}
          </div>
          <div>
            <div class="sim-result-pct">${pct}% accuracy</div>
            <div class="sim-result-grade">${pct >= 70 ? 'Excellent — On track' : pct >= 55 ? 'Good — Keep pushing' : pct >= 40 ? 'Average — Focus needed' : 'Below threshold — Intensive revision required'}</div>
          </div>
        </div>

        <div class="sim-result-subj-breakdown">
          ${Object.entries(bySubject).map(([s, d]) => `
            <div class="sim-subj-result">
              <div class="sim-subj-name" style="border-left:3px solid ${subjectColor(s)}">${s}</div>
              <div class="sim-subj-score">${d.correct}/${d.total}</div>
              <div class="sim-subj-bar-wrap">
                <div class="sim-subj-fill" style="width:${d.total>0?(d.correct/d.total*100):0}%;background:${subjectColor(s)}"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="sim-result-advice">
          ${pct < 50 ? `<div class="sim-advice-item urgent">Your score suggests critical preparation gaps. Focus immediately on Environment and Sci & Tech — the two highest-probability subjects in 2026.</div>` : ''}
          ${Object.entries(bySubject).filter(([s,d]) => d.total > 0 && d.correct/d.total < 0.5).map(([s,d]) =>
            `<div class="sim-advice-item"><strong>${s}:</strong> ${d.correct}/${d.total} — Review micro notes and add overdue topics to revision queue.</div>`
          ).join('')}
        </div>

        <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="PredictionEngine.startSimulation()">Retake →</button>
          <button class="btn btn-secondary" onclick="App.switchPanel('mistakes')">Review Mistakes</button>
          <button class="btn btn-secondary" onclick="App.switchPanel('notes')">Study Notes</button>
        </div>
      </div>
    `;
  }

  // ══════════════════════════════════════════════════════════════
  //  PREDICTED MAINS QUESTIONS
  // ══════════════════════════════════════════════════════════════
  function renderPredictedMains() {
    const container = document.getElementById('pred-mains');
    if (!container) return;

    container.innerHTML = `
      <div class="pred-mains-intro">
        These questions are <em>not</em> from past papers. They are AI-generated based on pattern analysis: trending topics + policy discourse + question verb trends. They simulate the <em>style and theme</em> of likely 2026 Mains questions. Use them for practice.
      </div>
      ${PREDICTED_MAINS_QUESTIONS.map(q => `
        <div class="pred-mains-card">
          <div class="pred-mains-header">
            <span class="pred-paper-tag">${q.paper}</span>
            <span class="pred-topic-badge">${q.topic}</span>
            <span class="pred-prob-badge prob-${q.probability.toLowerCase().replace(' ','')}">${q.probability}</span>
          </div>
          <div class="pred-mains-q">${q.question}</div>
          <div class="pred-mains-reason">
            <span class="pred-reason-label">Pattern reasoning:</span> ${q.reasoning}
          </div>
          <button class="layer-expand-btn" style="margin-top:0.6rem" onclick="App.switchPanel('mains')">Practice in Mains Lab →</button>
        </div>
      `).join('')}
    `;
  }

  // ══════════════════════════════════════════════════════════════
  //  HELPERS
  // ══════════════════════════════════════════════════════════════
  function computeTopicScore(topic) {
    const gapBoost = topic.gap_flag ? Math.min(3.5, topic.currentGap * 0.5) : 0;
    const trendMult = { 'strongly_rising':1.35, 'rising':1.15, 'stable':1.0, 'watch':0.9, 'declining':0.75, 'gap_due':1.45 }[topic.trend] || 1.0;
    const policyBoost = Math.min(1.8, topic.policyLinks.length * 0.3);
    const recencyPenalty = topic.lastYear === 2024 ? 0.88 : topic.lastYear === 2023 ? 0.93 : 1.0;
    const currentGapBoost = topic.currentGap >= 5 ? 1.6 : topic.currentGap >= 3 ? 1.3 : 1.0;
    const finalScore = (topic.weight + gapBoost + policyBoost) * trendMult * recencyPenalty * currentGapBoost;
    return { finalScore };
  }

  function probabilityLabel(score) {
    if (score >= 14) return '🔴 VERY HIGH';
    if (score >= 12) return '🟠 HIGH';
    if (score >= 10) return '🟡 MEDIUM';
    if (score >= 8)  return '🟢 WATCH';
    return '⚪ LOW';
  }

  function subjectColor(subj) {
    const map = {
      'Polity': '#0f2352', 'Economy': '#1a6b3c', 'Environment': '#2d7a1f',
      'History': '#b87c20', 'Geography': '#1a7a8c', 'Sci & Tech': '#7a3bbf',
      'Governance': '#e8760a', 'Int. Relations': '#3b7abf', 'Misc/Current': '#888',
    };
    return map[subj] || '#555';
  }

  function getSubjectTrend(subj) {
    const trends = {
      'Environment': { key: 'strongly_rising', arrow: '▲▲', label: 'Surging' },
      'Polity': { key: 'stable', arrow: '→', label: 'Stable' },
      'Economy': { key: 'rising', arrow: '▲', label: 'Rising' },
      'Sci & Tech': { key: 'strongly_rising', arrow: '▲▲', label: 'Surging' },
      'Governance': { key: 'rising', arrow: '▲', label: 'Rising' },
      'Int. Relations': { key: 'rising', arrow: '▲', label: 'Rising' },
      'History': { key: 'declining', arrow: '▼', label: 'Declining' },
      'Geography': { key: 'declining', arrow: '▼', label: 'Declining' },
    };
    return trends[subj] || { key: 'stable', arrow: '→', label: 'Stable' };
  }

  function generateStudyAdvice(topic) {
    if (topic.trend === 'strongly_rising' || topic.trend === 'rising') {
      return `This is a <strong>rising topic</strong>. Expect 2–4 questions in Prelims 2026. Study at all three depths: micro note → brief → deep. Focus especially on: ${topic.policyLinks.slice(0, 2).join(', ') || 'recent policy developments'}.`;
    }
    if (topic.gap_flag) {
      return `This topic is <strong>overdue for return</strong> after a ${topic.currentGap}-year absence (average cycle: ${topic.avgGap.toFixed(1)} years). High-confidence prediction. Revise fundamentals thoroughly — expect a conceptual or analytical angle, not pure recall.`;
    }
    return `Standard preparation applies. Study the constitutional/policy foundation, 2–3 relevant cases or examples, and a contemporary angle. Difficulty likely Medium.`;
  }

  return {
    init, switchTab, drillSubject, showTopicDetail,
    updateFreqChart, startSimulation, answerSimQ,
    nextSimQ, renderSimResults, renderSimulatorIntro,
    renderFrequencyTable,
  };

})();
