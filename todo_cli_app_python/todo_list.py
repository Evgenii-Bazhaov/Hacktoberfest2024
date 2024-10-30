class ToDoList:
    def __init__(self):
        self.tasks = []

    def add_task(self, description):
        """Add a new task to the list."""
        task = {"description": description, "completed": False}
        self.tasks.append(task)

    def mark_task_completed(self, task_index):
        """Mark a task as completed."""
        if 0 <= task_index < len(self.tasks):
            self.tasks[task_index]["completed"] = True

    def delete_task(self, task_index):
        """Delete a task from the list."""
        if 0 <= task_index < len(self.tasks):
            self.tasks.pop(task_index)

    def list_tasks(self):
        """Return the list of tasks."""
        return self.tasks
