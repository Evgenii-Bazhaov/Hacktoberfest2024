# Function to print the Tic-Tac-Toe board
def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 9)

# Function to check if there's a winner
def check_winner(board, player):
    # Check rows, columns, and diagonals for a win
    for row in board:
        if all([spot == player for spot in row]):
            return True

    for col in range(3):
        if all([board[row][col] == player for row in range(3)]):
            return True

    if all([board[i][i] == player for i in range(3)]) or all([board[i][2 - i] == player for i in range(3)]):
        return True

    return False

# Function to check if the board is full (draw condition)
def check_draw(board):
    return all([spot != ' ' for row in board for spot in row])

# Main function to run the Tic-Tac-Toe game
def tic_tac_toe():
    # Initialize the empty board
    board = [[' ' for _ in range(3)] for _ in range(3)]
    players = ['X', 'O']
    current_player = 0

    print("Welcome to Tic-Tac-Toe!")
    print_board(board)

    while True:
        # Get the current player's move
        row = int(input(f"Player {players[current_player]}: Enter row (0, 1, or 2): "))
        col = int(input(f"Player {players[current_player]}: Enter column (0, 1, or 2): "))

        # Validate the move
        if board[row][col] != ' ':
            print("This spot is already taken. Try again.")
            continue

        # Place the move on the board
        board[row][col] = players[current_player]
        print_board(board)

        # Check for a winner or draw
        if check_winner(board, players[current_player]):
            print(f"Player {players[current_player]} wins!")
            break

        if check_draw(board):
            print("It's a draw!")
            break

        # Switch to the other player
        current_player = 1 - current_player

# Start the game
tic_tac_toe()
