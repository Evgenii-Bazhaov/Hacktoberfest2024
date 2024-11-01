import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

public class Minesweeper {
    private static final int SIZE = 9;
    private static final int MINES = 10;
    private char[][] board;       // Player's board view
    private char[][] realBoard;   // Actual board with mines
    private boolean[][] revealed;  // Tracks revealed cells
    private JButton[][] buttons;   // GUI buttons for the game
    private JFrame frame;

    public Minesweeper() {
        board = new char[SIZE][SIZE];
        realBoard = new char[SIZE][SIZE];
        revealed = new boolean[SIZE][SIZE];
        buttons = new JButton[SIZE][SIZE];
        initializeBoards();
        placeMines();
        createAndShowGUI();
    }

    // Initialize the boards
    private void initializeBoards() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                board[i][j] = '-';
                realBoard[i][j] = '-';
                revealed[i][j] = false;
            }
        }
    }

    // Randomly place mines on the real board
    private void placeMines() {
        Random rand = new Random();
        int placedMines = 0;

        while (placedMines < MINES) {
            int row = rand.nextInt(SIZE);
            int col = rand.nextInt(SIZE);

            if (realBoard[row][col] != '*') {
                realBoard[row][col] = '*'; // Place a mine
                placedMines++;
            }
        }
    }

    // Create the GUI for the game
    private void createAndShowGUI() {
        frame = new JFrame("Minesweeper");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new GridLayout(SIZE, SIZE));

        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                buttons[i][j] = new JButton();
                buttons[i][j].setFont(new Font("Arial", Font.BOLD, 20));
                buttons[i][j].setFocusPainted(false);
                buttons[i][j].setBackground(Color.LIGHT_GRAY); // Default color
                int finalI = i;
                int finalJ = j;
                buttons[i][j].addActionListener(new ActionListener() {
                    public void actionPerformed(ActionEvent e) {
                        handleButtonClick(finalI, finalJ);
                    }
                });
                frame.add(buttons[i][j]);
            }
        }

        frame.setSize(400, 400);
        frame.setVisible(true);
    }

    // Handle button click
    private void handleButtonClick(int row, int col) {
        if (!revealed[row][col]) {
            if (isMine(row, col)) {
                JOptionPane.showMessageDialog(frame, "You hit a mine! Game Over.");
                revealAllCells();
            } else {
                revealSafeCells(row, col);
                if (checkWinCondition()) {
                    JOptionPane.showMessageDialog(frame, "Congratulations! You cleared all the safe cells.");
                    revealAllCells();
                }
            }
        }
    }

    // Reveal cells recursively if no adjacent mines, or just one cell if it has adjacent mines
    private void revealSafeCells(int row, int col) {
        if (!isValid(row, col) || revealed[row][col]) {
            return; // Invalid or already revealed
        }

        revealed[row][col] = true;
        int adjacentMines = countAdjacentMines(row, col);

        if (adjacentMines == 0) {
            buttons[row][col].setText("");
            buttons[row][col].setEnabled(false);
            buttons[row][col].setBackground(new Color(211, 211, 211)); // Light grey for revealed safe cells

            // Recursively reveal adjacent cells
            for (int i = -1; i <= 1; i++) {
                for (int j = -1; j <= 1; j++) {
                    revealSafeCells(row + i, col + j);
                }
            }
        } else {
            buttons[row][col].setText(Integer.toString(adjacentMines));
            buttons[row][col].setEnabled(false);
            buttons[row][col].setBackground(new Color(173, 216, 230)); // Light blue for cells with numbers
            buttons[row][col].setForeground(getColorForNumber(adjacentMines));
        }
    }

    // Get color based on the number of adjacent mines
    private Color getColorForNumber(int number) {
        switch (number) {
            case 1: return Color.BLUE;
            case 2: return Color.GREEN;
            case 3: return Color.RED;
            case 4: return new Color(0, 0, 128); // Navy
            case 5: return new Color(128, 0, 0); // Maroon
            case 6: return Color.CYAN;
            case 7: return Color.BLACK;
            case 8: return Color.DARK_GRAY;
            default: return Color.BLACK;
        }
    }

    // Check if the row, col is a valid cell
    private boolean isValid(int row, int col) {
        return (row >= 0 && row < SIZE && col >= 0 && col < SIZE);
    }

    // Check if the given cell contains a mine
    private boolean isMine(int row, int col) {
        return realBoard[row][col] == '*';
    }

    // Count the number of adjacent mines around a cell
    private int countAdjacentMines(int row, int col) {
        int count = 0;

        for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
                if (isValid(row + i, col + j) && isMine(row + i, col + j)) {
                    count++;
                }
            }
        }

        return count;
    }

    // Reveal all cells (for game over)
    private void revealAllCells() {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (isMine(i, j)) {
                    buttons[i][j].setText("💣");
                    buttons[i][j].setForeground(Color.RED);
                    buttons[i][j].setBackground(Color.BLACK);
                } else {
                    int adjacentMines = countAdjacentMines(i, j);
                    buttons[i][j].setText(adjacentMines == 0 ? "" : Integer.toString(adjacentMines));
                    buttons[i][j].setForeground(getColorForNumber(adjacentMines));
                    buttons[i][j].setBackground(new Color(173, 216, 230));
                }
                buttons[i][j].setEnabled(false);
            }
        }
    }

    // Check win condition
    private boolean checkWinCondition() {
        int revealedCells = 0;
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (revealed[i][j] && !isMine(i, j)) {
                    revealedCells++;
                }
            }
        }
        return revealedCells == (SIZE * SIZE - MINES);
    }

    // Main method
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new Minesweeper());
    }
}
