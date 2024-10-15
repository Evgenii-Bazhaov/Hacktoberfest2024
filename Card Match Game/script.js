const emojis = ['😂', '💀', '🤬', '🗿', '😎','☠️'];
        const cards = [...emojis, ...emojis];
        let flippedCard = [];
        let matchedCard = [];
        let score = 0;
        let clickDisabled = false;

        function createCard(emoji) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<span class="hidden">${emoji}</span>`;
            card.addEventListener('click', () => flipCard(card));
            return card;
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function flipCard(card) {
            if (clickDisabled || flippedCard.includes(card)) return;
            card.firstChild.classList.remove('hidden');
            flippedCard.push(card);
            if (flippedCard.length === 2) {
                clickDisabled = true;
                setTimeout(() => {
                    const [card1, card2] = flippedCard;
                    if (card1.firstChild.innerText === card2.firstChild.innerText) {
                        matchedCard.push(card1, card2);
                        updateScore(1);
                        if (matchedCard.length === cards.length) {
                            alert('Congratulations! You won!');
                            alert('Your score: ' + score);
                        }
                    } else {
                        card1.firstChild.classList.add('hidden');
                        card2.firstChild.classList.add('hidden');
                        updateScore(-1);
                    }
                    flippedCard = [];
                    clickDisabled = false;
                }, 1000);
            }
        }

        function updateScore(points) {
            score += points;
            document.getElementById('score').textContent = 'Score: ' + score;
        }

        function initializeGame() {
            const container = document.getElementById('game-container');
            shuffle(cards).forEach(emoji => {
                const card = createCard(emoji);
                container.appendChild(card);
            });
        }

        initializeGame();