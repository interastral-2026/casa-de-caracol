const imgLeftToRight = "https://files.catbox.moe/t3ngct.gif";
const imgRightToLeft = "images/chaticon2.gif";
const imgClicked = "images/chaticon3.gif";

const chatIcon = document.getElementById('chat-icon');
const chatAvatar = document.getElementById('chat-avatar');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatClose = document.getElementById('chat-close');

let goingRight = true;
chatAvatar.src = imgLeftToRight;

function checkDirectionAndUpdate() {
  if (chatIcon.classList.contains('paused')) return;

  const style = getComputedStyle(chatIcon);
  const leftPx = parseFloat(style.left) || 0;
  const rightThreshold = window.innerWidth - 100;

  if (leftPx > rightThreshold && goingRight) {
    goingRight = false;
    chatAvatar.src = imgRightToLeft;
  } else if (leftPx < 0 && !goingRight) {
    goingRight = true;
    chatAvatar.src = imgLeftToRight;
  }
}

setInterval(checkDirectionAndUpdate, 200);

chatIcon.addEventListener('click', () => {
  const isOpen = chatWindow.style.display === 'flex';

  if (isOpen) {
    chatWindow.style.display = 'none';
    chatIcon.classList.remove('paused');
    chatAvatar.src = goingRight ? imgLeftToRight : imgRightToLeft;
  } else {
    chatWindow.style.display = 'flex';
    chatIcon.classList.add('paused');
    chatAvatar.src = imgClicked;
  }
});

chatClose.addEventListener('click', () => {
  chatWindow.style.display = 'none';
  chatIcon.classList.remove('paused');
  chatAvatar.src = goingRight ? imgLeftToRight : imgRightToLeft;
});

function addMessage(text, from = 'user') {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.style.alignSelf = from === 'user' ? 'flex-end' : 'flex-start';
  msg.style.background = from === 'user' ? '#16c0a8' : '#0e1624';
  msg.style.color = from === 'user' ? '#041226' : '#eaf6f3';
  msg.style.padding = '10px 14px';
  msg.style.borderRadius = '12px';
  msg.style.maxWidth = '80%';
  msg.style.wordBreak = 'break-word';
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  chatInput.value = '';

  try {
    const res = await fetch('YOUR_MAKE_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    addMessage(data.reply || 'Sem resposta disponível', 'bot');
  } catch (err) {
    addMessage('Erro ao enviar mensagem', 'bot');
  }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
