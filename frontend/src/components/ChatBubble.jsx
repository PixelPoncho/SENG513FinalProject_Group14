import React, {useEffect, useState} from 'react'

import '../styles/ChatBubble.scss';

const ChatBubble = props => {
    const {
        username,
        message
    } = props;

    return (
        <div className="chat-bubble">
            <div className="content">
                <p className="user-title">User:</p>
                <p>this is the messaage! hello! blabla</p>
            </div>
        </div>
    );
}

export default ChatBubble;