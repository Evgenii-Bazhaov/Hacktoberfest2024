let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-game");
let turnO = true;
let newbtn = document.querySelector(".new-btn")
let msgContainer = document.querySelector(".message-container")
let msg = document.querySelector("#msg")
let count = 0;
const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [2,5,8],
    [0,3,6],
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        
        if (turnO) {
            box.innerText = "O";
            turnO=false;
        } else {
            box.innerText = "X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner()
        
    })
})
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count+=1
        console.log(count)
        checkWinner()
    if (count === 9 && checkWinner!= true) {
        showdraw();
        count=0
    }
    })
})

const disablebtns = () => { 
    for (box of boxes){
        box.disabled=true
    }
}

const enablebtns = () => { 
    for (box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, the Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disablebtns();
}

const showdraw =() => {
    msg.innerText="DRAW";
    msgContainer.classList.remove("hide")
    disablebtns();
}

const checkWinner = () => {
    for (let pattern of winpatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val)
                count=0;
            } 
            
        }
    }
}


const resetgame = () => {
    turnO = true;
    enablebtns();
    msgContainer.classList.add("hide")
}

newbtn.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);