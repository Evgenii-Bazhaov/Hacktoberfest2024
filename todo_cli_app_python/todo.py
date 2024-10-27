from todo_list import ToDoList
import file_manager

def display_tasks(todo_list):
    tasks = todo_list.list_tasks()
    if not tasks:
        print("No tasks found!")
        return
    print("\nTo-Do List:")
    for idx, task in enumerate(tasks):
        status = "✔" if task["completed"] else "✘"
        print(f"{idx + 1}. {task['description']} [{status}]")

def main():
    todo_list = ToDoList()
    todo_list.tasks = file_manager.load_tasks()

    while True:
        print("\nTo-Do List Application")
        print("1. View tasks")
        print("2. Add a task")
        print("3. Mark task as completed")
        print("4. Delete a task")
        print("5. Exit")
        
        choice = input("Enter your choice: ")

        if choice == "1":
            display_tasks(todo_list)
        elif choice == "2":
            description = input("Enter task description: ")
            todo_list.add_task(description)
            file_manager.save_tasks(todo_list.tasks)
        elif choice == "3":
            display_tasks(todo_list)
            try:
                task_index = int(input("Enter task number to mark as complete: ")) - 1
                todo_list.mark_task_completed(task_index)
                file_manager.save_tasks(todo_list.tasks)
            except (ValueError, IndexError):
                print("Invalid task number.")
        elif choice == "4":
            display_tasks(todo_list)
            try:
                task_index = int(input("Enter task number to delete: ")) - 1
                todo_list.delete_task(task_index)
                file_manager.save_tasks(todo_list.tasks)
            except (ValueError, IndexError):
                print("Invalid task number.")
        elif choice == "5":
            print("Exiting To-Do List Application. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
