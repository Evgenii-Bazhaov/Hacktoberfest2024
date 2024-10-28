let score = 0;
let timeLeft = 30;
let activeHole = null;
let gameInterval, countdown;

const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// Randomly selects a hole for the mole to pop up
function randomHole() {
    holes.forEach(hole => {
        hole.classList.remove('active');
        const mole = hole.querySelector('.mole');
        mole.classList.remove('whacked'); // Reset any whacked animation
    });
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    randomHole.classList.add('active');
    activeHole = randomHole;
}

// Whack the mole
holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === activeHole) {
            score++;
            scoreDisplay.textContent = score;

            const mole = hole.querySelector('.mole');
            mole.classList.add('whacked'); // Add whacked animation
            hole.classList.remove('active'); // Remove mole after whacking
        }
    });
});

// Start game logic
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    startBtn.style.display = 'none';  // Hide start button
    restartBtn.style.display = 'none'; // Ensure restart button is hidden at the start

    gameInterval = setInterval(randomHole, 800); // Mole pops up every 0.8 seconds

    countdown = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            clearInterval(countdown);
            alert('Game over! Your score: ' + score);

            restartBtn.style.display = 'inline-block';  // Show the restart button when game ends
        }
    }, 1000);
}
