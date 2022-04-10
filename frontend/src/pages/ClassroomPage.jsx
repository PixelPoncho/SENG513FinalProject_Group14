// Importing Components from node_modules
import React, {useState, useEffect, useCallback, useMemo} from 'react'

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
  const roomP = useMemo( async() => new Promise(async (resolve, reject) => {
        const params = (new URL(document.location)).searchParams;
        const classId = params.get('id');

        try {
            const client = new Client('ws://localhost:3000');
            const room = await client.joinOrCreate("classroom", {classId});
            resolve(room);
        }
        catch(e) {
            console.log("error connecting to classroom");
        }
    }), []);

  const [gameState, setGameState] = useState({ users: [] });
  const [chatMessages, setChatMessages] = useState([]);

  // Put remote room state changes into gameState and chatMessages
  useEffect(() => {
    (async () => {
        const room = await roomP;

        room.onStateChange((state) => {
            const users = [];

            state.users.forEach(u => {
                users.push({
                  x: u.x,
                  y: u.y,
                    userId: u.userId,
                    username: u.username,
                    email: u.email,
                    avatar: {
                        skin: u.avatar.skin,
                        topType: u.avatar.topType,
                        hairColour: u.avatar.hairColour,
                        clothingType: u.avatar.clothingType,
                        clothingColour: u.avatar.clothingColour,
                    }
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


  // Print out game state, a useful debugging function
  // useEffect(() => {
  //   console.log("gameState: ", gameState);
  // }, [gameState]);

  const sendAction = (actionType, actionValue) => {
    // currently options
    // Action Type : Action Value
    //  chat : message the user wants to send
    //  move : { deltaX: ?, deltaY: ? } the deltas in the users movements.
    roomP.then(room => {
        if(!room) {
            return;
        }
        room.send(actionType, actionValue);
    });
  };

  return (
    <>
    <div className='classroom-container'>
      <div className='classroom-grid'>
        <Grid gridWidth={14} sendAction={sendAction} gameState={gameState} />
      </div>
      <div className='classroom-sidenav'>
        <MenuDrawer />
        <ChatDrawer />
      </div>
    </div>
    </>
  )
}

export default ClassroomPage