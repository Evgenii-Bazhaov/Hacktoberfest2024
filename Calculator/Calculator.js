let currentInput = '';

function toSolve(value){
    currentInput += value;
    document.querySelector('.display').value = currentInput;
}

function reset(){
    currentInput = '';
    document.querySelector('.display').value  = '';
}

function solve(){
    try{
        var result = eval(currentInput);
        document.querySelector('.display').value = result;
        currentInput=result.toString();
    }catch(error){
        document.querySelector('.display').value = 'Syntax ERROR';
    }
}
