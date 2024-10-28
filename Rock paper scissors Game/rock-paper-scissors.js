let score =JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  looses:0,
  ties:0
 };
 
 updateScore(); 
 document.body.addEventListener('keydown',(event)=>{ //just like onkeydown attribute it also has an event key...
  if(event.key === 'r') playGame('rock');
  else if(event.key ==='p') playGame('paper');
  else if(event.key === 's') playGame('scissors');
  else if(event.key === 'a') autoPlay();
  else if(event.key === 'Backspace') resetScore();
 });

 document.querySelector('.js-rock-button')
  .addEventListener('click',()=>{
    playGame('rock');
  })

 document.querySelector('.js-paper-button')
  .addEventListener('click',()=>{
    playGame('paper');
  })

 document.querySelector('.js-scissors-button')
  .addEventListener('click',()=>{
    playGame('scissors');
  })

  document.querySelector('.reset-button')
    .addEventListener('click',()=>resetScore());
  
  document.querySelector('.js-auto-play')
  .addEventListener('click',()=>autoPlay());  
  
  
  
  function resetScore(){
    const html = `
    <div class="confirmationDiv">
    <div>
    Are you sure you want to reset the score?
    </div>
    <button class="yes-button">Yes</button>
    <button class="no-button">No</button>      
    </div>`;
    document.querySelector('.js-confirmation')
    .innerHTML = html;
    document.querySelector('.yes-button')
      .addEventListener('click',()=>{
        score.wins = 0;
        score.looses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScore();
        document.querySelector('.js-confirmation')
        .innerHTML = '';  
      });
    document.querySelector('.no-button')
    .addEventListener('click',()=>{
      document.querySelector('.js-confirmation')
      .innerHTML = '';      
    });    
    // score.wins = 0;
    // score.looses = 0;
    // score.ties = 0;
    // localStorage.removeItem('score');
    // updateScore();

  }
  
 let autoId;
 let flag = true;
 function autoPlay(){
   const autoEle = document.querySelector('.js-auto-play');
   if(flag){
     autoEle.innerHTML='Stop Playing';
     flag = false;
     autoId=setInterval(()=>{
       playGame(pickcomputerValue());
     },1000);
   }
   else {
     autoEle.innerHTML='Auto Play';
     flag = true;
     clearInterval(autoId);
   }
   
 }


function playGame(playerMove){
  const computerMove = pickcomputerValue();
  let result ='';
  if(playerMove === 'rock'){
    if(computerMove === 'rock') result='Tie.';
    else if(computerMove === 'paper') result='You lose.';
    else result = 'You win.';
  }

  else if(playerMove === 'paper'){
    // computerMove = pickcomputerValue();
    // result ='';
    if(computerMove === 'paper') result='Tie.';
    else if(computerMove === 'scissors') result='You lose.';
    else result = 'You win.';
  }

  else if (playerMove === 'scissors'){
    // computerMove = pickcomputerValue();
    // result ='';
    if(computerMove === 'scissors') result='Tie.';
    else if(computerMove === 'rock') result='You lose.';
    else result = 'You win.';
  }
  if(result === 'You win.') score.wins++ ;
  else if(result === 'You lose.') score.looses++ ;
  else score.ties++ ;
  localStorage.setItem('score',JSON.stringify(score));
  
  document.querySelector('.js-result').innerHTML=result;

  document.querySelector('.js-Move').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon" > 
Computer`;
  
  updateScore();
    
//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins:${score.wins}, Looses:${score.looses}, Ties:${score.ties} `);
}

function updateScore(){
  document.querySelector('.js-score')
    .innerHTML =`Wins: ${score.wins}, Losses: ${score.looses}, Ties: ${score.ties}`;
}


function pickcomputerValue(){
  let randonNumber = Math.random();
  let computerMove ='';
  if(randonNumber >= 0 && randonNumber < 1/3){
    computerMove = 'rock';
  }else if(randonNumber >= 1/3 && randonNumber < 2/3) {
    computerMove='paper';
  }else computerMove='scissors';
  return computerMove;

}