// TODO: Highlight actively selected classroom and allow users to click a card to update the actively selected classroom. Track the invite code of said classroom in case the user wants to enter it.
// TODO: Extract the invite code to visit classroom
// TODO: Add menu for each class card and finalize styling of it

// Importing Components from node_modules
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Local Components
import NewRoomModal from '../components/management/NewRoomModal';
import ViewMoreModal from '../components/management/ViewMoreModal';
import FormError from "../components/FormError";

// Importing styling
import '../styles/ClassroomListPage.scss';
import { NavLink } from "react-router-dom";

function ClassroomListPage() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  // Modal toggles4
  const [viewNewModal, setViewNewModal] = useState(false);
  const [viewMoreModal, setViewMoreModal] = useState(false);
  const [viewMoreData, setViewMoreData] = useState('');

  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    chatColour: "",
    avatar: {
      type: {},
      skin: "",
      topType: "",
      hairColour: "",
      clothingType: "",
      clothingColour: "",
    },
    ownedClassRooms: [{}],
    visitedClassRooms: [{}],
    bannedClassRooms: [{}],
  });

  const retrieveUser = useCallback(() => {
    let dataPromise = axios.post("/users/getUser")
      .catch((err) => {
        console.log(err);
      });
    return dataPromise;
  }, []);

  function moreModalOpen(data) {
    setViewMoreModal(true);
    setViewMoreData(data);
    console.log(data);
  }

  useEffect(() => {
    retrieveUser()
      .then((data) => {
        if (typeof data.data.user !== 'undefined') {
          let temp = data.data.user;
          setCurrentUser(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  return (
    <>
      <div className="classroom-management --container">
        <h1 className='header'>Join a Classroom!</h1>
        <p className="descriptive-text">
          Start up one of your classes to invite friends to or join a new one by inputting the respective invite code.
        </p>

        <div className="join-class">
          <label htmlFor="inviteCode" className='classroom-management sub-header'>
            Invite Code
            <br />
            <input
              id="inviteCode"
              className="form-control textbox"
              type="text"
              placeholder="XXXX-XXXX"
              onChange={(e) => {
                setError('');
                setInviteCode(e.target.value);
              }}
              onClick={() => setSelectedRoom('')}
            />
            {(error !== '') && (<FormError errorMsg={error} />)}
          </label>

          <button
            className='--btn yellow solid'
            onClick={() => {
              if (inviteCode === "") {
                setError("Please enter a valid invite code");
              } else {
                navigate(`/classroom?id=${document.querySelector("#inviteCode").value}`);
              }
            }}
          >
            Visit Classroom
          </button>
        </div>

        <div className='section-divider'>
          <div className="horizontal-divider short" />
          <h5 className='sub-header'>OR</h5>
          <div className="horizontal-divider short" />
        </div>
        <div className='your-classes'>
          {currentUser.ownedClassRooms.map(classroom =>
            <div
              className={`class-card ${selectedRoom === classroom._id ? "active" : ""}`}
              key={classroom._id}
              onClick={() => {
                setSelectedRoom(classroom._id);
              }}
            >
              <h4 className='header'>{classroom.name}</h4>
              <div
                className="sub-header yours"
                onClick={() => {
                  moreModalOpen(classroom);
                }}
              >
                View More
              </div>

              {classroom.active &&
                <div className="status active">ONLINE</div>
              }
              {!classroom.active &&
                <div className="status inactive">OFFLINE</div>
              }
              {/* Include kebab menu and edit options */}
            </div>,
          )}
          {/* Setup for a card. Need to use .map to create cards for every instance the user has. */}
        </div>
        <div className='btn-container'>
          <button
            className='--btn blue solid'
            onClick={() => setViewNewModal(true)}
          >
            Add New Class
          </button>
          <NavLink to={"/classroom?id=" + selectedRoom}>
            <button className='--btn yellow solid'>
              Start Your Class
            </button>
          </NavLink>
        </div>
      </div >

      <NewRoomModal
        viewNewModal={viewNewModal}
        setViewNewModal={setViewNewModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />

      <ViewMoreModal
        classInfo={viewMoreData}
        viewMoreModal={viewMoreModal}
        setViewMoreModal={setViewMoreModal}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </>
  );
}

export default ClassroomListPage;
