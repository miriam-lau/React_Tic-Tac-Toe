import React from 'react';

/*
  Renders a square on the game board.
  @param {int} index position of square
  @param {boolean} true is square is a winningSquare, else false
  @param {function{onClick}} calls handleClick function in index.js
*/
const Square = (props) => {
  let gameOverStatus = "";
  if (props.isWinningSquare) {
    gameOverStatus = "winning-square";
  } else if (props.isGameOver) {
    gameOverStatus = "game-over-square"
  }

  return(
    <div
      className={"square " + gameOverStatus}
      onClick={ props.onClick }>
        <section>{ props.value }</section>
    </div>
  );
}

export default Square;
