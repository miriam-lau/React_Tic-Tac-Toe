import React from 'react';

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
