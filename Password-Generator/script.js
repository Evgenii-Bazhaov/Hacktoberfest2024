const lengthEl = document.getElementById('length');
const includeUppercaseEl = document.getElementById('include-uppercase');
const includeLowercaseEl = document.getElementById('include-lowercase');
const includeNumbersEl = document.getElementById('include-numbers');
const includeSymbolsEl = document.getElementById('include-symbols');
const passwordDisplayEl = document.getElementById('password-display');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

function getRandomCharacter(str) {
    return str[Math.floor(Math.random() * str.length)];
}

function generatePassword() {
    const length = parseInt(lengthEl.value);
    const includeUppercase = includeUppercaseEl.checked;
    const includeLowercase = includeLowercaseEl.checked;
    const includeNumbers = includeNumbersEl.checked;
    const includeSymbols = includeSymbolsEl.checked;

    let characterPool = '';
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (characterPool === '') {
        passwordDisplayEl.textContent = 'Please select at least one option';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += getRandomCharacter(characterPool);
    }

    passwordDisplayEl.textContent = password;
}

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', () => {
    const password = passwordDisplayEl.textContent;
    if (password && password !== 'Please select at least one option') {
        navigator.clipboard.writeText(password)
            .then(() => alert('Password copied to clipboard!'))
            .catch(() => alert('Failed to copy password!'));
    }
});
