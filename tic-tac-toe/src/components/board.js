import React, { Component } from 'react';
import Square from './square';
import { calculateWinner, isOver } from '../util/helper_methods';

class Board extends Component {
  constructor(props) {
    super(props)
    const initialSquares = new Array(9).fill(null);
    this.state = { squares: initialSquares, isXNext: true };
  }

  renderSquare(i) {
    return (
      <Square
        value={ this.state.squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    );
  }

  handleClick(i) {
    const newSquares = this.state.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState({ squares: newSquares, isXNext: !this.state.isXNext });
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) {
      status = `Winner is Player ${winner}`;
    } else if (isOver(this.state.squares)) {
      status = 'It\'s a Tie';
    } else {
      status = this.state.isXNext ? 'Next Player: X' : 'Next Player: O';
    }

    return(
      <div>
        <section className="status">{ status }</section>
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
