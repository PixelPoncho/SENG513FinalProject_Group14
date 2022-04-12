// Importing Components from node_modules
import React from 'react';
import { Modal } from 'react-bootstrap';

function ExitModal({
  viewConfirmModal,
  setViewConfirmModal,
  savedAvatar,
  setCurrentAvatar,
}) {

  const handleDiscard = () => {
    setViewConfirmModal(false);
    setCurrentAvatar(savedAvatar);
  };

  return (
    <>
      {/* <ExitModal
        viewConfirmModal={viewConfirmModal}
        setViewConfirmModal={setViewConfirmModal()}
        savedAvatar={savedAvatar}
        setCurrentAvatar={setCurrentAvatar()}
      /> */}
      <Modal
        show={viewConfirmModal}
        onHide={() =>  {setViewConfirmModal(false);}}
        keyboard={false}
        size="md"
        className="confirm-cancellation--modal"
        aria-labelledby="confirm-cancellation--modal"
      >
        <Modal.Header closeButton>
          <Modal.Title><h1 className="header">Discard Unsaved Changes?</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="descriptive-text">Any unsaved changes will be lost. Are you sure you want to discard them?</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="--btn red solid"
            onClick={() => handleDiscard}
          >
            Discard
          </button>
          <button
            className="--btn blue outline"
            onClick={() => setViewConfirmModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExitModal;
