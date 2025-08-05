// Selectors
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const inputForm = document.getElementById('input-area');

// Chatbot predefined responses
const botResponses = [
  "Hello! How can I assist you today?",
  "I'm here to help! What do you want to talk about?",
  "That's interesting!",
  "Could you tell me more?",
  "I see, thanks for sharing!",
  "Let me think about that...",
  "I'm not sure about that, but I'll try to help!",
  "Can you clarify your question?",
  "Thanks for your message!",
  "Have a great day!"
];

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem('chat_messages')) || [];

// Format timestamp
function formatTimestamp(date) {
  return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Scroll to bottom
function scrollToBottom() {
  chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}

// Add message to chat
function addMessage(text, type, timestamp = new Date()) {
  messages.push({text, type, timestamp: timestamp.toISOString()});
  localStorage.setItem('chat_messages', JSON.stringify(messages));

  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', type);

  const textNode = document.createTextNode(text);
  msgDiv.appendChild(textNode);

  const timeSpan = document.createElement('div');
  timeSpan.classList.add('timestamp');
  timeSpan.textContent = formatTimestamp(new Date(timestamp));
  msgDiv.appendChild(timeSpan);

  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Render stored messages
function renderMessagesWithoutSaving() {
  chatBox.innerHTML = '';
  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', msg.type);

    const textNode = document.createTextNode(msg.text);
    msgDiv.appendChild(textNode);

    const timeSpan = document.createElement('div');
    timeSpan.classList.add('timestamp');
    timeSpan.textContent = formatTimestamp(new Date(msg.timestamp));
    msgDiv.appendChild(timeSpan);

    chatBox.appendChild(msgDiv);
  });
  scrollToBottom();
}

// Random bot reply
function botReply() {
  const delay = 500 + Math.random() * 1000;
  setTimeout(() => {
    const response = botResponses[Math.floor(Math.random() * botResponses.length)];
    addMessage(response, 'received');
  }, delay);
}

// Button state handler
chatInput.addEventListener('input', () => {
  sendBtn.disabled = chatInput.value.trim().length === 0;
});

// Message submit handler
inputForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, 'sent');
  chatInput.value = '';
  sendBtn.disabled = true;

  botReply();
});

// Init
window.onload = () => {
  renderMessagesWithoutSaving();
  chatInput.focus();
};
