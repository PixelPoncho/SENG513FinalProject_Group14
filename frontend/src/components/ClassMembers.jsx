import React, {useEffect, useState} from 'react'

import { FaRegCopy } from 'react-icons/fa'

import '../styles/ClassMembers.scss';

const ClassMembers = props => {
    const {
        handleModalClick,
        users
    } = props;
    
    const [copied, setCopied] = useState(false);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const inviteCode = urlParams.get('id')

    const setTimer = (delay) => {
        setTimeout(() => {
            setCopied(false);
        }, delay);
    }
    function copyToClipboard() {
        navigator.clipboard.writeText(inviteCode);
         setCopied(true);
        setTimer(1000);
    }

    return (
        <div className="class-members">
            <h1 className="header">Class Members</h1>
            <div className="message-container">
                <p className="descriptive-text">
                    Invite more people to your classroom by using the following invite code:
                </p>

                <div className="invite-code-container">
                    <p className="ic-header">Invite Code:</p>
                    <p className="ic-id">{inviteCode}</p>
                    <FaRegCopy 
                        className='ic-copy'
                        onClick={copyToClipboard}
                    />
                </div>

                {copied && <p className="header copy-alert">Copied!</p>}

                <hr className="solid"></hr>

                <div className="student-list">
                    <div>
                        {users.map((user) => {
                            return(
                                <p className="sub-header" style={{ color: `${user.chatColour}` }}>{user.username}</p>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="btn-container">
                <button className="--btn yellow solid" onClick={handleModalClick}>Ok</button>
            </div>
        </div>
    );
}

export default ClassMembers;