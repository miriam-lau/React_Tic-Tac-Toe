import React from 'react';

/*
  Renders a square on the game board.
  @param {props} the list of props are:
    {boolean} true is square is a winningSquare
    {boolean} true if game is over
    {function onClick} calls handleClick function in index.js
  @return {html element div} square 
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
