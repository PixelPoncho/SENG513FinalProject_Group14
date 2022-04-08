// TODO: fix infinite loop

import React, {useState, useEffect, useCallback } from 'react'
import Square from './Square'

// Import styling
import '../styles/GridStyling.scss'

const Player = (props) => {
  const user = props.user;

  const style = {
    position: "absolute",
    height: "34px",
    width: "34px",
    left: user.position.x * 34,
    top: user.position.y * 34,
    backgroundColor: user.chatColour
  };

  return (<div style={style}>pla</div>);
};

const Grid = props => {
  const {
    gridWidth
  } = props;

  const [square, setSquare] = useState([0, 0]);
  const [classGrid, setClassGrid] = useState([]);
  const [players, setPlayers] = useState([]);

  const [users, setUsers] = useState([ //TEMP - will come from somewhere
    {
      username: "123",
      chatColour: "#666666",
      skin: "Tanned",
      topType: "Turban",
      hairColour: "Auburn",
      clothingType: "BlazerShirt",
      clothingColour: "PastelBlue",
      position: {
        x: 5,
        y: 8
      }
    },
    {
      username: "234",
      chatColour: "#230000",
      skin: "Tanned",
      topType: "Turban",
      hairColour: "Auburn",
      clothingType: "BlazerShirt",
      clothingColour: "PastelBlue",
      position: {
        x: 2,
        y: 2
      }
    }
  ]);

  //TEMP MOVING USER
  const movingUser = {
    username: "345",
    chatColour: "#00FF00",
    skin: "Tanned",
    topType: "Turban",
    hairColour: "Auburn",
    clothingType: "BlazerShirt",
    clothingColour: "PastelBlue",
    position: {
      x: 6,
      y: 6
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setUsers(oldUsers => [...oldUsers, movingUser]);
    }, 10000);

    setInterval(() => {
      setUsers(oldUsers => {
        const newUsers = [];
        oldUsers.forEach(ou => {
          const nu = ou;
          nu.position.x = ou.position.x+1;
          nu.position.y = ou.position.y+1;
          newUsers.push(nu);
        })
        return newUsers;
      });
    }, 12000);
  }, []);
  //ENDTEMP

  const move = (dir, change) => {
    let coords = square
    if ((coords[dir] + change) > -1 && (coords[dir] + change) < gridWidth) {
      coords[dir] += change
    }
    //setSquare([coords[0], coords[1]])
  }

  useEffect(() => {
    let array = []
    for(let i = 0; i < gridWidth; i++) {
        for(let j = 0; j < gridWidth; j++) {
          const user = {
            username: "666666",
            chatColour: "#666666",
            skin: "Tanned",
            topType: "Turban",
            hairColour: "Auburn",
            clothingType: "BlazerShirt",
            clothingColour: "PastelBlue" // Hardcode for now
          };
          const player = <Player user={user} />;
          array.push(<Square
                      key={`${i} ${j}`}
                      x={j}
                      y={i}
                      selectedSquare={square} />)
      }
    }
    //setClassGrid(array)
  }, [square]);

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
      {users.map(user =>
        <Player key={user.username} user={user} />
      )}
    </div>
  );
}

export default Grid
