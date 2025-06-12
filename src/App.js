import React, { useState } from 'react';
import Board from './Board';
import './App.css';
import generateBoard from './generateBoard';

const initialBoard = generateBoard();
// Generates a new board


function isValidSudoku(board) {
  let rows = [];
  let columns = [];
  let boxes = [];
  for (let i = 0; i < 9; i++) {
    rows.push([]);
    columns.push([]);
    boxes.push([]);
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {

      let cell = board[i][j];

      if (cell !== "0") {
        if (rows[i].includes(cell)) {
          return false
        } else {
          rows[i].push(cell);
        }
        if (columns[j].includes(cell)) {
          return false;
        } else {
          columns[j].push(cell);
        }

        let boxIndex = Math.floor((i / 3)) * 3 + Math.floor(j / 3);

        if (boxes[boxIndex].includes(cell)) {
          return false;
        } else {
          boxes[boxIndex].push(cell);
        }
      }
    }
  }
  return true
}


function App() {
  const [k, setK] = useState(20); // Número de células vazias
  const [board, setBoard] = useState(generateBoard(k)); // Tabuleiro inicial

  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = parseInt(value) || 0; // Convert to number, default to 0 if empty
    setBoard(newBoard);
  };

  const handleCheckSolution = () => {
    if (isValidSudoku(board)) {
      alert("Congratulations! The solution is correct.");
    } else {
      alert("The Sudoku solution is invalid. Please try again.");
    }
  };

  const handleReset = () => {
    setBoard(generateBoard(k)); // Gera um novo tabuleiro com o valor atual de k
  };

  const handleDifficultyChange = (event) => {
    const newK = parseInt(event.target.value);
    setK(newK); // Atualiza o número de células vazias
    setBoard(generateBoard(newK)); // Gera um novo tabuleiro com a nova dificuldade
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <h1 style={{textAlign:'center'}}>Sudoku Game da Ellie</h1>
        <Board board={board} onCellChange={handleCellChange} />
        <button onClick={handleCheckSolution} style={{ marginTop: "1rem" }}>Check Solution</button>
        <button onClick={handleReset}>Reset Board</button>
        <div>
          <label htmlFor="difficulty" style={{ marginTop: "1rem" }}>Choose Difficulty:</label>
          <select id="difficulty" onChange={handleDifficultyChange}>
            <option value="20">Easy</option>
            <option value="40">Medium</option>
            <option value="60">Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;