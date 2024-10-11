let score = JSON.parse(localStorage.getItem('score')) || {
    Wins : 0,
    Losses : 0,
    Draws : 0
};
//updateScoreElement();
    
 let comp = '';
 let res ='';

 //Computer Move Selection//
function compPick(){
    const randomNumber = Math.random();
    if(randomNumber >= 0 && randomNumber < 1/3){
        comp ='rock';
    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        comp = 'paper';
    }else{
        comp = 'scissors';
    }
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins} | Losses: ${score.Losses} | Draws: ${score.Draws}`;
}

//Computer and Player move comparison//
function game(player){
    
 if(player === 'rock'){
    compPick();
    if(comp === 'rock'){
        res = 'Its a tie';
    }else if(comp === 'paper'){
        res = 'Computer wins';
    }else{
        res = 'You win';
    }
 }else if(player === 'paper'){
    compPick();
    if(comp === 'rock'){
        res = 'You win';
    }else if(comp === 'paper'){
        res = 'Its a tie';
    }else{
        res = 'Computer wins';
    }
 }else{
    compPick();
    if(comp === 'rock'){
        res = 'Computer wins';
    }else if(comp === 'paper'){
        res = 'You win';
    }else{
        res = 'Its a tie';
    }

 //Score board Update//
 }
 if(res === 'You win'){
    score.Wins += 1;
 }else if(res === 'Computer wins'){
    score.Losses += 1;
 }else if(res === 'Its a tie'){
    score.Draws += 1;
 }

 localStorage.setItem('score', JSON.stringify(score));

 updateScoreElement();

 document.querySelector('.js-result').innerHTML = res;
 document.querySelector('.js-moves').innerHTML = `You chose ${player}. Computer chose ${comp}.`;
}