# Project-Ai

A minimal full-stack AI app inspired by "Deep Think" — a simple chat UI backed by an Express server that forwards prompts to OpenAI's Chat Completions API.

Features
- Single-node Express backend (server.js)
- Simple static frontend (index.html, app.js, styles.css)
- Environment-driven OpenAI API key
- Start with `npm install` and `npm start`

Security
- Do NOT commit your real API key. Use environment variables or a secrets manager.

Getting started
1. Clone the repo: `git clone https://github.com/savioursesugh/Project-Ai.git`
2. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.
3. Install: `npm install`
4. Start: `npm start`
5. Open http://localhost:3000

Notes
- The server uses the OpenAI Chat Completions endpoint with model `gpt-3.5-turbo` by default. Change the model in `server.js` if you want to use a different one.

License: MIT
