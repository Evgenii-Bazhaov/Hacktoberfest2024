import random

def guessing_game():
    print("Welcome to the Number Guessing Game!")
    
    # Generate a random number between 1 and 100
    number_to_guess = random.randint(1, 100)
    attempts = 0
    max_attempts = 10

    while attempts < max_attempts:
        try:
            guess = int(input(f"Attempt {attempts + 1}/{max_attempts}: Guess a number between 1 and 100: "))
            attempts += 1

            if guess < 1 or guess > 100:
                print("Please guess a number within the range (1-100).")
                continue

            if guess < number_to_guess:
                print("Too low! Try again.")
            elif guess > number_to_guess:
                print("Too high! Try again.")
            else:
                print(f"Congratulations! You guessed the number {number_to_guess} in {attempts} attempts!")
                break
        except ValueError:
            print("Invalid input! Please enter a valid number.")

    if attempts == max_attempts:
        print(f"Sorry! You've used all {max_attempts} attempts. The number was {number_to_guess}.")

if __name__ == "__main__":
    guessing_game()
