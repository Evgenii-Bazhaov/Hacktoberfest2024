const todoList=JSON.parse(localStorage.getItem('todoList'))||[];
renderTodoList();

document.querySelector('.js-add-button')
  .addEventListener('click',()=>{
    add();
  });


function renderTodoList(){
  
  let list = '';
  todoList.forEach((objectToDo,index)=>{
    
      // const objectToDo=todoList[i];
      // const name = objectToDo;
      // const dueDate=objectToDo;
      const {name,dueDate} = objectToDo;
      const html= `
        <div>${name}</div>
        <div> ${dueDate}</div> 
        <button class="delete-button">
          Delete
        </button>`;
      list += html;
  })
  document.querySelector('.js-todo-list').innerHTML=list;
  document.querySelectorAll('.delete-button').forEach((deleteButton,index)=>{
    deleteButton.addEventListener('click',()=>{

      todoList.splice(index,1);
          renderTodoList();
          // localStorage.clear();
          // localStorage.setItem('todoList',JSON.stringify(todoList));
    });
  });
  

}


function add(){
  const name = document.querySelector('.js-to-name').value;
  const dueDate=document.querySelector('.due-date-input').value;
  todoList.push({
    // name:name,
    // dueDate:dueDate
    name,
    dueDate
  });
  // console.log(todoList);
  localStorage.setItem('todoList',JSON.stringify(todoList));
  document.querySelector('.js-to-name').value='';
  renderTodoList();
}
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}