import random

def start_adventure():
    print("🌲 Welcome to the Quest in the Enchanted Forest! 🌲")
    print("You find yourself standing at the edge of a mysterious and magical forest.")
    print("The air is filled with the scent of pine and the sound of rustling leaves.")
    print("Will you venture left towards the dark shadows or right towards the shimmering light?")
    choose_path()

def choose_path():
    # Prompt the user for their choice of path
    path_choice = input("Select a path (L/R): ").strip().lower()
    if path_choice == 'l':
        face_creature()
    elif path_choice == 'r':
        discover_treasure()
    else:
        print("❌ Oops! That's not a valid choice. Please choose 'L' for left or 'R' for right.")
        choose_path()  # Ask again if the input is invalid

def face_creature():
    print("As you walk deeper into the forest, the atmosphere becomes tense.")
    print("Suddenly, you come face-to-face with a ferocious beast! Its glowing eyes pierce through the shadows.")
    
    # Ask the player how they want to react
    action = input("What will you do? (1) Flee in terror or (2) Confront the beast with bravery? ").strip()
    if action == '1':
        print("🏃 You manage to escape and dash back to the safety of the forest entrance.")
        choose_path()  # Return to the path selection
    elif action == '2':
        # Randomly determine the outcome of the confrontation
        outcome = random.choice(["victory", "loss"])
        if outcome == "victory":
            print("🎉 With great courage and skill, you defeated the beast! You are victorious!")
        else:
            print("😢 Unfortunately, the beast overpowered you. Game over. Better luck next time!")
    else:
        print("❌ That's not a valid option. Please enter 1 to flee or 2 to confront.")
        face_creature()  # Ask again if the input is invalid

def discover_treasure():
    print("As you stroll along the path, you stumble upon a glittering treasure chest hidden among the trees!")
    print("It sparkles invitingly in the sunlight, making your heart race with excitement.")
    
    # Ask the player what they want to do with the treasure
    action = input("Do you wish to (1) open the chest and see what's inside or (2) walk away and continue your journey? ").strip()
    if action == '1':
        print("💰 Amazing! You have discovered a fortune beyond your wildest dreams! Your adventure continues!")
    elif action == '2':
        print("🚶 You chose to leave the treasure behind and continue your journey through the forest.")
        choose_path()  # Return to the path selection
    else:
        print("❌ That's not a valid choice. Please choose 1 to open the chest or 2 to walk away.")
        discover_treasure()  # Ask again if the input is invalid

if __name__ == "__main__":
    start_adventure()