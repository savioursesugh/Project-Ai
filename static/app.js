const chatEl = document.getElementById('chat');
const form = document.getElementById('promptForm');
const promptInput = document.getElementById('prompt');
const tempInput = document.getElementById('temperature');

function appendMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = 'message ' + role;
  msg.innerText = text;
  chatEl.appendChild(msg);
  chatEl.scrollTop = chatEl.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();
  if (!prompt) return;
  appendMessage('user', prompt);
  promptInput.value = '';

  appendMessage('assistant', 'Thinking...');
  const assistantPlaceholder = chatEl.querySelector('.assistant:last-child');

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, temperature: parseFloat(tempInput.value) })
    });

    if (!res.ok) {
      const err = await res.json();
      assistantPlaceholder.innerText = 'Error: ' + (err?.error || res.statusText);
      return;
    }

    const { text } = await res.json();
    assistantPlaceholder.innerText = text;
  } catch (err) {
    assistantPlaceholder.innerText = 'Error: ' + err.message;
  }
});
