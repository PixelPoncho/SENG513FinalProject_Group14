import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/ChatDrawer.scss'

// Import react-icons
import { HiChatAlt } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone } from 'react-icons/fa';

const ChatDrawer = props => {
//   const {
//   } = props;

  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <div className='chat-drawer'>
        <div className='bottom-align'></div>
        <FaMicrophone
            className='drawer-icon disabled'
        />
        {isChatOpen ? (
            <div className='chat-container'>
            <HiChatAlt
                    className='drawer-icon'
                    onClick={() => setIsChatOpen(!isChatOpen)}
                />
            <IoMdSend 
                className='send-icon'
            />
            <input id="input" placeholder="Start typing..."></input>
        </div>
        ) : (
            <HiChatAlt
                className='drawer-icon main'
                onClick={handleChatClick}
            />
        )}
    </div>
  );
}

export default ChatDrawer
