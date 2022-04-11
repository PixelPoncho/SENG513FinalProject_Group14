import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/ExitModal.scss';

const ExitModal = props => {
  const {
    handleModalClick,
    message,
  } = props;

  const navigate = useNavigate();

  // I did this in a really stupid way because we are only going to have
  // two exit modals in the app. Let me know if you have a better way of handling it.
  const handleDisconnect = () => {
    if (message.includes("avatar")) {
      navigate("/avatars");
    } else if (message.includes("Manage")) {
      navigate("/manage-classroom");
    }
  };

  return (
    <div className="exit-modal">
      <h1 className="header">Leaving Chill Zone</h1>
      <div className="message-container">
        <p className="descriptive-text">
          {message}
        </p>
      </div>

      <div className="btn-container">
        <button className="--btn red solid" onClick={handleDisconnect}>Disconnect</button>
        <button className="--btn outline blue" onClick={handleModalClick}>Cancel</button>
      </div>
    </div>
  );
};

export default ExitModal;
