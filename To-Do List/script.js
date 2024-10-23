document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();

    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        document.getElementById('todo-list').appendChild(taskItem);
        input.value = '';
    }
}

function deleteTask(task) {
    const taskItem = task.parentElement;
    taskItem.remove();
}
