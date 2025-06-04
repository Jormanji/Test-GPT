const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleHeight = 80;
const paddleWidth = 10;
const playerX = 10;
const aiX = canvas.width - paddleWidth - 10;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = playerY;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const INITIAL_SPEED_X = 5;
const INITIAL_SPEED_Y = 2;
let ballSpeedX = INITIAL_SPEED_X;
let ballSpeedY = INITIAL_SPEED_Y;
const SPEED_UP = 1.1; // ball accelerates 10% on each paddle hit

function bounce() {
  ballSpeedX = -ballSpeedX * SPEED_UP;
  ballSpeedY *= SPEED_UP;
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -Math.sign(ballSpeedX) * INITIAL_SPEED_X;
  ballSpeedY = Math.sign(ballSpeedY) * INITIAL_SPEED_Y;
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // player paddle
  if (ballX < playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
    bounce();
  }

  // ai paddle
  if (ballX > aiX - ballSize && ballY > aiY && ballY < aiY + paddleHeight) {
    bounce();
  }

  if (ballX < 0 || ballX > canvas.width) {
    resetBall();
  }

  // simple AI movement
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.05;
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, '#000');
  drawRect(playerX, playerY, paddleWidth, paddleHeight, '#fff');
  drawRect(aiX, aiY, paddleWidth, paddleHeight, '#fff');
  drawCircle(ballX, ballY, ballSize, '#fff');
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
