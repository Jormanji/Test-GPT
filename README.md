# Pong MVC Example

This repository contains a very small website that demonstrates a simple MVC (Model-View-Controller) structure using Node.js built-in modules. The website serves a basic Pong game implemented in JavaScript.
Each time the ball hits a paddle, it speeds up slightly to keep the rally exciting.

## Structure
- `server.js` – minimal HTTP server and router
- `controllers/` – request handlers
- `models/` – data layer
- `views/` – HTML templates
- `public/` – static assets (CSS and game script)

## Running

1. Ensure you have Node.js installed.
2. Run the server:

```bash
node server.js
```

3. Open `http://localhost:3000` in your browser to play Pong.
