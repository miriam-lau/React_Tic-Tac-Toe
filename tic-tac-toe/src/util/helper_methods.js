/*
  Returns a winner if any
  param{ squares } the array with all current state
  return{ String } symbol of winner or null
*/
export const calculateWinner = (squares) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 4],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    let currentSymbol;

    if (squares[winningCombos[i][0]]) {
      currentSymbol = squares[winningCombos[i][0]];
    }

    if (currentSymbol === squares[winningCombos[i][1]] &&
        currentSymbol === squares[winningCombos[i][2]]) {
      return currentSymbol;
    }
  }
  return null;
}

/*
  Checks if game is over
  param{ squares } the array with all current state
  return{ Boolean } true if all squares are not null, else false
*/
export const isOver = (squares) => {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false;
    }
  }

  return true;
}
