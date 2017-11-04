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

    this.state = {
      squares: new Array(9).fill(null), // {array} 1-D array with squares 0 to 9
        // row 1: squares 0 - 2, row 2: squares 3 - 5, row 3: squares 6 - 8
      currentPlayer: PLAYERS.ONE, // {char} player is either 'X' or 'O'
      error: "", // {string} error message if user clicks on a non-null-square
      isGameOver: false,
      winner: null,
      winningSquares: [] // {array} indices of winning squares
    };

    // why does restartGame need to bind this and not the other functions?
     this.restartGame = this.restartGame.bind(this);
    //  this.restartGame();  warning: called this.setState on a unmounted component
  }

  /*
    Updates the state properties if there is a winner:
      "isGameOver" to true
      "winner" to current player's char
      "winningSquares" to the WINNING_COMBOS array
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
        this.setState({
          isGameOver: true,
          winner: currentChar,
          winningSquares: WINNING_COMBOS[i],
        });
      }
    }
  }

  /*
    Updates "isGameOver" property in state to true if game board has no more
      non-null values.
  */
  isGameBoardFull() {
    for (let i = 0; i < this.state.squares.length; i++) {
      if (this.state.squares[i] === null) {
        return;
      }
    }
    this.setState({ isGameOver: true });
  }

  /*
    Reinitialize the starting state of game.
  */
  restartGame() {
    this.setState({
      squares: new Array(9).fill(null),
      currentPlayer: PLAYERS.ONE,
      error: "",
      isGameOver: false,
      winner: null,
      winningSquares: []
    });
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
    Updates state properties:
      "squares" with a new array of squares with the value of a square to
        either 'X' or 'O'
      "error" an error message if a user clicks on a square with a non-null
        value
      "currentPlayer" to the next player char
    Checks if there is a winner or if the game board is full.
    @param {int i} the index of square
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
    this.setState({ squares: newSquares, currentPlayer: this.getNextPlayer()},
      () => {
        this.calculateWinner();
        this.isGameBoardFull();
      }
    );
  }

  render() {
    let status = "";

    if (this.state.winner !== null) {
      status = `Game Over: Winner is Player ${this.state.winner}`;
    } else if (this.state.isGameOver) {
      status = "It's a Tie!";
    } else {
      status = `Next Player: ${this.getNextPlayer()}`;
    }

    return (
      <div className="game">
        <h1>Tic Tac Toe</h1>

        <div className="game-info">
          <section className="status">{ status }</section>
          {this.state.isGameOver ?
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
            winningSquares= { this.state.winningSquares }
            isGameOver={ this.state.isGameOver }
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
