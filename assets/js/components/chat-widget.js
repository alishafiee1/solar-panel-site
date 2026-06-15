/**
 * chat-widget.js --- Floating support chat connected to n8n webhook ---
 * ویجت چت شناور متصل به webhook مربوط به n8n
 */
let chatOpen = false;
let isWaiting = false;
let n8nWebhookUrl = localStorage.getItem('n8n_webhook_url') || '';

let messagesEl;
let inputEl;
let sendBtn;
let n8nInput;
let statusDot;

function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chat-box').classList.toggle('open', chatOpen);
  document.querySelector('.icon-chat').style.display = chatOpen ? 'none' : 'block';
  document.querySelector('.icon-close').style.display = chatOpen ? 'block' : 'none';
  document.getElementById('chat-badge').style.opacity = chatOpen ? '0' : '1';
  if (chatOpen) setTimeout(() => inputEl.focus(), 250);
}

function saveN8nUrl() {
  const url = n8nInput.value.trim();
  if (!url) return;
  n8nWebhookUrl = url;
  localStorage.setItem('n8n_webhook_url', url);
  statusDot.classList.add('connected');
  statusDot.style.background = '#27C93F';
  addMessage('bot', '✅ اتصال به n8n برقرار شد! حالا می‌تونید پیام بفرستید.');
}

function getTimeStr() {
  const now = new Date();
  return now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
}

function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  const avatarHTML = role === 'bot'
    ? '<div class="msg-avatar bot"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M12 2C6.48 2 2 6.02 2 11c0 2.76 1.32 5.22 3.4 6.9L4 22l4.42-1.47A10 10 0 0012 21c5.52 0 10-4.02 10-9s-4.48-9-10-9z"/></svg></div>'
    : '<div class="msg-avatar user"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>';
  div.innerHTML = `${avatarHTML}<div class="msg-content"><div class="msg-bubble">${text}</div><div class="msg-time">${getTimeStr()}</div></div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function sendSuggestion(text) {
  document.getElementById('chat-input').value = text;
  sendMessage();
  document.getElementById('chat-suggestions').style.display = 'none';
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typing-msg';
  div.innerHTML = '<div class="msg-avatar bot"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M12 2C6.48 2 2 6.02 2 11c0 2.76 1.32 5.22 3.4 6.9L4 22l4.42-1.47A10 10 0 0012 21c5.52 0 10-4.02 10-9s-4.48-9-10-9z"/></svg></div><div class="typing-indicator"><span></span><span></span><span></span></div>';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  const typingMessage = document.getElementById('typing-msg');
  if (typingMessage) typingMessage.remove();
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text || isWaiting) return;

  if (!n8nWebhookUrl) {
    addMessage('bot', '⚠️ لطفاً ابتدا آدرس Webhook مربوط به n8n رو وارد کنید.');
    return;
  }

  addMessage('user', text);
  inputEl.value = '';
  sendBtn.disabled = true;
  isWaiting = true;
  showTyping();

  try {
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, timestamp: new Date().toISOString(), source: 'support-chat' }),
    });

    const data = await response.json();
    hideTyping();

    const reply = data.reply || data.output || data.message || data.text || data.response
      || (Array.isArray(data) && (data[0]?.reply || data[0]?.output || data[0]?.message))
      || '✅ پیام دریافت شد.';

    addMessage('bot', reply);
  } catch (error) {
    hideTyping();
    addMessage('bot', '⚠️ خطا در اتصال به n8n. مطمئن شوید workflow فعال و CORS فعال باشه.');
    console.error('n8n error:', error);
  }

  sendBtn.disabled = false;
  isWaiting = false;
  inputEl.focus();
}

function initializeChatWidget() {
  messagesEl = document.getElementById('chat-messages');
  inputEl = document.getElementById('chat-input');
  sendBtn = document.getElementById('chat-send');
  n8nInput = document.getElementById('n8n-url-input');
  statusDot = document.getElementById('n8n-status-dot');

  if (n8nWebhookUrl) {
    n8nInput.value = n8nWebhookUrl;
    statusDot.classList.add('connected');
  }

  const initTimeElement = document.getElementById('init-time');
  if (initTimeElement) initTimeElement.textContent = getTimeStr();

  inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
}

document.addEventListener('partials:loaded', initializeChatWidget);

if (document.getElementById('chat-input')) {
  initializeChatWidget();
}
