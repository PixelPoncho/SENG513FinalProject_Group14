// Importing Components from node_modules
import React, { useState, useEffect } from 'react'
import Grid from '../components/Grid'
import { Client } from 'colyseus.js';

// Importing icons
import { AiOutlineMenu } from 'react-icons/ai';
import { FaMicrophone } from 'react-icons/fa';
import { HiChatAlt } from 'react-icons/hi';

//TODO the gameState should be passed to the things that need it, this holds all the needed game information

// Importing styling
import '../styles/ClassroomPage.scss';

function ClassroomPage(props) {
  const { classId } = props;
  const [gameState, setGameState] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  let client = null;
  let room = null;

  useEffect(() => {
    (async () => {
        client = new Client('ws://localhost:3001')
        const joinRoom = async () => {
          return await client.joinOrCreate("classroom", {classId});
        };
        try {
          room = await joinRoom();
        } catch (e) {
          console.log("error connecting to classroom");
        }

        room.onStateChange((state) => {
          console.log(gameState);
          setGameState(state);
        });
        room.onMessage("chat", (msg) => {
          setChatMessages([...chatMessages, msg]);
        });
      })();
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
    <>
    <div class='classroom-container'>
      <div class='classroom-grid'>
        <Grid gridWidth={14} />
      </div>

      <div class='classroom-sidenav'>
        <AiOutlineMenu
              style={{
                margin: "15px",
                padding: "10px",
                width: "50px",
                height: "60px",
                color: "var(--white)",
                backgroundColor: "var(--light-blue)",
                borderRadius: "20px",
                boxShadow: "var(--card-shadow)"
              }}
              onMouseOver={({ target }) => {
                target.style.backgroundColor = "var(--gray)";
                target.style.cursor = "pointer";
              }}
              onMouseOut={({ target }) => {
                target.style.backgroundColor = "var(--light-blue)";
                target.style.cursor = "default";
              }}
        />
        <div class="classroom-sidenav-space"></div>
        <FaMicrophone
              style={{
                margin: "15px",
                padding: "10px",
                width: "50px",
                height: "45px",
                color: "var(--white)",
                backgroundColor: "var(--light-blue)",
                borderRadius: "20px",
                boxShadow: "var(--card-shadow)"
              }}
              onMouseOver={({ target }) => {
                target.style.backgroundColor = "var(--gray)";
                target.style.cursor = "pointer";
              }}
              onMouseOut={({ target }) => {
                target.style.backgroundColor = "var(--light-blue)";
                target.style.cursor = "default";
              }}
        />
        <HiChatAlt
              style={{
                margin: "15px",
                padding: "10px",
                width: "50px",
                height: "45px",
                color: "var(--white)",
                backgroundColor: "var(--light-blue)",
                borderRadius: "20px",
                boxShadow: "var(--card-shadow)"
              }}
              onMouseOver={({ target }) => {
                target.style.backgroundColor = "var(--gray)";
                target.style.cursor = "pointer";
              }}
              onMouseOut={({ target }) => {
                target.style.backgroundColor = "var(--light-blue)";
                target.style.cursor = "default";
              }}
        />
      </div>
    </div>
    </>
  )
}

export default ClassroomPage