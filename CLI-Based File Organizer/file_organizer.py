import os
import shutil

# Define the mapping of file extensions to folder names
FILE_CATEGORIES = {
    'Documents': ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.csv'],
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
    'Videos': ['.mp4', '.mov', '.avi', '.mkv', '.flv'],
    'Music': ['.mp3', '.wav', '.aac', '.flac'],
    'Archives': ['.zip', '.rar', '.7z', '.tar', '.gz'],
    'Executables': ['.exe', '.msi', '.bat', '.sh'],
    'Others': []
}

def organize_files(directory):
    # Create folders for each category if they do not exist
    for category in FILE_CATEGORIES.keys():
        folder_path = os.path.join(directory, category)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

    # Iterate through each file in the directory
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):  # Check if it's a file
            file_moved = False
            # Move file to appropriate category folder based on its extension
            for category, extensions in FILE_CATEGORIES.items():
                if filename.lower().endswith(tuple(extensions)):
                    shutil.move(file_path, os.path.join(directory, category, filename))
                    file_moved = True
                    break
            # If the file doesn't match any category, move it to the 'Others' folder
            if not file_moved:
                shutil.move(file_path, os.path.join(directory, 'Others', filename))

    print(f"Files in '{directory}' have been organized successfully!")

def main():
    directory = input("Enter the path of the directory to organize: ")
    if os.path.exists(directory):
        organize_files(directory)
    else:
        print("The specified directory does not exist. Please try again.")

if __name__ == "__main__":
    main()
