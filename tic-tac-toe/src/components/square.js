import React from 'react';

/**
 * Renders a square on the game board.
 * @param {prop} the list of props are:
 * @prop {boolean} true is square is a winningSquare
 * @prop {boolean} true if game is over
 * @prop {function onClick} calls handleClick function in index.js
 * @return {html element div} square
 */
const Square = (props) => {
  let gameOverClassName = "";
  if (props.isWinningSquare) {
    gameOverClassName = "winning-square";
  } else if (props.isGameOver) {
    gameOverClassName = "game-over-square";
  }

  // in onClick these work:
  //  onClick={ () => props.onClick() }
  //  onClick={ (e) => props.onClick(e) }
  //  onClick={ props.onClick }
  // this does not work (max call stack exceeded error) because invoked function
  // with no callback 
  //  onClick={ props.onClick() }
  return(
    <div
      className={"square " + gameOverClassName}
      onClick={ () => props.onClick() }>
        <section>{ props.value }</section>
    </div>
  );
}

export default Square;
