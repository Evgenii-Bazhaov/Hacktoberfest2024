const words = [
  "apple",
  "grape",
  "mango",
  "peach",
  "berry",
  "lemon",
  "melon",
  "olive",
  "cherry",
  "plums",
  "apron",
  "brace",
  "brick",
  "chair",
  "clock",
  "drill",
  "flask",
  "glass",
  "knife",
  "latch",
  "amber",
  "flair",
  "flock",
  "flute",
  "glare",
  "grill",
  "hinge",
  "jewel",
  "laser",
  "model",
  "beach",
  "baker",
  "cabin",
  "creek",
  "feast",
  "flame",
  "flour",
  "grove",
  "house",
  "match",
  "acorn",
  "blame",
  "bland",
  "blend",
  "bliss",
  "bloom",
  "brass",
  "charm",
  "clash",
  "cliff",
  "crane",
  "crash",
  "crisp",
  "delve",
  "dream",
  "fable",
  "flash",
  "frame",
  "globe",
  "harsh",
  "lodge",
  "plank",
  "ranch",
  "shack",
  "spoon",
  "stair",
  "stone",
  "trail",
  "whale",
  "yacht",
  "blush",
  "brave",
  "broom",
  "clown",
  "crush",
  "elbow",
  "flame",
  "flank",
  "gleam",
  "grain",
  "grasp",
  "knack",
  "lance",
  "ledge",
  "prism",
  "quest",
  "stack",
  "thorn",
  "vivid",
  "whirl",
  "beast",
  "glide",
  "lunar",
  "pulse",
  "realm",
  "saint",
  "shade",
  "slick",
  "tooth",
  "wound",
];

const targetWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
let currentAttempt = 0;

const board = document.getElementById("board");
const message = document.getElementById("message");

function createBoard() {
  for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < 5; j++) {
      const letterDiv = document.createElement("div");
      letterDiv.classList.add("letter");
      letterDiv.id = `cell-${i}-${j}`;
      board.appendChild(letterDiv);
    }
  }
}

createBoard();

function makeGuess() {
  const guessInput = document.getElementById("guessInput");
  let guess = guessInput.value.toLowerCase().trim();

  if (guess.length !== 5) {
    message.textContent = "Please enter exactly a 5-letter word.";
    return;
  }

  if (currentAttempt >= maxAttempts) {
    message.textContent = "No more attempts left!";
    return;
  }

  const targetWordArr = targetWord.split("");
  const guessArr = guess.split("");

  const result = Array(5).fill("");

  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById(`cell-${currentAttempt}-${i}`);
    const letter = guessArr[i];

    if (letter === targetWordArr[i]) {
      cell.textContent = letter;
      cell.classList.add("correct");
      result[i] = "correct";
      targetWordArr[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    const cell = document.getElementById(`cell-${currentAttempt}-${i}`);
    const letter = guessArr[i];

    if (result[i] !== "correct") {
      if (targetWordArr.includes(letter)) {
        cell.textContent = letter;
        cell.classList.add("present");
        result[i] = "present";

        const index = targetWordArr.indexOf(letter);
        targetWordArr[index] = null;
      } else {
        cell.textContent = letter;
        cell.classList.add("absent");
      }
    }
  }

  if (guess === targetWord) {
    message.textContent = "Congratulations! You guessed the word!";
    return;
  }

  currentAttempt++;

  if (currentAttempt >= maxAttempts) {
    message.textContent = `Game over! The word was "${targetWord}".`;
  }

  guessInput.value = "";
}
