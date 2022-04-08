// Importing Components from node_modules
import React, { useState, useEffect } from 'react'
import Grid from '../components/Grid'
import { Client } from 'colyseus.js';
import ChatDrawer from '../components/ChatDrawer'
import MenuDrawer from '../components/MenuDrawer'

// Importing icons
import { AiOutlineMenu } from 'react-icons/ai';

//TODO the gameState should be passed to the things that need it, this holds all the needed game information

// Importing styling
import '../styles/ClassroomPage.scss';

function ClassroomPage(props) {

  let params = (new URL(document.location)).searchParams;
  const classId = params.get('id')
  //const { classId } = props;
  const [gameState, setGameState] = useState({
      users: []
  });
  const [chatMessages, setChatMessages] = useState([]);
  let client = null;
  let room = null;

  let p = {
      room
  };

  useEffect(() => {
    (async () => {
        client = new Client('ws://localhost:3001')
        const joinRoom = async () => {
          return client.joinOrCreate("classroom", {classId});
        };
        try {
          room = await joinRoom();
        } catch (e) {
          console.log("error connecting to classroom");
        }

        room.onStateChange((state) => {
            const users = [];

            state.users.forEach(u => {
                users.push({
                  x: u.x,
                  y: u.y
                });
            });

          setGameState({
              ...gameState,
              users: users
          });
        });



        room.onMessage("chat", (msg) => {
          setChatMessages([...chatMessages, msg]);
        });
      })();
  }, []);

  useEffect(() => {
    console.log("gameState: ", gameState);
  }, [gameState]);

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
        <MenuDrawer />
        <ChatDrawer />
      </div>
    </div>
    </>
  )
}

export default ClassroomPage