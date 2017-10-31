import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import { Players } from './player_list';

class Game extends Component {
  constructor(props) {
    super(props)
    const initialSquares = new Array(9).fill(null);

    this.state = {
      squares: initialSquares,
      currentPlayer: Players.ONE,
      error: ""
    }

    this.restartGame = this.restartGame.bind(this);
  }

  /*
    Returns a winner if one exists.
    @param {array{string}} squares the array representing the current state of the board. Valid values are 'X', 'O', or null.
    return {string} the symbol of the winner or null if there is no winner.
  */
  calculateWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const squares = this.state.squares;
    for (let i = 0; i < winningCombos.length; i++) {
      if (squares[winningCombos[i][0]] === null) {
        continue;
      }

      let currentChar = squares[winningCombos[i][0]];
      if (currentChar === squares[winningCombos[i][1]] &&
          currentChar === squares[winningCombos[i][2]]) {
        return currentChar;
      }
    }

    return null;
  }

  /*
    Checks if all squares in the board are either 'X' or 'O'.
    return {Boolean} true if all squares are not null, else false
  */
  isGameBoardFull() {
    for (let i = 0; i < this.state.squares.length; i++) {
      if (this.state.squares[i] === null) {
        return false;
      }
    }
    return true;
  }

  /*
    Re-initialize the game board squares to null.
  */
  restartGame() {
    const emptySquares = new Array(9).fill(null);
    this.setState({
      squares: emptySquares,
      currentPlayer: Players.ONE,
      error: ""
    });

    return null;
  }

  /*
    Sets the currentPlayer to the next player.
  */
  getNextPlayer() {
    switch (this.state.currentPlayer) {
      case Players.ONE:
        return Players.TWO;
      case Players.TWO:
        return Players.ONE;
      default:
        return null;
    }
  }

  /*
    Sets the value of a square to either 'X' or 'O'.
    return {string} an error message if a player selects a non-null square.
    return if there is a winner.
  */
  handleClick(i) {
    this.setState({ error: "" });
    const newSquares = this.state.squares.slice();

    if (this.calculateWinner()) {
      return;
    } else if (newSquares[i] !== null) {
      this.setState({ error: "Please choose another square." });
    } else {
      newSquares[i] = this.state.currentPlayer;
      this.setState({
        squares: newSquares,
        currentPlayer: this.getNextPlayer()
      });
    }
    return null;
  }

  render() {
    const winner = this.calculateWinner();
    const gameBoardFull = this.isGameBoardFull();
    let status = "";

    if (winner !== null) {
      status = `Game Over: Winner is Player ${winner}`;
    } else if (gameBoardFull) {
      status = "It's a Tie!";
    } else {
      let nextPlayer = (this.state.currentPlayer === Players.ONE) ?
          Players.TWO : Players.ONE;
      status = `Next Player: ${nextPlayer}`;
    }

    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>

        <div className="game-info">
          <section className="status">{ status }</section>
          {(winner !== null || gameBoardFull) ?
            <div className="play-again-button" onClick={ this.restartGame }>
              Play Again
            </div> :
            <section className="error">{ this.state.error }</section>
          }
        </div>

        <div className="game-board">
          <Board
            squares={ this.state.squares }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
