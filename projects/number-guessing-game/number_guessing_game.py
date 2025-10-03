"""
Project: Number Guessing Game
Author: Akhlaque Nabi
GitHub: i-Akhlaque
Description: 
    A simple Python game for Hacktoberfest 2025. 
    The computer picks a random number and the user has to guess it.
"""

import random

def main():
    print("Welcome to the Number Guessing Game!")
    number = random.randint(1, 100)
    attempts = 0

    while True:
        guess = int(input("Enter your guess (1-100): "))
        attempts += 1

        if guess < number:
            print("Too low! Try again.")
        elif guess > number:
            print("Too high! Try again.")
        else:
            print(f"Congratulations! You guessed the number {number} in {attempts} attempts.")
            break

if __name__ == "__main__":
    main()
