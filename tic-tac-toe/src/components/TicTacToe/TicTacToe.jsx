import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);

  const toggle = (num) => {
    if (data[num] || lock) return; // Check if the cell is already filled or game is locked

    const newData = [...data];
    newData[num] = count % 2 === 0 ? "x" : "o";
    setData(newData);
    setCount(count + 1);
  };

  const renderIcon = (value) => {
    if (value === "x") {
      return <img src={cross_icon} alt="cross" className="icon" />;
    } else if (value === "o") {
      return <img src={circle_icon} alt="circle" className="icon" />;
    }
    return null;
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setWinner(null); // Clear winner state
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of winPatterns) {
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setLock(true);
        setWinner(data[a]);
        return;
      }
    }
  };

  useEffect(() => {
    checkWin();
  }, [data]); // Run checkWin whenever data changes

  return (
    <div className='container'>
      <h1 className='title-style'>
        Tic Tac Toe Game In <span>React</span>
      </h1>
      {winner && (
        <h2 className='winner-message'>
          Congratulations! <img src={winner === "x" ? cross_icon : circle_icon} alt="winner" className="icon" />
        </h2>
      )}
      <div className='board'>
        <div className='row1'>
          <div className='boxes' onClick={() => toggle(0)}>{renderIcon(data[0])}</div>
          <div className='boxes' onClick={() => toggle(1)}>{renderIcon(data[1])}</div>
          <div className='boxes' onClick={() => toggle(2)}>{renderIcon(data[2])}</div>
        </div>
        <div className='row2'>
          <div className='boxes' onClick={() => toggle(3)}>{renderIcon(data[3])}</div>
          <div className='boxes' onClick={() => toggle(4)}>{renderIcon(data[4])}</div>
          <div className='boxes' onClick={() => toggle(5)}>{renderIcon(data[5])}</div>
        </div>
        <div className='row3'>
          <div className='boxes' onClick={() => toggle(6)}>{renderIcon(data[6])}</div>
          <div className='boxes' onClick={() => toggle(7)}>{renderIcon(data[7])}</div>
          <div className='boxes' onClick={() => toggle(8)}>{renderIcon(data[8])}</div>
        </div>
      </div>
      <button className='reset' onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
