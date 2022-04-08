// TODO: fix infinite loop

import React, {useState, useEffect, useCallback } from 'react'
import Square from './Square'

// Import styling
import '../styles/GridStyling.scss'

const Grid = props => {
  const {
    gridWidth
  } = props;

  const [square, setSquare] = useState([0, 0])
  const [classGrid, setClassGrid] = useState([])

  const move = (dir, change) => {
    let coords = square
    if ((coords[dir] + change) > -1 && (coords[dir] + change) < gridWidth) {
      coords[dir] += change
    }
    setSquare([coords[0], coords[1]])
  }

  useEffect(() => {
    let array = []
    for(let i = 0; i < gridWidth; i++) {
        for(let j = 0; j < gridWidth; j++) {
          array.push(<Square
                      x={j}
                      y={i}
                      selectedSquare={square}/>)
      }
    }
    setClassGrid(array)
  }, [move])

  const handleKeyPress = useCallback(e => {
    // WASD Movement
    switch (e.which) {
      // W
      case 87:
        move(1, -1);
        break;
      // A
      case 65:
        move(0, -1);
        break;
      // S
      case 83:
        move(1, 1);
        break;
      // D
      case 68:
        move(0, 1);
        break;
    }
  }, []);

  useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
          window.removeEventListener("keydown", handleKeyPress);
      };
  }, [handleKeyPress]);


  return (
    <div className="grid-box"
           style={{"width": gridWidth * 34, "height": gridWidth * 34}}>
        {classGrid}
    </div>
  );
}

export default Grid
