const jokeContainer = document.getElementById("joke");
const button = document.getElementById("btn");

const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist&type=single";

let getJoke = () => {
    fetch(url)
    .then(data => data.json())
    .then(item =>{
        jokeContainer.textContent = `${item.joke}`;
    });
}
button.addEventListener("click",getJoke);
getJoke();