import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/GridStyling.scss'

// Import react-icons
import { HiChatAlt } from 'react-icons/hi';

const ChatDrawer = props => {
  const {
    isOpen
  } = props;

  return (
    <HiChatAlt
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
  );
}

export default ChatDrawer
