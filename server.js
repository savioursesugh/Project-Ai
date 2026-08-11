const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY not set. Add it to your environment or .env file.');
}

app.use(cors());
app.use(express.json());
app.use(express.static('static'));

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, temperature } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt is required' });

    // Call OpenAI Chat Completions API (v1)
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Deep Think, a helpful, concise, and creative assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      max_tokens: 800
    };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return res.status(resp.status).json({ error: errText });
    }

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content || '';
    res.json({ text, raw: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'server error' });
  }
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(require('path').resolve(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Project-Ai server listening on http://localhost:${PORT}`);
});
