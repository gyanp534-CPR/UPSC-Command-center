/* ╔══════════════════════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — ai.js (Fixed)                         ║
   ║  Google Gemini 2.0 Flash — Free tier                    ║
   ╚══════════════════════════════════════════════════════════╝ */

const AI = (() => {

  // ── Config ──────────────────────────────────────────────
  const MODEL    = 'gemini-2.5-pro';
  const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
  const KEY_STORE = 'cosmos_gemini_key';

  // ── Key Management ───────────────────────────────────────
  function getKey()       { return localStorage.getItem(KEY_STORE) || ''; }
  function saveKey(key)   { localStorage.setItem(KEY_STORE, key.trim()); }
  function hasKey()       { return getKey().length > 10; }
  function clearKey()     { localStorage.removeItem(KEY_STORE); }

  // ── Core API Call ────────────────────────────────────────
  async function call(prompt, systemInstruction = '', opts = {}) {
    const key = getKey();
    if (!key) throw new Error('NO_KEY');

    const url = `${BASE_URL}/${MODEL}:generateContent?key=${key}`;

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature:     opts.temperature    ?? 0.7,
        maxOutputTokens: opts.maxTokens      ?? 800,
        topP:            opts.topP           ?? 0.9,
      },
    };

    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    console.log('[AI] Calling Gemini...', { model: MODEL, promptLen: prompt.length });

    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || `HTTP ${res.status}`;
      console.error('[AI] API Error:', msg, data);
      throw new Error(msg);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[AI] Response received, length:', text.length);
    return text;
  }

  // ── Multi-turn Chat ──────────────────────────────────────
  async function chat(history, systemInstruction = '', opts = {}) {
    const key = getKey();
    if (!key) throw new Error('NO_KEY');

    const url = `${BASE_URL}/${MODEL}:generateContent?key=${key}`;

    const contents = history.map(h => ({
      role:  h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.text }],
    }));

    const body = {
      contents,
      generationConfig: {
        temperature:     opts.temperature    ?? 0.75,
        maxOutputTokens: opts.maxTokens      ?? 1000,
        topP:            opts.topP           ?? 0.9,
      },
    };

    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const res  = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || `HTTP ${res.status}`;
      console.error('[AI] Chat Error:', msg);
      throw new Error(msg);
    }

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  // ── UPSC System Context ──────────────────────────────────
  function buildUPSCContext(role = 'mentor') {
    const diagLevel = (typeof STATE !== 'undefined' && STATE.diagResult?.level) || 'intermediate';
    const weakNodes = typeof STATE !== 'undefined'
      ? Object.entries(STATE.mastery || {})
          .filter(([, v]) => v < 40)
          .map(([k]) => {
            const n = (KNOWLEDGE_GRAPH?.nodes || []).find(x => x.id === k);
            return n ? n.topic : null;
          })
          .filter(Boolean)
          .slice(0, 5)
      : [];

    const contexts = {
      mentor: `You are an expert UPSC Civil Services mentor with 15+ years of experience helping Indian aspirants crack the IAS exam.
You are currently helping a ${diagLevel}-level aspirant.
${weakNodes.length ? `Their weak areas are: ${weakNodes.join(', ')}.` : ''}

Rules:
- Be precise and exam-focused
- Always link answers to UPSC syllabus
- Quote Articles, Cases, Committees, Schemes by name
- Use structure: Definition → Context → Significance → UPSC Angle
- End with one exam tip when relevant
- Keep responses concise but complete`,

      essay: `You are a senior UPSC Mains examiner evaluating answer scripts.
Evaluate strictly from an IAS exam perspective.
Give realistic scores — do not inflate.
Return ONLY valid JSON, no markdown backticks, no extra text.`,

      mcq_gen: `You are an experienced UPSC question paper setter.
Generate questions that match actual UPSC Prelims style.
Rules:
- All 4 options must be plausible
- Test application not just recall  
- Use "Consider the following statements" format where appropriate
- Return ONLY a valid JSON array, no markdown, no extra text`,

      news: `You are a UPSC Current Affairs expert who maps news to exam syllabus.
Return ONLY a valid JSON object, no markdown, no extra text.`,
    };

    return contexts[role] || contexts.mentor;
  }

  // ── Feature Functions ────────────────────────────────────

  async function askMentor(userMessage, history = []) {
    const sys  = buildUPSCContext('mentor');
    const msgs = [...history, { role: 'user', text: userMessage }];
    return await chat(msgs, sys, { maxTokens: 1000, temperature: 0.7 });
  }

  async function evaluateEssay(essayText, topic, keywords = []) {
    const sys    = buildUPSCContext('essay');
    const prompt = `TOPIC: "${topic}"
KEYWORDS: ${keywords.join(', ')}
ESSAY:
${essayText}

Return this JSON only:
{"score":0,"grade":"","strengths":[],"weaknesses":[],"missing_dimensions":[],"missing_keywords":[],"model_sentence":"","overall_feedback":""}`;

    const raw = await call(prompt, sys, { maxTokens: 800, temperature: 0.3 });
    try {
      return JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      console.error('[AI] Essay JSON parse failed:', raw.slice(0, 200));
      return {
        score: 50,
        grade: 'Average',
        overall_feedback: raw,
        strengths: ['Answer submitted'],
        weaknesses: ['Could not parse detailed evaluation'],
        missing_dimensions: [],
        missing_keywords: [],
        model_sentence: '',
      };
    }
  }

  async function generateMCQ(topic, subject, count = 3, difficulty = 'medium') {
    const sys    = buildUPSCContext('mcq_gen');
    const prompt = `Generate exactly ${count} UPSC Prelims MCQs on: "${topic}" (${subject}). Difficulty: ${difficulty}.

Return a JSON array only, no other text:
[{"q":"question","opts":["A","B","C","D"],"ans":0,"explain":"explanation","wrongExplain":"why others are wrong"}]`;

    const raw = await call(prompt, sys, { maxTokens: 1500, temperature: 0.5 });

    // Try to extract JSON array from response
    let cleaned = raw.replace(/```json|```/g, '').trim();

    // Find array boundaries in case there's extra text
    const startIdx = cleaned.indexOf('[');
    const endIdx   = cleaned.lastIndexOf(']');
    if (startIdx !== -1 && endIdx !== -1) {
      cleaned = cleaned.slice(startIdx, endIdx + 1);
    }

    try {
      const parsed = JSON.parse(cleaned);
      if (!Array.isArray(parsed)) throw new Error('Not an array');
      return parsed;
    } catch (e) {
      console.error('[AI] MCQ JSON parse failed:', cleaned.slice(0, 300));
      throw new Error('AI returned malformed JSON. Try again.');
    }
  }

  async function analyzeNews(headline, body = '') {
    const sys    = buildUPSCContext('news');
    const prompt = `News: "${headline}"${body ? '\nDetails: ' + body : ''}

Return this JSON only:
{"core_issue":"","gs_paper":"GS-II","syllabus_topics":[],"pyq_angle":"","key_terms":[],"mcq":{"q":"","opts":["","","",""],"ans":0,"explain":""}}`;

    const raw = await call(prompt, sys, { maxTokens: 900, temperature: 0.4 });

    let cleaned = raw.replace(/```json|```/g, '').trim();
    const startIdx = cleaned.indexOf('{');
    const endIdx   = cleaned.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      cleaned = cleaned.slice(startIdx, endIdx + 1);
    }

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('[AI] News JSON parse failed:', cleaned.slice(0, 300));
      throw new Error('AI returned malformed JSON. Try again.');
    }
  }

  // ── Setup UI ─────────────────────────────────────────────
  function renderSetup(containerId, reload = false) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="ai-setup-card">
        <div class="asc-icon">🤖</div>
        <div class="asc-title">Connect AI Engine</div>
        <div class="asc-desc">
          Get a free Google Gemini API key at <strong>aistudio.google.com</strong>
        </div>
        <div class="asc-steps">
          <div class="asc-step">1. Go to <code>aistudio.google.com</code></div>
          <div class="asc-step">2. Click <strong>Get API Key → Create API Key</strong></div>
          <div class="asc-step">3. Copy and paste below</div>
        </div>
        <div class="asc-input-row">
          <input type="password" id="geminiKeyInput" class="ai-key-input"
            placeholder="AIzaSy..." autocomplete="off" spellcheck="false"/>
          <button class="btn-primary" onclick="AI.submitKey('${containerId}', ${reload})">
            Connect →
          </button>
        </div>
        <div id="asc_error_${containerId}" style="display:none;color:var(--red);font-size:12px;margin-top:8px;text-align:left"></div>
        <div class="asc-privacy">🔒 Key stored only in your browser. Never sent anywhere except Google's API.</div>
      </div>`;
  }

  async function submitKey(containerId, reload = false) {
    const input  = document.getElementById('geminiKeyInput');
    const errEl  = document.getElementById('asc_error_' + containerId);
    const el     = document.getElementById(containerId);
    if (!input) return;

    const key = input.value.trim();
    if (key.length < 20) {
      if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Key too short — check and try again.'; }
      return;
    }

    // Show testing state
    input.disabled = true;
    if (el) el.style.opacity = '0.7';
    if (errEl) errEl.style.display = 'none';
    const btn = input.nextElementSibling;
    if (btn) { btn.disabled = true; btn.textContent = 'Testing...'; }

    try {
      saveKey(key);
      const test = await call('Reply with just the word: CONNECTED', '', { maxTokens: 10 });
      console.log('[AI] Key test result:', test);

      if (typeof showXPToast === 'function') showXPToast('🤖 AI Engine connected!');

      if (reload) {
        navigate(STATE.currentPanel);
      } else {
        document.dispatchEvent(new CustomEvent('ai-connected'));
      }
    } catch (err) {
      clearKey();
      if (el) el.style.opacity = '1';
      input.disabled = false;
      if (btn) { btn.disabled = false; btn.textContent = 'Connect →'; }
      if (errEl) {
        errEl.style.display = 'block';
        if (err.message.includes('API_KEY_INVALID') || err.message.includes('invalid')) {
          errEl.textContent = 'Invalid API key. Double-check and try again.';
        } else if (err.message.includes('quota') || err.message.includes('429')) {
          errEl.textContent = 'Rate limit hit. Wait a minute and try again.';
        } else {
          errEl.textContent = 'Error: ' + err.message;
        }
      }
    }
  }

  // ── UI Helpers ───────────────────────────────────────────
  function loadingHTML(message = 'AI is thinking...') {
    return `<div class="ai-loading">
      <div class="ai-loading-dots"><span></span><span></span><span></span></div>
      <div class="ai-loading-text">${message}</div>
    </div>`;
  }

  function errorHTML(message, retryFn = '') {
    return `<div class="ai-error">
      ⚠️ ${message}
      ${retryFn ? `<br><button class="btn-sm ghost" onclick="${retryFn}" style="margin-top:8px">Retry</button>` : ''}
    </div>`;
  }

  function renderSettings(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const connected = hasKey();
    el.innerHTML = `<div class="ai-settings-card">
      <div class="ais-status ${connected ? 'connected' : 'disconnected'}">
        ${connected ? '🟢 AI Connected' : '🔴 Not Connected'}
      </div>
      ${connected
        ? `<div style="font-size:12px;color:var(--text3);margin:10px 0">Key: ${getKey().slice(0,8)}••••</div>
           <button class="btn-sm ghost" onclick="AI.disconnectKey()">Disconnect</button>`
        : `<button class="btn-primary" style="margin-top:12px" onclick="navigate('mentor')">Connect Key →</button>`
      }
    </div>`;
  }

  function disconnectKey() {
    if (confirm('Disconnect AI? You can reconnect anytime.')) {
      clearKey();
      if (typeof navigate === 'function') navigate('home');
      if (typeof showXPToast === 'function') showXPToast('AI disconnected.');
    }
  }

  return {
    hasKey, getKey, saveKey, clearKey,
    call, chat,
    askMentor, evaluateEssay, generateMCQ, analyzeNews,
    buildUPSCContext,
    renderSetup, submitKey, renderSettings, disconnectKey,
    loadingHTML, errorHTML,
  };

})();


// ══════════════════════════════════════════════
// MENTOR PANEL
// ══════════════════════════════════════════════
const MENTOR = (() => {
  let history  = [];
  let isTyping = false;

  const QUICK_PROMPTS = [
    'Explain Basic Structure Doctrine simply',
    'Difference between Fundamental Rights and DPSP',
    'What is fiscal deficit vs primary deficit?',
    'Explain CBDR principle in climate talks',
    'How does MPC control inflation in India?',
    'What are the 5 types of writs?',
    'Explain cooperative federalism with examples',
    'Significance of Puttaswamy judgment 2017',
  ];

  function render() {
    const el = document.getElementById('panel-mentor');
    if (!el) return;

    if (!AI.hasKey()) {
      el.innerHTML = `
        <div class="panel-header">
          <h1>🤖 AI Mentor</h1>
          <div class="panel-subtitle">Your personal UPSC AI guide</div>
        </div>
        <div id="mentor-setup-area"></div>`;
      AI.renderSetup('mentor-setup-area', true);
      return;
    }

    el.innerHTML = `
      <div class="panel-header">
        <h1>🤖 AI Mentor</h1>
        <div class="panel-subtitle">Ask anything · UPSC context-aware · Powered by Gemini</div>
      </div>
      <div class="mentor-status-bar">
        <div class="msb-model">✅ Gemini 2.0 Flash · UPSC Mode</div>
        <button class="msb-clear" onclick="MENTOR.clearChat()">Clear Chat</button>
      </div>
      <div class="mentor-quick-row" id="mentorQuickRow">
        <div class="mqr-label">Quick asks:</div>
        <div class="mqr-chips">
          ${QUICK_PROMPTS.map(p =>
            `<button class="quick-chip" onclick="MENTOR.sendQuick(this.dataset.p)" data-p="${p}">${p}</button>`
          ).join('')}
        </div>
      </div>
      <div class="mentor-chat-window" id="mentorChatWindow">
        <div class="mentor-welcome">
          <div class="mw-icon">🤖</div>
          <div class="mw-text">Namaste! Ask me anything about UPSC — concepts, PYQs, strategy, or current affairs.</div>
        </div>
      </div>
      <div class="mentor-input-area">
        <textarea id="mentorInput" class="mentor-textarea" rows="2"
          placeholder="Type your doubt... (Ctrl+Enter to send)"
          onkeydown="MENTOR.handleKey(event)"></textarea>
        <button class="mentor-send-btn" id="mentorSendBtn" onclick="MENTOR.send()">
          Send ↑
        </button>
      </div>
      <div class="mentor-input-hint">Ctrl+Enter to send · Shift+Enter for new line</div>`;

    if (history.length > 0) {
      history.forEach(msg => appendBubble(msg.role, msg.text, false));
    }
  }

  function handleKey(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  }

  async function send() {
    if (isTyping) return;
    const input = document.getElementById('mentorInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    const qr = document.getElementById('mentorQuickRow');
    if (qr) qr.style.display = 'none';

    appendBubble('user', text, true);
    history.push({ role: 'user', text });

    isTyping = true;
    const btn = document.getElementById('mentorSendBtn');
    if (btn) btn.disabled = true;
    input.disabled = true;

    const typingId = 'typing_' + Date.now();
    appendTyping(typingId);

    try {
      const reply = await AI.askMentor(text, history.slice(0, -1));
      removeTyping(typingId);
      appendBubble('assistant', reply, true);
      history.push({ role: 'assistant', text: reply });
      if (history.length > 20) history = history.slice(-20);
    } catch (err) {
      removeTyping(typingId);
      const msg = err.message === 'NO_KEY'
        ? 'API key missing. Please reconnect.'
        : '⚠️ ' + err.message;
      appendBubble('error', msg, true);
    }

    isTyping = false;
    if (btn) btn.disabled = false;
    input.disabled = false;
    input.focus();
  }

  function sendQuick(text) {
    const input = document.getElementById('mentorInput');
    if (input) { input.value = text; send(); }
  }

  function appendBubble(role, text, scroll = true) {
    const win = document.getElementById('mentorChatWindow');
    if (!win) return;
    const div = document.createElement('div');
    div.className = `mentor-bubble ${role}`;
    if (role === 'assistant') {
      div.innerHTML = `<div class="mb-avatar">🤖</div><div class="mb-content">${formatText(text)}</div>`;
    } else if (role === 'user') {
      div.innerHTML = `<div class="mb-content">${escapeHTML(text)}</div><div class="mb-avatar user-avatar">👤</div>`;
    } else {
      div.innerHTML = `<div class="mb-content error-bubble">${text}</div>`;
    }
    win.appendChild(div);
    if (scroll) win.scrollTop = win.scrollHeight;
  }

  function appendTyping(id) {
    const win = document.getElementById('mentorChatWindow');
    if (!win) return;
    const div = document.createElement('div');
    div.className = 'mentor-bubble assistant';
    div.id = id;
    div.innerHTML = `<div class="mb-avatar">🤖</div><div class="mb-content"><div class="ai-loading-dots"><span></span><span></span><span></span></div></div>`;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
  }

  function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function clearChat() {
    history = [];
    const win = document.getElementById('mentorChatWindow');
    if (win) win.innerHTML = `<div class="mentor-welcome"><div class="mw-icon">🤖</div><div class="mw-text">Chat cleared. Ask me anything!</div></div>`;
    const qr = document.getElementById('mentorQuickRow');
    if (qr) qr.style.display = 'flex';
  }

  function formatText(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`(.+?)`/g,'<code>$1</code>')
      .replace(/^### (.+)$/gm,'<div class="ai-h3">$1</div>')
      .replace(/^## (.+)$/gm,'<div class="ai-h2">$1</div>')
      .replace(/^# (.+)$/gm,'<div class="ai-h1">$1</div>')
      .replace(/^[-•] (.+)$/gm,'<div class="ai-li">▸ $1</div>')
      .replace(/\n\n/g,'<br><br>')
      .replace(/\n/g,'<br>');
  }

  function escapeHTML(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  }

  return { render, send, sendQuick, clearChat, handleKey };
})();
