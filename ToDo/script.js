// Select elements
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Function to add a new task
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return; // Ignore empty input

    // Create list item
    const listItem = document.createElement("li");

    // Task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.addEventListener("click", () => {
        listItem.classList.toggle("done");
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
        todoList.removeChild(listItem);
    });

    // Append elements
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    // Clear input
    todoInput.value = "";
}

// Add task when button is clicked
addTodoButton.addEventListener("click", addTask);

// Optional: Add task on pressing Enter key
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
