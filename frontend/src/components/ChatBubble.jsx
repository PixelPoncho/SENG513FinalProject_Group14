import React, {useEffect, useState} from 'react'

import '../styles/ChatBubble.scss';

// TODO: chat bubble length (CSS) is not on a per-message basis

const ChatBubble = props => {
    const {
        username,
        message,
        colour,
    } = props;

    return (
        <div className="chat-bubble">
            <div className="content">
                <p className="user-title" style={{ color: `${colour}` }}>{username}:</p>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ChatBubble;