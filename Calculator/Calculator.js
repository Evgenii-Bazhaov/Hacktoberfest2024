let currentInput = '';

function updateDisplay(value) {
    document.querySelector('.display').value = value;
}

function toSolve(value) {
    currentInput += value;
    updateDisplay(currentInput);
}

function reset() {
    currentInput = '';
    updateDisplay('');
}

function delChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

function solve() {
    try {
        if (currentInput.trim() === '') return;
        const result = eval(currentInput);
        updateDisplay(result);
        currentInput = result.toString();
    } catch (error) {
        updateDisplay('Syntax ERROR');
        currentInput = '';
    }
}
