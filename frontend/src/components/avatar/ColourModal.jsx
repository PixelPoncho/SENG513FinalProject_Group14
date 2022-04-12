// Importing Components from node_modules
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

// Import Local Components
import {
  ChatColourOptions,
} from '../avatar/AvatarOptions';

// Importing icons
import { MdCheck } from 'react-icons/md';

const ColourModal = ({
  currentAvatar,
  setCurrentAvatar,
  savedAvatar,
  viewColourModal,
  setViewColourModal,
}) => {
  const onColorModalCancel = () => {
    setViewColourModal(false);

    // Reset the current chat colour to the last saved one
    setCurrentAvatar({
      ...currentAvatar,
      chatColour: savedAvatar.chatColour,
    });
  };



  return (
    <>
      {/* <ColourModal
        currentAvatar={currentAvatar}
        setCurrentAvatar={setCurrentAvatar()}
        savedAvatar={savedAvatar}
        viewColourModal={viewColourModal}
        setViewColourModal={setViewColourModal()}
      /> */}

      <Modal
        show={viewColourModal}
        onHide={setViewColourModal(false)}
        keyboard={false}
        size="md"
        className="colour-selection--modal"
        aria-labelledby="colour-selection--modal"
      >
        <Modal.Header closeButton>
          <Modal.Title><h1 className="header">Select Colour</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="descriptive-text">
            This will be the colour used to denote your messages in the classroom
          </p>
          <div
            className='users-color color-square'
            style={{ backgroundColor: `${tempColour}` }}
          />
          <div className="custom-colors-container">
            {ChatColourOptions.map(color =>
              <div
                key={color}
                className={`color-square color-option ${tempColour === color ? 'active' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setTempColour(color)}
              >
                {tempColour === color && <MdCheck color="white" fontSize="30px" />}
              </div>,
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="--btn yellow solid"
            onClick={() => {
              setCurrentAvatar({
                ...currentAvatar,
                chatColour: tempColour,
              });
              setViewColourModal(false);
            }}
          >
            Select Colour
          </button>
          <button
            className="--btn blue outline"
            onClick={() => {
              onColorModalCancel();
              setTempColour(currentAvatar.chatColour);
            }}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ColourModal;
