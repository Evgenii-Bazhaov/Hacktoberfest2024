const gridSize = 4;
let grid = [];
let score = 0;

window.onload = function () {
    initGame();
    document.addEventListener('keydown', handleKeyInput);
};

function initGame() {
    grid = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

function addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (grid[r][c] === 0) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length === 0) return;
    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
}

function updateGrid() {
    let gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            let cell = document.createElement('div');
            cell.classList.add('grid-cell');
            if (grid[r][c] !== 0) {
                cell.textContent = grid[r][c];
                cell.setAttribute('data-value', grid[r][c]);
            }
            gridContainer.appendChild(cell);
        }
    }
    document.getElementById('score').textContent = score;
}

function handleKeyInput(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            return;
    }
    addRandomTile();
    updateGrid();

    if (checkGameOver()) {
        console.log("Game Over !");
        handleGameOver();  
    }
}

function moveUp() {
    for (let c = 0; c < gridSize; c++) {
        let col = grid.map(row => row[c]);
        let newCol = slideAndMerge(col);
        for (let r = 0; r < gridSize; r++) {
            grid[r][c] = newCol[r];
        }
    }
}

function moveDown() {
    for (let c = 0; c < gridSize; c++) {
        let col = grid.map(row => row[c]);
        let newCol = slideAndMerge(col.reverse()).reverse();
        for (let r = 0; r < gridSize; r++) {
            grid[r][c] = newCol[r];
        }
    }
}

function moveLeft() {
    for (let r = 0; r < gridSize; r++) {
        let row = grid[r];
        grid[r] = slideAndMerge(row);
    }
}

function moveRight() {
    for (let r = 0; r < gridSize; r++) {
        let row = grid[r];
        grid[r] = slideAndMerge(row.reverse()).reverse();
    }
}

function slideAndMerge(array) {
    let arr = array.filter(val => val !== 0);

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;           
            score += arr[i];        
            arr[i + 1] = 0;        
        }
    }

    arr = arr.filter(val => val !== 0);

    return [...arr, ...new Array(gridSize - arr.length).fill(0)];
}

function checkGameOver() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === 0) {
                return false; 
            }
        }
    }

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if ((col < gridSize - 1 && grid[row][col] === grid[row][col + 1]) || 
                (row < gridSize - 1 && grid[row][col] === grid[row + 1][col])) {   
                return false;  
            }
        }
    }

    return true;
}


function handleGameOver() {
    document.getElementById('game-over-modal').style.display = 'block';
    document.getElementById('final-score').textContent = score; 
}

function restartGame() {
    document.getElementById('game-over-modal').style.display = 'none';

    score = 0;
    initGame();
}

document.getElementById('restart-btn').addEventListener('click', restartGame);


