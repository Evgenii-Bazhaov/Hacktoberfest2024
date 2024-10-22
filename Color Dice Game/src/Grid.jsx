/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
export default function GridSection({ rowCount }) {
  const uniqueColor = new Array((rowCount * 4) / 2).fill(0).map(() => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  });
  const pairColor = [...uniqueColor, ...uniqueColor];
  pairColor.sort(() => Math.random() - 0.5);
  const getGridColor = [];
  for (let i = 0; i < pairColor.length; i += 4) {
    getGridColor.push(pairColor.slice(i, i + 4));
  }

  const [gridColor, setGridColor] = useState(getGridColor);
  const [alreadySelectedGridColor, setAlreadySelectedGridColor] =
    useState(null);
  const [alreadySelectedGridIndex, setAlreadySelectedGridIndex] = useState([]);

  const setGridCSS = ({ row, col, color }) => {
    document.getElementById(`${row}-${col}`).style.backgroundColor = color;
    document.getElementById(`${row}-${col}`).style.transition = "all 0.5s";
    document.getElementById(`${row}-${col}`).style.cursor = "not-allowed";
  };

  const handleGridClick = ({ rowIndex, colIndex }) => {
    if (alreadySelectedGridColor === null) {
      setAlreadySelectedGridColor(gridColor[rowIndex][colIndex]);
      setAlreadySelectedGridIndex([rowIndex, colIndex]);
      setGridCSS({
        row: rowIndex,
        col: colIndex,
        color: gridColor[rowIndex][colIndex],
      });
    } else {
      if (gridColor[rowIndex][colIndex] === alreadySelectedGridColor) {
        setGridCSS({
          row: rowIndex,
          col: colIndex,
          color: gridColor[rowIndex][colIndex],
        });
        setAlreadySelectedGridColor(null);
        setAlreadySelectedGridIndex([]);
      } else {
        setGridCSS({
          row: rowIndex,
          col: colIndex,
          color: gridColor[rowIndex][colIndex],
        });
        setTimeout(() => {
          setGridCSS({
            row: rowIndex,
            col: colIndex,
            color: "#FFFFFF",
          });
          document.getElementById(`${rowIndex}-${colIndex}`).style.cursor =
            "pointer";
          const [prevRow, prevCol] = alreadySelectedGridIndex;
          setGridCSS({
            row: prevRow,
            col: prevCol,
            color: "#FFFFFF",
          });
          document.getElementById(`${prevRow}-${prevCol}`).style.cursor =
            "pointer";
        }, 1000);
        setAlreadySelectedGridColor(null);
        setAlreadySelectedGridIndex([]);
      }
    }
  };

  return (
    <div className="flex flex-col">
      {new Array(rowCount).fill(0).map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-row">
          {new Array(4).fill(0).map((col, colIndex) => (
            <div
              key={colIndex}
              className={`h-[20vh] w-[20vw] border border-black cursor-pointer hover:border-2 bg-white`}
              id={`${rowIndex}-${colIndex}`}
              onClick={() => handleGridClick({ rowIndex, colIndex })}
              style={{ backgroundColor: gridColor[rowIndex][colIndex] }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
