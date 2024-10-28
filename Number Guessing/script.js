
let noOfGuesses = 10;
let range = 100;
let toBeGuessed = Math.ceil(Math.random() * range);

let input = document.querySelector("#guessField");
let btn = document.querySelector("#btn");

let guesses = document.querySelector(".guesses");
let count = document.querySelector(".lastResult");
let comment = document.querySelector(".lowOrHi");

let newGame = document.querySelector("#new");
newGame.style.display = "none";

count.innerText = noOfGuesses;

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let suggestion = input.value;
    if (parseInt(count.innerText) > 1) {
        if (!isNaN(suggestion) && suggestion > 0 && suggestion <= range) {
            if (suggestion == toBeGuessed) {
                comment.innerText = "You Guessed it Right";
                startNewGame();
            }
            else {
                if (suggestion < toBeGuessed){
                    comment.innerText = "The Provided Number is Low";
                    submitted(suggestion);
                }
                else{
                    comment.innerText = "The Provided Number is High";
                    submitted(suggestion);
                }
            }
        }
        else {
            comment.innerText = "Please Input a Valid Number";
        }
    }
    else {
        comment.innerText = `The Game is Over!!! The Guess was ${toBeGuessed}`;
        startNewGame();
    }
});
function submitted(suggestion) {
    count.innerText = parseInt(count.innerText) - 1;
    input.value = "";
    guessArray = guesses.innerText;
    guessArray += ` ${suggestion}`;
    guesses.innerText = guessArray;
}
newGame.addEventListener("click", ()=>{
    guesses.innerText = "";
    newGame.style.display = "none";
    count.innerText = noOfGuesses;
    comment.innerText = "";
    toBeGuessed = Math.ceil(Math.random() * noOfGuesses);
    input.value = "";
});
function startNewGame(){
    newGame.style.display = "inline-block";
}