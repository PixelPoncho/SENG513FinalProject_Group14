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
                style={{
                    margin: "15px",
                    padding: "10px",
                    width: "50px",
                    height: "45px",
                    color: "var(--white)",
                    backgroundColor: "var(--gray)",
                    borderRadius: "20px",
                    boxShadow: "var(--card-shadow)"
                }}
            />
        {isChatOpen ? (
            <div className='chat-container'>
            <HiChatAlt
                    style={{
                        padding: "10px",
                        width: "50px",
                        height: "45px",
                        color: "var(--white)",
                        backgroundColor: "var(--light-blue)",
                        borderRadius: "20px",
                    }}
                    onClick={() => setIsChatOpen(!isChatOpen)}
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
        ) : (
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
                    target.style.backgroundColor = "var(--off-yellow)";
                    target.style.cursor = "pointer";
                }}
                onMouseOut={({ target }) => {
                    target.style.backgroundColor = "var(--light-blue)";
                    target.style.cursor = "default";
                }}
                onClick={handleChatClick}
            />
        )}
    </div>
  );
}

export default ChatDrawer
