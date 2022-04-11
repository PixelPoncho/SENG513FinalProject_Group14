import React, { useState } from 'react';

// Import styling
import '../styles/ChatDrawer.scss';

// Import react-icons
import { HiChatAlt } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone } from 'react-icons/fa';

const ChatDrawer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

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
          onClick={() => setIsChatOpen(!isChatOpen)}
        />
      )}
    </div>
  );
};

export default ChatDrawer;
