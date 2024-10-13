import React, { useState, useEffect } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  useEffect(() => {
    if (!isUserTurn && !winner) {
      // Delay computer move to simulate thinking
      setTimeout(() => {
        computerMove(board);
      }, 500);
    }
  }, [isUserTurn, winner, board]);

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkTie = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const findBestMove = (newBoard, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] === player && newBoard[b] === player && !newBoard[c]) return c;
      if (newBoard[a] === player && newBoard[c] === player && !newBoard[b]) return b;
      if (newBoard[b] === player && newBoard[c] === player && !newBoard[a]) return a;
    }
    return null;
  };

  const computerMove = (newBoard) => {
    // Check if computer can win
    let move = findBestMove(newBoard, "O");
    if (move === null) {
      // Check if computer needs to block the player
      move = findBestMove(newBoard, "X");
    }

    // If neither, pick a random available move
    if (move === null) {
      let availableSpots = newBoard.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null);
      move = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }

    newBoard[move] = "O";
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkTie(newBoard)) {
      setIsTie(true);  // Set tie state if the board is full and no winner
    } else {
      setIsUserTurn(true);
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isUserTurn || isTie) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }

    if (checkTie(newBoard)) {
      setIsTie(true);
      return;
    }

    setIsUserTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setWinner(null);
    setIsTie(false);
  };

  const renderSquare = (index) => {
    return (
      <button
        className="w-24 h-24 bg-gray-700 text-white flex items-center justify-center text-4xl font-bold border-2 border-gray-600 hover:bg-gray-500 transition duration-300 ease-in-out"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe (YOU v/s Computer)</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {winner && (
        <div className="mt-4 text-2xl font-bold text-green-400">
          {winner === "X" ? "You win!" : "Computer wins!"}
        </div>
      )}
      {isTie && (
        <div className="mt-4 text-2xl font-bold text-yellow-400">
          Game tied, restart again!
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300 ease-in-out"
        onClick={resetGame}
      >
        Restart Game
      </button>
    </div>
  );
};

export default App;
