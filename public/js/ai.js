// ══════════════════════════════════════════════
// AI CORE (Gemini Integration)
// ══════════════════════════════════════════════
const AI = (() => {
  let apiKey = localStorage.getItem('GEMINI_API_KEY') || null;

  function hasKey() {
    return !!apiKey;
  }

  function setKey(key) {
    apiKey = key;
    localStorage.setItem('GEMINI_API_KEY', key);
    document.dispatchEvent(new Event('ai-connected'));
  }

  function renderSetup(elId, minimal = false) {
    const el = document.getElementById(elId);
    if (!el) return;

    el.innerHTML = `
      <div class="ai-setup-box">
        <h3>Connect AI</h3>
        <input type="password" id="aiKeyInput" placeholder="Enter Gemini API Key" />
        <button onclick="AI.saveKey()">Connect</button>
      </div>
    `;
  }

  function saveKey() {
    const input = document.getElementById('aiKeyInput');
    if (!input || !input.value.trim()) return;
    setKey(input.value.trim());
  }

  // 🔥 CORE ASK FUNCTION
  async function askMentor(prompt, history = []) {
    if (!apiKey) throw new Error('NO_KEY');

    const systemPrompt = `
You are a UPSC mentor.
Explain clearly in structured format.
Use headings, examples, and crisp bullet points.
Keep answers exam-oriented.
`;

    const messages = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...history.map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.text }]
      })),
      { role: "user", parts: [{ text: prompt }] }
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: messages })
      }
    );

    const data = await res.json();

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid AI response');
    }

    return data.candidates[0].content.parts[0].text;
  }

  return {
    hasKey,
    setKey,
    saveKey,
    renderSetup,
    askMentor
  };
})();


// ══════════════════════════════════════════════
// MENTOR PANEL CONTROLLER (PRO VERSION)
// ══════════════════════════════════════════════
const MENTOR = (() => {
  let history = [];
  let isTyping = false;

  const QUICK_PROMPTS = [
    'Explain Basic Structure Doctrine simply',
    'Difference between Fundamental Rights and DPSP',
    'What is fiscal deficit vs revenue deficit?',
    'Explain CBDR principle in climate negotiations',
    'How does MPC control inflation?',
    'What are the types of writs?',
    'Explain cooperative federalism with examples',
    'What is the significance of Puttaswamy judgment?',
    'Explain India\'s nuclear triad',
    'What is the difference between GS-II and GS-III?',
  ];

  function render() {
    const el = document.getElementById('panel-mentor');
    if (!el) return;

    if (!AI.hasKey()) {
      el.innerHTML = `
        <div class="panel-header">
          <h1>🤖 AI Mentor</h1>
          <div class="panel-subtitle">Your personal UPSC guide</div>
        </div>
        <div id="mentor-setup-area"></div>`;
      AI.renderSetup('mentor-setup-area', true);
      document.addEventListener('ai-connected', render, { once: true });
      return;
    }

    el.innerHTML = `
      <div class="panel-header">
        <h1>🤖 AI Mentor</h1>
        <div class="panel-subtitle">Ask anything · UPSC-focused · Context-aware</div>
      </div>

      <div class="mentor-status-bar">
        <div class="msb-model">Gemini 1.5 Flash · UPSC Mode</div>
        <button onclick="MENTOR.clearChat()">Clear Chat</button>
      </div>

      <div class="mentor-quick-row" id="mentorQuickRow">
        ${QUICK_PROMPTS.slice(0, 5).map(p =>
          `<button class="quick-chip" data-q="${encodeURIComponent(p)}">${p}</button>`
        ).join('')}
      </div>

      <div class="mentor-chat-window" id="mentorChatWindow"></div>

      <div class="mentor-input-area">
        <textarea id="mentorInput" placeholder="Ask your doubt..."></textarea>
        <button id="mentorSendBtn">Send</button>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    document.getElementById('mentorSendBtn')?.addEventListener('click', send);

    document.addEventListener('click', e => {
      if (e.target.classList.contains('quick-chip')) {
        sendQuick(decodeURIComponent(e.target.dataset.q));
      }
    });
  }

  async function send() {
    if (isTyping) return;

    const input = document.getElementById('mentorInput');
    const btn = document.getElementById('mentorSendBtn');

    let text = input.value.trim();
    if (!text) return;

    input.value = '';

    appendBubble('user', text);
    history.push({ role: 'user', text });

    if (text.toLowerCase().includes('answer')) {
      text = "Write in UPSC format:\n" + text;
    }

    isTyping = true;
    btn.disabled = true;
    btn.innerText = 'Thinking...';

    const typingId = 'typing';
    appendTyping(typingId);

    try {
      const reply = await AI.askMentor(text, history.slice(0, -1));

      removeTyping(typingId);
      appendBubble('assistant', reply);

      history.push({ role: 'assistant', text: reply });

      if (history.length > 20) {
        history = history.slice(-20);
      }

    } catch (err) {
      removeTyping(typingId);
      appendBubble('error', 'Error: ' + err.message);
    }

    isTyping = false;
    btn.disabled = false;
    btn.innerText = 'Send';
  }

  function sendQuick(text) {
    document.getElementById('mentorInput').value = text;
    send();
  }

  function appendBubble(role, text) {
    const win = document.getElementById('mentorChatWindow');

    const div = document.createElement('div');
    div.className = `bubble ${role}`;
    div.innerHTML = text;

    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
  }

  function appendTyping(id) {
    const win = document.getElementById('mentorChatWindow');
    const div = document.createElement('div');
    div.id = id;
    div.innerText = 'Typing...';
    win.appendChild(div);
  }

  function removeTyping(id) {
    document.getElementById(id)?.remove();
  }

  function clearChat() {
    history = [];
    document.getElementById('mentorChatWindow').innerHTML = '';
  }

  return { render, send, clearChat };
})();