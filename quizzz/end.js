const username = document.getElementById("username");
const savescoreBtn = document.getElementById("savescoreBtn");
const finalscore = document.getElementById("finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

const Max_hs = 5;
finalscore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    savescoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highscores.push(score);
    highscores.sort((a, b) => b.score - a.score);
    highscores.splice(5);

    localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.assign("index.html");
};