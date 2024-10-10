const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "You miss 100% of the shots you don’t take.",
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going."
];

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

console.log(generateQuote());
