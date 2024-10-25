# Random Calculator with Incorrect Results

This directory contains a simple JavaScript application that simulates a calculator with a twist. The calculator randomly decides whether to perform the correct operation or an incorrect one, creating a fun and unexpected experience for users.

## Code Structure

The application is structured as follows:

- **HTML:** Sets up a basic HTML page with a script tag for the JavaScript code.
- **JavaScript:** Contains the logic for performing calculations and randomly deciding whether to perform the correct or incorrect operation.

## How It Works

1. The script generates a random number to determine if it should perform the correct or incorrect operation.
2. It prompts the user for two numbers and an operation to perform.
3. If the random number is greater than 0.1, the correct operation is performed, and the result is displayed.
4. If the random number is less than or equal to 0.1, the operation is changed to a different (incorrect) one using a predefined object, and an incorrect result is displayed.

## Example

```javascript
let random = Math.random();
let a = prompt("Enter first number");
let c = prompt("Enter operation");
let b = prompt("Enter second number");

let obj = {
    "+": "-",
    "*": "+",
    "-": "/",
    "/": "**",
};

if (random > 0.1) {
    console.log(`The correct result for ${a} ${c} ${b} is ${eval(`${a} ${c} ${b}`)}`);
} else {
    c = obj[c];
    console.log(`The incorrect result for ${a} ${c} ${b} is ${eval(`${a} ${c} ${b}`)}`);
}


This README outlines the purpose and functionality of the JavaScript code, provides an example, and includes a section for contributions and a disclaimer for potential inaccuracies due to the randomization. You can copy and paste this markdown into your README.md file on GitHub and adjust it as needed.
