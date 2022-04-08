import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/ChatDrawerStyling.scss'

// Import react-icons
import { HiChatAlt } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';

const ChatDrawer = props => {
  const {
    isOpen,
    setIsOpen
  } = props;

  return (
    <div class='chat-container'>
        <HiChatAlt
                style={{
                    padding: "10px",
                    width: "50px",
                    height: "45px",
                    color: "var(--white)",
                    backgroundColor: "var(--light-blue)",
                    borderRadius: "20px",
                }}
                onClick={() => setIsOpen(!isOpen)}
            />
        <IoMdSend 
            style={{
                margin: '10px',
                padding: "10px",
                width: "35px",
                height: "35px",
                color: "var(--white)",
                backgroundColor: "var(--yellow)",
                borderRadius: "50%",
            }}
            />
        <input id="input" placeholder="Start typing..."></input>
    </div>
  );
}

export default ChatDrawer
