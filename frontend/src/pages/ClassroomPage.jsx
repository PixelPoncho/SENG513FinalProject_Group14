// Importing Components from node_modules
import React, {useState, useEffect, useCallback, useMemo} from 'react'

import Grid from '../components/Grid'
import { Client } from 'colyseus.js';
import ChatDrawer from '../components/ChatDrawer'
import MenuDrawer from '../components/MenuDrawer'
import ChatHistory from '../components/ChatHistory';
import ExitModal from '../components/ExitModal'
import ChatBubble from '../components/ChatBubble';

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
            const client = new Client('ws://localhost:3001');
            console.log("About to call client.joinOrCreate");

            const room = await client.joinOrCreate("classroom", {classId});
            resolve(room);
        }
        catch(e) {
            console.log("error connecting to classroom");
        }
    }), []);
  
  const avatarMsg = "To edit your avatar, you must return to the dashboard. You will be disconnected from the classroom."
  const exitMsg = "You will be disconnected from the space and taken back to the Manage Classrooms page."
  
  const [gameState, setGameState] = useState({ users: [] });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatBubbles, setChatBubbles] = useState([]);
  const [message, setMessage] = useState("");

  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const handleChatHistoryClick = () => {
    setIsChatHistoryOpen(!isChatHistoryOpen)
  }

  const handleAvatarModalClick = () => {
    setIsAvatarModalOpen(!isAvatarModalOpen)
  }

  const handleExitModalClick = () => {
    setIsExitModalOpen(!isExitModalOpen)
  }

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
                    chatColour: u.chatColour,
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

            // console.log("users from server", users);

            setGameState({
              ...gameState,
              users: users
          });
        });

        room.onMessage("chat", (msg) => {
          setChatMessages(oldChatMessages => [...oldChatMessages, msg]);
          console.log("this is msg", msg)
          setChatBubbles(oldChatMessages => [...oldChatMessages, <ChatBubble username={msg.username} message={msg.content} colour={msg.chatColour} />]);
        });
      })();
  }, []);

  // TODO: only keep most recent 5 messages of chat bubbles, push oldest out
  useEffect(() => {
    console.log("thsi is chat bubbles", chatBubbles)
  }, [chatBubbles])

  // TODO: empty chat message on page load
  useEffect(() => {
    sendAction("chat", message );
  }, [message])

    useEffect(() => {
        return async () => {
            const room = await roomP;
            room.leave();
        }
    }, [])


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

    // setTimeout(() => {
    //     sendAction("chat", "message");
    // }, 4000);

    // window.sendChatMessageToMe = () => {
    //     sendAction("chat", "message");
    // };
    
    window.printChatMessages = () => {
        console.dir(chatMessages);
        console.dir(chatBubbles);
    }

    // useEffect(() => {
    //   console.log("this is chat messages", chatMessages)
    // }, [chatMessages])

  return (
    <div className='classroom-container'>

      {/* TODO: Handle logic for incoming messages */}
      <div className='incoming-container'>
        {chatBubbles}
      </div>
      
      {isChatHistoryOpen && 
        <ChatHistory 
          history={chatMessages}
          handleChatHistoryClick={handleChatHistoryClick}
        />
      }

      {isAvatarModalOpen &&
        <ExitModal 
          handleModalClick={handleAvatarModalClick}
          message={avatarMsg}
        />
      }

      {isExitModalOpen &&
        <ExitModal 
          handleModalClick={handleExitModalClick}
          message={exitMsg}
        />
      }

      <div className='classroom-grid'>
        <Grid gridWidth={14} sendAction={sendAction} gameState={gameState} />
      </div>

      <div className='classroom-sidenav'>
        <MenuDrawer
          handleChatHistoryClick={handleChatHistoryClick}
          handleAvatarModalClick={handleAvatarModalClick}
          handleExitModalClick={handleExitModalClick}
        />
        <ChatDrawer 
          setMessage={setMessage}
        />
      </div>
    </div>
  )
}

export default ClassroomPage