const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progessText");
const scoreText = document.getElementById("score");
const progressbarfill = document.getElementById("progressbarfill");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptAnswer = false;
let score = 0;
let questionCnt = 0;
let availableQuestion = [];
let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestions => {
            const formattedquestion = {
                question: loadedQuestions.question
            };
            const answerchoices = [...loadedQuestions.incorrect_answers];
            formattedquestion.answer = Math.floor(Math.random() * 3) + 1;
            answerchoices.splice(formattedquestion.answer - 1, 0, loadedQuestions.correct_answer);
            answerchoices.forEach((choice, index) => {
                formattedquestion["choice" + (index + 1)] = choice;
            });
            return formattedquestion;
        });
        startGame();
    })
    .catch(err => {
        console.error(err);
    })
const correct_point = 10;
const max_question = 5;

startGame = () => {
    questionCnt = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestion.length === 0 || questionCnt >= max_question) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
    questionCnt++;
    progressText.innerText = `Question ${questionCnt}/${max_question}`;
    progressbarfill.style.width = `${(questionCnt / max_question) * 100}%`;
    const questionNum = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionNum];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestion.splice(questionNum, 1);

    acceptAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptAnswer) return;
        acceptAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === 'correct') {
            increaseScore(correct_point);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

increaseScore = num => {
    score += num;
    scoreText.innerText = score;
};
