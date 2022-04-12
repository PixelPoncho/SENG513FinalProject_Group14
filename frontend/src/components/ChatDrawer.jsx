import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/ChatDrawer.scss'

// Import react-icons
import { HiChatAlt } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { FaMicrophone } from 'react-icons/fa';

// TODO: fix bug that adds empty message to beginning of array

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
    console.log("we are submitting")
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

                <form id="form" onSubmit={handleSubmit}>
                    <input
                        id="input"
                        placeholder="Start typing..."
                        autoComplete="off"
                        onChange={handleInput}
                    />
                    <button>
                      <IoMdSend className='send-icon' />
                    </button>
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
