// Importing Components from node_modules
import React, { useState, useEffect } from 'react'
import Grid from '../components/Grid'
import { Client } from 'colyseus.js';

//TODO the gameState should be passed to the things that need it, this holds all the needed game information

// Importing styling
import '../styles/ClassroomPage.scss';

function ClassroomPage(props) {
  const { classId } = props;
  const [gameState, setGameState] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  let client = null;
  let room = null;

  useEffect(async () => {
    client = new Client('ws://localhost:3001')
    const joinRoom = async () => {
      return await client.joinOrCreate("classroom", { classId });
    };
    try {
      room = await joinRoom();
    }
    catch(e) {
      console.log("error connecting to classroom");
    }

    room.onStateChange((state) => {
      console.log(gameState);
      setGameState(state);
    });
    room.onMessage("chat", (msg) => {
      setChatMessages([...chatMessages, msg]);
    });
  }, []);

  const sendAction = (actionType, actionValue) => {
    // currently options
    // Action Type : Action Value
    //  chat : message the user wants to send
    //  move : { deltaX: ?, deltaY: ? } the deltas in the users movements.
    if(!room) return;
    room.send(actionType, actionValue);
  };

  return (
    <div className="classroom-container">
      <Grid gridWidth={14} />
    </div>
  )
}

export default ClassroomPage