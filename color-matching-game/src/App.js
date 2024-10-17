// src/App.js
import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/Alert"; // Correct the import path

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];
const GAME_DURATION = 30; // in seconds

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameOver, setGameOver] = useState(false);

  const startNewRound = () => {
    const newTargetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(newTargetColor);

    const newOptions = [...COLORS].sort(() => 0.5 - Math.random()).slice(0, 4);

    if (!newOptions.includes(newTargetColor)) {
      newOptions[Math.floor(Math.random() * 4)] = newTargetColor;
    }

    setOptions(newOptions);
  };

  const handleColorClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
    }
    startNewRound();
  };

  useEffect(() => {
    startNewRound();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const restartGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    startNewRound();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Color Matching Game</h1>

      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-4">Your score: {score}</p>
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Click the color:</AlertTitle>
            <AlertDescription>
              <span
                className="font-bold text-xl"
                style={{ color: targetColor }}
              >
                {targetColor}
              </span>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorClick(color)}
                className="w-20 h-20 rounded-lg shadow-md transition-transform hover:scale-105"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <div className="text-xl mb-2">Score: {score}</div>
          <div className="text-xl">Time left: {timeLeft}s</div>
        </>
      )}
    </div>
  );
}

export default App;
