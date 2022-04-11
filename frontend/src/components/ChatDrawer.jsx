import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/ChatDrawer.scss'

// Import react-icons
import { HiChatAlt } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone } from 'react-icons/fa';

const ChatDrawer = props => {
  const {
    setMessage
  } = props;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");

  function handleInput(e) {
    setInput(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(input);
    e.target.reset();
  }

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
                <form id="form" onSubmit={handleSubmit}>
                    <input id="input" placeholder="Start typing..." onChange={handleInput}></input>
                </form>
                
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
