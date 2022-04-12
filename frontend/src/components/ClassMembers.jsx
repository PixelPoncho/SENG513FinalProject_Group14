import React, {useEffect, useState} from 'react'

import '../styles/ClassMembers.scss';

const ClassMembers = props => {
    const {
        handleModalClick,
    } = props;

    return (
        <div className="exit-modal">
            <h1 className="header">Leaving Chill Zone</h1>
            <div className="message-container">
                <p className="descriptive-text">
                    hello
                </p>
            </div>

            <div className="btn-container">
                <button className="--btn red solid" >Disconnect</button>
                <button className="--btn outline blue" >Cancel</button>
            </div>
        </div>
    );
}

export default ClassMembers;