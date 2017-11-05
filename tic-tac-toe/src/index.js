import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';

/*
  List of players.
*/
const PLAYERS = {
  ONE: 'X',
  TWO: 'O'
}


class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // {array(PLAYERS?)} 1-D array with squares 0 to 9 row 1: squares 0 - 2,
      //    row 2: squares 3 - 5, row 3: squares 6 - 8
      squares: new Array(9).fill(null),
      // {PLAYERS} player is either 'X' or 'O'
      currentPlayer: PLAYERS.ONE,
      // {string} error message if user clicks on a non-null-square
      error: "",
      // {boolean} is true if game is over
      isGameOver: false,
      // {PLAYERS?} the winner
      winner: null,
      // {array(int)} indices of winning squares
      winningSquares: []
    };

     this.restartGame = this.restartGame.bind(this);
  }

  /*
    Updates the state properties if there is a winner.
  */
  maybeSetWinner() {
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

      let player = squares[WINNING_COMBOS[i][0]];
      if (player === squares[WINNING_COMBOS[i][1]] &&
          player === squares[WINNING_COMBOS[i][2]]) {
        this.setState({
          isGameOver: true,
          winner: player,
          winningSquares: WINNING_COMBOS[i],
        });
      }
    }
  }

  /*
    Updates state if game board is full.
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
    Reinitialize the game.
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
    @return {PLAYER?} next player
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
    Updates state on click event and checks if there is a winner or if the game
      board is full.
    @param {int i} the index of square
  */
  handleClick(i) {
    this.setState({ error: "" });
    const newSquares = this.state.squares.slice();

    if (this.maybeSetWinner()) {
      return;
    }

    if (newSquares[i] !== null) {
      this.setState({ error: "Please choose another square." });
      return;
    }

    newSquares[i] = this.state.currentPlayer;
    this.setState({ squares: newSquares, currentPlayer: this.getNextPlayer()},
      () => {
        this.maybeSetWinner();
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
