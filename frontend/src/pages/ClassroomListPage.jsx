// TODO: Highlight actively selected classroom and allow users to click a card to update the actively selected classroom. Track the invite code of said classroom in case the user wants to enter it.
// TODO: Extract the invite code to visit classroom
// TODO: Add menu for each class card and finalize styling of it

// Importing Components from node_modules
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import Local Components
import FormError from "../components/FormError";

// Importing icons
import { MdStarRate } from 'react-icons/md';

// Importing styling
import '../styles/ClassroomListPage.scss';
import { NavLink } from "react-router-dom";

function ClassroomListPage() {
  const navigate = useNavigate();
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

  useEffect(() => {
    retrieveUser()
      .then((data) => {
        console.log("here", data.data.user);
        if (typeof data.data.user !== 'undefined') {
          let temp = data.data.user;

          if (data.data.user.ownedClassRooms.length === 0) {
            temp.ownedClassRooms.push({ name: "Joe's Room", active: false, owner: 'joe@test.com' });
            temp.ownedClassRooms.push({ name: "My Room", active: false, owner: 'joe@test.com' });
          }

          setCurrentUser(temp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // useEffect(function () {
  //   (async () => {
  //     const response = await
  //     const user = response.data.user;

  //     if (typeof user !== 'undefined') {
  //       // Map the api response to our currentUser format
  //       const updatedCurUser = user;
  //       updatedCurUser.id = updatedCurUser._id;
  //       delete updatedCurUser._id;
  //       delete updatedCurUser.__v;

  //       setCurrentUser(updatedCurUser);
  //     }
  //   });
  // }, []);

  return (
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
          />
        </label>
        <button
          className='--btn yellow solid'
          onClick={() => {
            console.dir("here?");
            navigate(`/classroom?id=${document.querySelector("#inviteCode").value}`);
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
          <div className='class-card' key={classroom._id} >
            <NavLink to={"/classroom?id=" + classroom._id} >
              <h4 className='header'>{classroom.name}</h4>
              <div className="sub-header yours">
                <MdStarRate />
                Your classroom
              </div>
              {classroom.active &&
                <div className="status active">ONLINE</div>
              }
              {!classroom.active &&
                <div className="status inactive">OFFLINE</div>
              }
              {/* Include kebab menu and edit options */}
            </NavLink>
          </div>,
        )}
        {/* Setup for a card. Need to use .map to create cards for every instance the user has. */}
      </div>
      <button className='--btn yellow solid'>
        Start Your Class
      </button>
    </div >
  );
}

export default ClassroomListPage;
