const fs = require('fs');
const path = require('path');
const Game = require('../models/gameModel');

exports.index = (req, res) => {
  const data = Game.getData();
  const filePath = path.join(__dirname, '../views/index.html');
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server Error');
      return;
    }
    content = content.replace('{{title}}', 'Pong Game').replace('{{message}}', data.message);
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
  });
};
