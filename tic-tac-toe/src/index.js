import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

/*
  Enumeration representing the players.
  'X' is Player one and 'O' is Player two.
*/
const PLAYERS = {
  ONE: 'X',
  TWO: 'O'
}


class Game extends Component {
  constructor(props) {
    super(props)

    this.restartGame = this.restartGame.bind(this);
    this.restartGame();
  }

  /*
    Returns a winner and winning combo if one exists.
    @return {array{char, array} | null} the symbol of the winner and the indices
      of the winning combo or null if there is no winner.
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
        return [currentChar, WINNING_COMBOS[i]];
      }
    }

    return null;
  }

  /*
    Checks if all squares in the board are either 'X' or 'O'.
    @return {boolean} true if all squares are not null
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
    Reinitialize the starting state of game.
  */
  restartGame() {
    this.state = {
      squares: new Array(9).fill(null), // {array} 1-D array with squares 0 to 9
        // row 1: squares 0 - 2, row 2: squares 3 - 5, row 3: squares 6 - 8
      currentPlayer: PLAYERS.ONE, // {char} player is either 'X' or 'O'
      error: "", // {string} error message if user clicks on a non-null-square
      isGameOver: false,
      winner: null,
      winningSquares: [] // {array} indices of winning squares
    };
  }

  /*
    Returns the next player.
    @return {char | null} next player
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
    Updates state with a new array of squares with the value of a square to
      either 'X' or 'O', an error message if a user clicks on a square with a
      non-null value, and the currentPlayer to the next player char.
    @param {int} i is the index of square
  */
  handleClick(i) {
    this.setState({ error: "" });
    const newSquares = this.state.squares.slice();

    if (this.calculateWinner()) {
      return;
    }

    if (newSquares[i] !== null) {
      this.setState({ error: "Please choose another square." });
      return;
    }

    newSquares[i] = this.state.currentPlayer;
    this.setState({
      squares: newSquares,
      currentPlayer: this.getNextPlayer()
    });

    // move from render function
    // should calculate if there is a winner here
    // should have is gameboardfull;
  }

  render() {
    const winner = this.calculateWinner();
    const gameBoardFull = this.isGameBoardFull();
    let status = "";
    let winningSquares = []; // should be state
    let isGameOver = false; // should be state

    // this should be in handle click function- it should check the state and
    // then update the status

    if (winner !== null) {
      status = `Game Over: Winner is Player ${winner[0]}`;
      winningSquares = winner[1];
      isGameOver = true;
    } else if (gameBoardFull) {
      status = "It's a Tie!";
      isGameOver = true;
    } else {
      // use getNextPlayer function
      let nextPlayer = (this.state.currentPlayer === PLAYERS.ONE) ?
          PLAYERS.TWO : PLAYERS.ONE;
      status = `Next Player: ${nextPlayer}`;
    }

    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>

        <div className="game-info">
          <section className="status">{ status }</section>
          {/* check for is game over */}
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
