const http = require('http');
const fs = require('fs');
const path = require('path');
const gameController = require('./controllers/gameController');

const PORT = process.env.PORT || 3000;

function serveStatic(req, res) {
  const filePath = path.join(__dirname, 'public', req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const map = {
      '.js': 'text/javascript',
      '.css': 'text/css',
    };
    res.setHeader('Content-Type', map[ext] || 'application/octet-stream');
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    gameController.index(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
