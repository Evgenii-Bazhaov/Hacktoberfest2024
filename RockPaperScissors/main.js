let userScore =0;
let compScore=0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg")
const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")
const compoption = () => {
    const options = ['rock','paper','scissors']
    let option = options[Math.floor(Math.random()*3)]
    return option
}

const drawgame = () => {
    msg.innerText="Draw :/"
    msg.style.backgroundColor = "#081b31"
}


function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}


const showWinner = (userWin, compchoice) => {
    if (userWin){
        userScore++
        userScorePara.innerText=userScore
        msg.innerText = `Computer chose ${titleCase(compchoice)}, You WINN ^ ^ !!!`
        msg.style.backgroundColor = "green"
    } else {
        compScore++
        compScorePara.innerText=compScore
        msg.innerText=`Computer chose ${titleCase(compchoice)}, You Lose :(`
        msg.style.backgroundColor = "red"
    }
}

const playGame = (userchoice) => {
    const compchoice = compoption();

    if (userchoice===compchoice){
        drawgame()
    }else{
        let userWin = true;
        if (userchoice ==="rock"){
            userWin = compchoice === "paper" ? false : true;
        } else if (userchoice==="paper"){
            userWin = compchoice === "scissors" ? false : true;
        } else {
            userWin = compchoice === "rock" ? false : true;
        }
        showWinner(userWin, compchoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click",()=>{
        const userchoice = choice.getAttribute("id")
        playGame(userchoice)
    })
})