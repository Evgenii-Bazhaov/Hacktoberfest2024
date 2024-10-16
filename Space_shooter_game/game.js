const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgainBtn');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player spaceship
const player = {
  width: 50,
  height: 30,
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  speed: 5,
  dx: 0
};

// Game variables
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

// Event listeners for player movement
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Move player left or right
function movePlayer() {
  player.x += player.dx;

  // Prevent player from going off the screen
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Draw player spaceship
function drawPlayer() {
  ctx.fillStyle = 'white';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Bullet class
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 20;
    this.speed = 7;
  }
  draw() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y -= this.speed;
  }
}

// Enemy class
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.speed = 2;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += this.speed;
  }
}

// Generate random enemies
function spawnEnemies() {
  if (Math.random() < 0.02) {
    const x = Math.random() * (canvas.width - 40);
    const y = -30;
    enemies.push(new Enemy(x, y));
  }
}

// Handle player shooting
function shootBullet() {
  bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y));
}

// Handle bullet movement and enemy collision
function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.update();

    // Remove bullets that go off-screen
    if (bullet.y < 0) {
      bullets.splice(index, 1);
    }

    // Check for collision with enemies
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.height + bullet.y > enemy.y
      ) {
        // Remove enemy and bullet
        bullets.splice(index, 1);
        enemies.splice(enemyIndex, 1);
        score++;
        updateScore();
      }
    });
  });
}

// Update score on screen
function updateScore() {
  scoreElement.innerText = `Score: ${score}`;
}

// Handle enemy movement and player collision
function updateEnemies() {
  enemies.forEach((enemy, index) => {
    enemy.update();

    // Remove enemies that go off-screen
    if (enemy.y > canvas.height) {
      enemies.splice(index, 1);
    }

    // Check for collision with player
    if (
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y < player.y + player.height &&
      enemy.height + enemy.y > player.y
    ) {
      endGame();
    }
  });
}

// End the game
function endGame() {
  gameOver = true;
  finalScoreElement.innerText = `Your Score: ${score}`;
  gameOverScreen.style.display = 'flex';
}

// Update canvas
function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  movePlayer();

  bullets.forEach(bullet => bullet.draw());
  updateBullets();

  enemies.forEach(enemy => enemy.draw());
  updateEnemies();

  spawnEnemies();

  requestAnimationFrame(update);
}

// Restart the game
function restartGame() {
  gameOver = false;
  score = 0;
  bullets = [];
  enemies = [];
  player.x = canvas.width / 2 - player.width / 2;
  gameOverScreen.style.display = 'none';
  updateScore();
  update();
}

// Keydown event to move player and shoot
function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'd') {
    player.dx = player.speed;
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    player.dx = -player.speed;
  } else if (e.key === ' ') {
    shootBullet();
  }
}

// Keyup event to stop player movement
function keyUp(e) {
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'a') {
    player.dx = 0;
  }
}

// Play again button event
playAgainBtn.addEventListener('click', restartGame);

// Start the game
update();
