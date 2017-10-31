import React, { Component } from 'react';
import Square from './square';

class Board extends Component {
  /*
    Renders a square on the game board and passes props to the Square component
    @param {int} index of square
    @param {function(onClick)} handleClick function from index.js
    return {component} Square component
  */
  renderSquare(i) {
    return (
      <Square
        value={ this.props.squares[i] }
        onClick={ () => this.props.onClick(i) }
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
