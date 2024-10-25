"use client"

import { useEffect, useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function SudokuLayout() {
  const initialState: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  const [sudokuGrid, setSudokuGrid] = useState<number[][]>(initialState)

  function changeValue(i: number, j: number, num: string) {
    let newState = sudokuGrid
    newState[i][j] = Number.parseInt(num)
    return setSudokuGrid(newState)
  }

  return (
    <div className="flex flex-col items-center gap-1 p-2 md:gap-2">
      {sudokuGrid.map((row, i) => (
        <div key={i + 1} className="flex gap-1 md:gap-2">
          {row.map((box, j) => (
            <div
              key={j * 10 + i}
              className="relative flex size-8 items-center justify-center rounded-sm bg-secondary md:size-10"
            >
              <Label className="absolute size-full" htmlFor={`${j * 10 + i}`} />
              <Input
                id={`${j * 10 + i}`}
                placeholder={`${sudokuGrid[i][j]}`}
                type="number"
                max={9}
                min={0}
                onChange={(e) => {
                  changeValue(i, j, e.target.value)
                }}
                className="z-10 size-8 border-none bg-transparent p-0 md:size-8"
              />
            </div>
          ))}
        </div>
      ))}
      <Button
        onClick={() => console.log(sudokuGrid)}
        className="w-full max-w-lg"
      >
        Submit
      </Button>
    </div>
  )
}
