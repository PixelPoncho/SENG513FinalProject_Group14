// TODO: fix infinite loop

import React, { useState, useEffect, useCallback } from 'react';
import Avatar from "avataaars";

// Import styling
import '../styles/GridStyling.scss';

import { FaLongArrowAltDown, FaLongArrowAltUp, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';



// The component that will represent a person on the gameboard via their avatar
const Player = (props) => {
  const user = props.user;

  const style = {
    position: "absolute",
    height: "34px",
    width: "34px",
    left: user.x * 34,
    top: user.y * 34,
  };

  return (
    <div className="avatar-container" style={style}>
      <span className="avatar-name">{user.username}</span>
      <Avatar
        style={{ width: style.width, height: style.height }}
        avatarStyle='Transparent'
        topType={user.avatar.topType}
        // accessoriesType='Prescription02'
        hairColor={user.avatar.hairColour}
        // facialHairType='Blank'
        clotheType={user.avatar.clothingType}
        clotheColor={user.avatar.clothingColour}
        // eyeType='Happy'
        // eyebrowType='Default'
        // mouthType='Smile'
        skinColor={user.avatar.skin}
      />
    </div>
  );
};

const Grid = props => {
  const {
    gridWidth,
    sendAction,
    gameState,
  } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(gameState.users);
  }, [gameState]);


  const move = (deltaX, deltaY) => {
    sendAction("move", { deltaX, deltaY });
  };

  const handleKeyPress = useCallback(e => {
    // WASD Movement
    switch (e.which) {
      // W
      case 87:
        move(0, -1);
        break;
      // A
      case 65:
        move(-1, 0);
        break;
      // S
      case 83:
        move(0, 1);
        break;
      // D
      case 68:
        move(1, 0);
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
    <div
      className="grid-box"
      style={{ "width": gridWidth * 34, "height": gridWidth * 34 }}
    >
      {users.map(user => <Player key={user.username} user={user} /> )}
        <div className="arrow-container">
            <div className="left" onClick={() => move(-1,0)}><FaLongArrowAltLeft /></div>
            <div className="right" onClick={() => move(1,0)}><FaLongArrowAltRight /></div>
            <div className="up" onClick={() => move(0,-1)}><FaLongArrowAltUp /></div>
            <div className="down" onClick={() => move(0,1)}><FaLongArrowAltDown /></div>
        </div>
    </div>
  );
};

export default Grid;
