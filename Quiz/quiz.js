import { question } from './question.js'; 

let start = document.querySelector('.Start');
let main = document.querySelector('.app');
start.addEventListener('click',()=>{
    
    main.innerHTML=` <h1>Simple Quiz</h1>
        <div class="quiz">
            <h2 id="Question"></h2>
             <div id="answer-buttons">
              <button class="btn O1"></button>
              <button class="btn O2"></button>
              <button class="btn O3"></button>
              <button class="btn O4"></button>

             </div>
             <button id="next-button">Next</button>
             </button>
        </div>`
        let next = document.getElementById('next-button');
        let questionDisplay = document.getElementById('Question');
        let answerButtons = document.querySelectorAll('.btn');
        let currentQuestionIndex = 1; 
    
    
        nextquestion();
        // currentQuestionIndex++;
    
    next.addEventListener('click', () => {
        currentQuestionIndex++;
        nextquestion();
        
  
    });
    let count=0;
    answerButtons.forEach((button) => {
        button.addEventListener('click', () => {
            
            if (button.innerHTML === question[currentQuestionIndex].correct) {
                console.log('Correct answer!');
                button.classList.toggle('correct')
                count++;
               
            } else {
                console.log(`Incorrect! The correct answer is: ${question[currentQuestionIndex].correct}`);
                button.classList.toggle('wrong')
                
                answerButtons.forEach(btn => {
                    if (btn.innerHTML === question[currentQuestionIndex].correct) {
                        btn.classList.add('correct');
                    }
                });
            }
            
            
            
        });
    });





    function nextquestion(){
        if (question[currentQuestionIndex]) { 
            questionDisplay.innerHTML = question[currentQuestionIndex].sawaal;

            answerButtons.forEach((btn, index) => {
                btn.innerHTML = question[currentQuestionIndex][`option${index + 1}`];
                btn.classList.remove('correct', 'wrong'); 
                btn.disabled = false; 
            });
        } else {
            next.disabled = true; 
            main.innerHTML = `<div class=end>Your Score: ${count}</div>`; 

        }
        // currentQuestionIndex++;
    }
})




