// Importing Components from node_modules
import React, { useState, useCallback } from 'react';
import axios from "axios";

// Import Local Components
import FormError from "../FormError";

// Importing icons
import { MdClose } from 'react-icons/md';

const NewRoomModal = ({
  viewNewModal,
  setViewNewModal,
  refresh,
  setRefresh,
}) => {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const addClassroomToDB = useCallback((newName) => {
    let dataPromise = axios.post("/rooms/createRoom", { classRoom: { name: newName } })
      .then(() => {
        setViewNewModal(false);
      })
      .catch((err) => {
        setError("Classroom already exists, please provide a different name");
        console.log(err);
      });

    return dataPromise;
  }, []);

  const createClassroom = () => {
    if (newName === '') {
      setError('Please provide a name for the classroom.');
    } else {
      addClassroomToDB(newName)
      .then(() => {
        setRefresh(!refresh);
      });
    }
  };

  const handleClose = () => {
    setViewNewModal(false);
    setError('');
  };

  return (
    <div
      className={"new-class popup-background " + (viewNewModal ? "show" : "")}
      onClick={e => {
        // If the popup background is clicked directly then execute the cancel
        if (e.target.classList.contains("colour-popup-background")) {
          handleClose();
        }
      }}
    >
      <div className="popup new-class --container">
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
        <h1 className="header">Create New Classroom</h1>
        <p className="descriptive-text">
          Create a classroom where you and others can interact in! An invite code for the space will be generated upon creation, and can be used by others to join your classroom.
        </p>
        <label>
          <input
            className="textbox"
            placeholder={"Classroom Name"}
            maxLength="32"
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        {(error !== '') && (<FormError errorMsg={error} />)}

        <div className="btn-container">
          <button
            className="--btn yellow solid"
            onClick={() => {
              createClassroom(newName);
            }}
          >
            Create Classroom
          </button>
          <button
            className="--btn blue outline"
            onClick={() => { handleClose(); }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRoomModal;
