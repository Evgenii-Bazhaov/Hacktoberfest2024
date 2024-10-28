let gamesq=[];
let usersq=[];
let btns = ["pink","orange","skyBlue","blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started = true;
        levelUp();
    }
});

 function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash")
  },250);
 }

 function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
      btn.classList.remove("userflash")
    },250);
   }

 function levelUp(){
 usersq=[];
 level++;
 h2.innerText = `level ${level}`;

let ranidx = Math.floor(Math.random() * 3);
let rancol = btns[ranidx];
let renbtn = document.querySelector(`.${rancol}`);
gamesq.push(rancol);
console.log(gamesq)
gameFlash(renbtn);
}

function checkans(idx){
if(usersq[idx]==gamesq[idx]){
    if(usersq.length==gamesq.length){
        setTimeout(levelUp,1000);
    }
}else{
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <Br> `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
    document.querySelector("body").style.backgroundColor = "white";
    },150)
    
}
}



function btnPress(){
   let btn = this;
   userFlash(btn);

   usercol = btn.getAttribute("id");
   usersq.push(usercol);

   checkans(usersq.length-1);
}

let allbtns = document.querySelectorAll(".btn")
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function Reset(){
    started = false;
    gamesq = [];
    usersq = [];
    level = 0;
}
