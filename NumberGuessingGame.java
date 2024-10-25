import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        boolean playAgain;

        System.out.println("Welcome to the Number Guessing Game!");
        System.out.print("Please enter your name: ");
        String playerName = scanner.nextLine();  // Get the player's name

        System.out.println("Hello, " + playerName + "! Get ready to test your guessing skills.");
        System.out.println("Try to guess the number I'm thinking of.");
        System.out.println("Good luck, " + playerName + "!\n");

        do {
            int randomNumber = random.nextInt(100) + 1; // Generate random number between 1 and 100
            int guess;
            int attempts = 0;
            int maxAttempts = 10; // Set the maximum number of attempts
            boolean hasGuessedCorrectly = false;

            System.out.println("Guess a number between 1 and 100. You have " + maxAttempts + " attempts.");

            while (attempts < maxAttempts && !hasGuessedCorrectly) {
                System.out.print("Enter your guess: ");
                guess = scanner.nextInt();
                attempts++;

                if (guess == randomNumber) {
                    System.out.println("Congratulations! You guessed the correct number.");
                    hasGuessedCorrectly = true;
                } else if (guess < randomNumber) {
                    System.out.println("Your guess is too low. Try again.");
                } else {
                    System.out.println("Your guess is too high. Try again.");
                }
            }

            if (!hasGuessedCorrectly) {
                System.out.println("Sorry, you've used all your attempts. The correct number was " + randomNumber);
            }

            System.out.println("You took " + attempts + " attempts.");
            System.out.print("Do you want to play again? (yes/no): ");
            playAgain = scanner.next().equalsIgnoreCase("yes");

        } while (playAgain);

        System.out.println("Thank you for playing!");

        scanner.close();
    }
}
