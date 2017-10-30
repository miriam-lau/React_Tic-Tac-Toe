import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

class Game extends Component {
  render() {
    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
