const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

let player = { x: 1, y: 1 };
const mazeSize = 20; // 20x20 grid
const cellSize = canvas.width / mazeSize;
const walls = [];

function generateMaze() {
    // Initialize walls array with random positions and behavior
    for (let i = 0; i < mazeSize; i++) {
        walls[i] = [];
        for (let j = 0; j < mazeSize; j++) {
            walls[i][j] = Math.random() > 0.8 ? 1 : 0; // 1 = wall, 0 = path
        }
    }
    // Clear a path at player's starting position
    walls[player.y][player.x] = 0;
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            if (walls[i][j] === 1) {
                ctx.fillStyle = 'green';
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
    drawPlayer();
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && walls[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        updateWalls();
        drawMaze();
    }
}

function updateWalls() {
    // Dynamic behavior: randomly change wall positions based on player movement
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            if (Math.random() > 0.98) { // Small chance to toggle walls
                walls[i][j] = walls[i][j] === 1 ? 0 : 1;
            }
        }
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': movePlayer(0, -1); break;
        case 'ArrowDown': movePlayer(0, 1); break;
        case 'ArrowLeft': movePlayer(-1, 0); break;
        case 'ArrowRight': movePlayer(1, 0); break;
    }
});

generateMaze();
drawMaze();
