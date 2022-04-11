import React, {useEffect, useState} from 'react'

import '../styles/ChatHistory.scss';

const ChatHistory = props => {
    const {
        history,
        handleChatHistoryClick
    } = props;

    const [messages, setMessages] = useState([]);

    const addMessage = message => {
        setMessages(oldMessages => {
            return [...oldMessages, message]
        });
    };

    // Scroll the most recent message into view
    useEffect(() => {
        const lastMsgEl = document.querySelector(".message:last-of-type");
        if(lastMsgEl !== null) {
            lastMsgEl.scrollIntoView();
        }
    }, [messages]);

    // TEMP: Example showing how it would function
    useEffect(function() {
        for(let i = 0; i < history.length; i++) {
            setTimeout(function() {
                const message = {
                    id: history[i].userId,
                    content: history[i].content,
                    user: {
                        name: `a name3f 3f  ${i}`,
                        colour: "#F43434"
                    }
                };
                addMessage(message)
            }, 100*i);
        }
    }, []);

    return (
        <div className="history">
            <h1 className="header">Chat History</h1>
            <div className="messages-container-outer">
                <div className="messages-container">
                    {messages.map( message =>
                        <div key={message.id} className="message">
                            <div className="name" style={{color: message.user.colour}}>
                                {message.user.name}:
                            </div>
                            <div>
                                {message.content}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="btn-container">
                <button className="--btn yellow solid" onClick={handleChatHistoryClick}>Ok</button>
            </div>
        </div>
    );
}

export default ChatHistory;