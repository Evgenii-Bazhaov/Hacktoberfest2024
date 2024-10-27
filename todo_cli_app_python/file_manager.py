import json

def load_tasks(file_path="tasks.txt"):
    try:
        with open(file_path, "r") as file:
            tasks = json.load(file)
            return tasks
    except FileNotFoundError:
        return []

def save_tasks(tasks, file_path="tasks.txt"):
    with open(file_path, "w") as file:
        json.dump(tasks, file)
