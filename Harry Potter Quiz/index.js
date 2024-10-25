const quizData= [
    {
        question: 'Easy one to start with : which house did Ronald Weasley get placed in?',
        a: 'Ravenclaw',
        b: 'Slytherin',
        c: 'Gryffindor',
        d: 'Hufflepuff',
        correct: 'c',

    },

    {
        question: 'What does the "Obliviate" spell mean?',
        a: 'Remove ones memory',
        b: 'Protect yourself from Dark Magic',
        c: 'Transform into somebody else',
        d: 'Transport from one place to another',
        correct: 'a',

    },

    {
        question: 'Who killed Sirius Black so that he fell into the Veil?',
        a: 'Lucius Malfoy',
        b: 'Lord Voldemort',
        c: 'Draco Malfoy',
        d: 'Bellatrix Lestrange',
        correct: 'd',

    },

    {
        question: 'How many turns did Harry and Hermione require to go back in time with the Time Turner?',
        a: '10 turns',
        b: '3 turns',
        c: '17 turns',
        d: '1 turn',
        correct: 'b',

    },

    {
        question: 'Which position did Hermione Granger play when they played the giant game of chess in her first year?',
        a: 'Pawn',
        b: 'Bishop',
        c: 'Castle',
        d: 'Knight',
        correct: 'c',

    },

    {
        question: 'What is Severus Snapes Patronus Charm?',
        a: 'A doe',
        b: 'A deer',
        c: 'A beaver',
        d: 'A snake',
        correct: 'a',

    },

    {
        question: 'What was the event in the Triwizard Tournament called which meant that male would dance with female?',
        a: 'The Magic Ball',
        b: 'The Charm Ball',
        c: 'The Triwizard Ball',
        d: 'The Yule Ball',
        correct: 'd',

    },

    {
        question: "What is Albus Dumbledore's brother called?",
        a: 'Arthur',
        b: 'Aberforth',
        c: 'Aberfol',
        d: 'Grindelwald',
        correct: 'b',

    },

    {
        question: 'What is the name of the girl ghost who haunts the female bathrooms and who died seeing the Basilisk?',
        a: 'Haughty Hetty',
        b: 'Scaredy-cat Sara',
        c: 'Miserable Myrtle',
        d: 'Moaning Myrtle',
        correct: 'd',

    },

    {
        question: 'Who murdered Albus Dumbledore?',
        a: 'Draco Malfoy',
        b: 'Bellatrix Lestrange',
        c: 'Severus Snape',
        d: 'Salazar Slytherin',
        correct: 'c',

    },

];

const quiz = document.getElementById("Quiz");
const answers = document.querySelectorAll('.answer');
const question = document.querySelector("#question");
const aText = document.getElementById('aText');
const bText = document.getElementById('bText');
const cText = document.getElementById('cText');
const dText = document.getElementById('dText');

let currentQuiz = 0;
let score = 0;

function loadQuiz(){
    deSelectAnswers();
    const currentQuizData = quizData[currentQuiz];
    question.innerText = currentQuizData.question;

    aText.innerText = currentQuizData.a;
    bText.innerText = currentQuizData.b;
    cText.innerText = currentQuizData.c;
    dText.innerText = currentQuizData.d;
}
loadQuiz();

function deSelectAnswers(){
    answers.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function getSelected() {
    let answer;

    answers.forEach((answers) => {
        if (answers.checked){
            answer = answers.id;
        }
    });
    return answer;
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', ()=>{
    const answer = getSelected();

    if (answer === quizData[currentQuiz].correct){
        score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length){
        loadQuiz();
    }

    else {
        quiz.innerHTML=`
        <h1>You answered ${score}/5 questions correctly 🧙🏻‍♂️</h1>
        <button class= "btn green" onclick= 'location.reload()'>Try again</button>
        `;
    }
});
