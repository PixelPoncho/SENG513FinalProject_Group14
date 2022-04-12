// Importing Components from node_modules
import React, { useState, useCallback } from 'react';
import axios from "axios";

// Import Local Components
import FormError from "../FormError";

// Importing icons
import { MdClose } from 'react-icons/md';
import { AiOutlineCopy } from 'react-icons/ai';

const ViewMoreModal = ({
  classInfo,
  viewMoreModal,
  setViewMoreModal,
  refresh,
  setRefresh,
  selectedRoom,
  setSelectedRoom,
}) => {
  const [error, setError] = useState('');

  function copyToClipboard() { navigator.clipboard.writeText(classInfo._id); }

  const handleClose = () => {
    setViewMoreModal(false);
    setError('');
  };

  const deleteClassroomFromDB = useCallback((classInfo) => {
    let dataPromise = axios.post(`/rooms/deleteRoom/${classInfo._id}`)
      .then(() => {
        setViewMoreModal(false);
      })
      .catch((err) => {
        setError("Unable to delete the classroom at this time.");
      });

    return dataPromise;
  }, []);

  const deleteClassroom = () => {
    deleteClassroomFromDB(classInfo, inviteCode)
      .then(() => {
        setRefresh(!refresh);
        if (selectedRoom === classInfo._id) {
          setSelectedRoom('');
        }
      });
  };

  return (
    <div
      className={"more-info more-info-background popup-background " + (viewMoreModal ? "show" : "")}
      onClick={e => {
        // If the popup background is clicked directly then execute the cancel
        if (e.target.classList.contains("more-info-background")) {
          handleClose();
        }
      }}
    >
      <div className="popup more-info --container">
        <MdClose
          className="btn-close"
          onClick={() => { handleClose(); }}
          onMouseOver={({ target }) => {
            target.style.cursor = "pointer";
          }}
          onMouseOut={({ target }) => {
            target.style.cursor = "default";
          }}
        />

        <h1 className="header">{classInfo.name}</h1>
        <h5
          className='delete'
          onClick={() => { deleteClassroom(); }}
        >
          Delete Class
          {(error !== '') && (<FormError errorMsg={error} />)}
        </h5>

        <div className='invite-container'>
          <p className='sub-header'>Invite Code:</p>
          <p onClick={() => { copyToClipboard(); }}>
            {classInfo._id} <AiOutlineCopy />
          </p>
        </div>

        <button
          className="--btn yellow solid"
          onClick={() => { handleClose(); }}
        >
          Ok
        </button>
      </div>
    </div >
  );
};

export default ViewMoreModal;
