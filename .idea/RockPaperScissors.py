import random

# Function to get the computer's choice
def get_computer_choice():
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

# Function to determine the winner
def determine_winner(player, computer):
    if player == computer:
        return "It's a tie!"
    elif (player == 'rock' and computer == 'scissors') or \
         (player == 'scissors' and computer == 'paper') or \
         (player == 'paper' and computer == 'rock'):
        return "You win!"
    else:
        return "You lose!"

# Main function to play the game
def rock_paper_scissors():
    print("Welcome to Rock, Paper, Scissors!")
    while True:
        # Get the player's choice
        player_choice = input("Enter rock, paper, or scissors (or 'quit' to stop playing): ").lower()

        if player_choice == 'quit':
            print("Thanks for playing!")
            break

        if player_choice not in ['rock', 'paper', 'scissors']:
            print("Invalid choice. Please try again.")
            continue

        # Get the computer's choice
        computer_choice = get_computer_choice()

        # Show both choices
        print(f"You chose {player_choice}, and the computer chose {computer_choice}.")

        # Determine and display the result
        result = determine_winner(player_choice, computer_choice)
        print(result)

# Start the game
rock_paper_scissors()
