document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Mark task as completed
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
        });

        // Remove task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(removeButton);
        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
});
