import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

/*
  List of Players.
  return {string} 'X' if player is Player.ONE, 'O', if player is Player.TWO.
*/
const PLAYERS = {
  ONE: 'X',
  TWO: 'O'
}


class Game extends Component {
  constructor(props) {
    super(props)
    const initialSquares = new Array(9).fill(null);

    this.state = {
      squares: initialSquares,
      currentPlayer: PLAYERS.ONE,
      error: "",
      winningSquares: []
    }

    this.restartGame = this.restartGame.bind(this);
  }

  /*
    Returns a winner and winning combo if one exists.
    return {array{char, array} the symbol of the winner and the indices of the
      winning combo or null if there is no winner.
  */
  calculateWinner() {
    const WINNING_COMBOS = [
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
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      if (squares[WINNING_COMBOS[i][0]] === null) {
        continue;
      }

      let currentChar = squares[WINNING_COMBOS[i][0]];
      if (currentChar === squares[WINNING_COMBOS[i][1]] &&
          currentChar === squares[WINNING_COMBOS[i][2]]) {
        // this.setState({ winningSquares: WINNING_COMBOS[i] });
        return [currentChar, WINNING_COMBOS[i]];
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
    Re-initialize the game board squares to null.hgfhg
  */
  restartGame() {
    const emptySquares = new Array(9).fill(null);
    this.setState({
      squares: emptySquares,
      currentPlayer: PLAYERS.ONE,
      error: ""
    });

    return null;
  }

  /*
    Sets the currentPlayer to the next player.
  */
  getNextPlayer() {
    switch (this.state.currentPlayer) {
      case PLAYERS.ONE:
        return PLAYERS.TWO;
      case PLAYERS.TWO:
        return PLAYERS.ONE;
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
    let winningSquares = [];
    let isGameOver = false;

    if (winner !== null) {
      status = `Game Over: Winner is Player ${winner[0]}`;
      winningSquares = winner[1];
      isGameOver = true;
    } else if (gameBoardFull) {
      status = "It's a Tie!";
      isGameOver = true;
    } else {
      let nextPlayer = (this.state.currentPlayer === PLAYERS.ONE) ?
          PLAYERS.TWO : PLAYERS.ONE;
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
            winningSquares= { winningSquares }
            isGameOver={ isGameOver }
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
