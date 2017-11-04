import React, { Component } from 'react';
import Square from './square';

class Board extends Component {
  /*
    Renders a square on the game board and passes props to the Square component
    @param {int} index of square
    @param {function(onClick)} handleClick function from index.js
    return {component} Square component
  */
  renderSquare(squareIndex) {
    let isWinningSquare = false;
    for (let i = 0; i < this.props.winningSquares.length; i++) {
      if (squareIndex === this.props.winningSquares[i]) {
        isWinningSquare = true;
        break;
      }
    }

    return (
      <Square
        index={ squareIndex }
        isWinningSquare={ isWinningSquare }
        isGameOver={ this.props.isGameOver }
        value={ this.props.squares[squareIndex] }
        onClick={ () => this.props.onClick(squareIndex) }
      />
    );
  }

  render() {
    return(
      <div>
        <section className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </section>
        <section className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </section>
        <section className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </section>
      </div>
    );
  }
}

export default Board;
