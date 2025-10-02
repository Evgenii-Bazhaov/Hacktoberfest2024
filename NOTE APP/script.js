function createNewDiv() {

    var newDiv = document.createElement('div');
    newDiv.className = 'box';


    var newTextarea = document.createElement('textarea');
    newTextarea.placeholder = 'Type something...';


    newDiv.appendChild(newTextarea);

    
    document.getElementById('main').appendChild(newDiv);
}