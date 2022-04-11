import React from 'react';

// Import styling
import '../styles/SquareStyling.scss';

const Square = props => {
  const {
    x,
    y,
    selectedSquare,
    player,
  } = props;

  return (
    <div className={selectedSquare[0] === x && selectedSquare[1] === y ? `selected square` : `square`}>
      {player}
    </div>
  );
};

export default Square;
