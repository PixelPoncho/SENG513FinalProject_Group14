import React, {useEffect, useState} from 'react'

import '../styles/ChatBubble.scss';

const ChatBubble = props => {
    const {
        username,
        message,
        colour,
    } = props;

    const [isFadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFadeOut(true);
        },5000);
    }, []);

    return (
        <div className={"chat-bubble " + (isFadeOut ? "fade-out" : "")}>
            <div className="content">
                <p className="user-title" style={{ color: `${colour}` }}>{username}:</p>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ChatBubble;