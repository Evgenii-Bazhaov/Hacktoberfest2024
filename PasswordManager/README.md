# Password Manager

## About the Project

The Password Manager is a secure and efficient solution for storing and managing your passwords using SQLite3. This project is designed to help users keep track of their passwords in a safe and encrypted manner, providing a user-friendly interface for easy password retrieval and management. Developed with Python and various powerful libraries, this system ensures high security and ease of use for managing sensitive information.

## Purpose

The purpose of the Password Manager project is to offer a practical tool for managing passwords securely, leveraging SQLite3 for robust database operations and the `cryptography` library for encryption. By using this system, users can experience secure password storage, quick retrieval, and the convenience of a user-friendly command-line interface built with `questionary` and `rich`. This project aims to provide a valuable utility for everyday password management while showcasing the application of encryption and database management techniques.

## Preview

https://github.com/AverageBlank/PasswordManager/assets/112507212/ba5cee30-9837-4dd5-ae4b-e79f5e2c8b07

## Setting Up Locally

### Prerequisites

Make sure you have Python installed on your system.

- **[Python](https://www.python.org/downloads/)**: Download and install Python.

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/AverageBlank/PasswordManager.git
   cd PasswordManager
   ```

2. **Create a virtual environment**

   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On powershell use `source venv\bin\activate`
   ```

3. **Install the required libraries**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python main.py
   ```

## Languages Used

- **Python**: The main programming language used for the backend.
- **SQL**: Language used for interacting with the SQLite3 database.

## Libraries Used

- **String**: Implements common string operations.
- **OS**: Allows interaction with the operating system.
- **random**: Implements pseudo-random number generators for various distributions.
- **time**: Provides various time-related functions.
- **sqlite3**: A built-in Python library for interacting with SQLite databases.
- **pyperclip**: A cross-platform Python module for clipboard functions.
- **pwinput**: A Python library for secure password input.
- **re**: Provides regular expression matching operations.
- **cryptography (fernet)**: A cryptography library for secure communications. Fernet is used for encryption and decryption.
- **questionary**: A Python library for building interactive command-line applications.
- **rich**: A Python library for rich text and beautiful formatting in the terminal.
