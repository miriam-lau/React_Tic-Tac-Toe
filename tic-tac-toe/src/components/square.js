import React from 'react';

/*
  Renders a square on the game board.
  @param {int} index position of square
  @param {function{onClick}} calls handleClick function in index.js
*/
const Square = (props) => {
  return(
    <div
      className="square"
      onClick={ props.onClick }>
        <section>{ props.value }</section>
    </div>
  );
}

export default Square;
