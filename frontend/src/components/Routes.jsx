// Importing Components from node_modules
import React, { useEffect, useState } from "react";
import { Routes as Switches, Route, Navigate } from 'react-router-dom';
import axios from "axios";

// Importing the page components for routing
import AvatarPage from '../pages/AvatarPage';
import ClassroomListPage from '../pages/ClassroomListPage';
import ClassroomPage from '../pages/ClassroomPage';
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

// Importing other project-defined components
import { AuthRoute, UnauthRoute } from './ProtectedRoutes';
import Navbar from "./navbar/Navbar";

function Routes() {
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
    ownedClassRooms: [],
    visitedClassRooms: [],
    bannedClassRooms: [],
  });

  useEffect(function() {
    (async() => {
      const response = await axios.post("/users/getUser");
      const user = response.data.user;

      if (typeof user !== 'undefined') {
        // Map the api response to our currentUser format
        const updatedCurUser = user;
        updatedCurUser.id = updatedCurUser._id;
        delete updatedCurUser._id;
        delete updatedCurUser.__v;

        setCurrentUser(updatedCurUser);
      }
    })();
  }, []);

  return (
    <Switches>
      {/* Route to Login Page */}
      <Route
        exact
        path="/login"
        element={
          <UnauthRoute title="Sign In">
            <SignInPage />
          </UnauthRoute>
        }
      />

      {/* Route to Sign Up Page */}
      <Route
        exact
        path="/signup"
        element={
          <UnauthRoute title="Sign Up">
            <SignUpPage />
          </UnauthRoute>
        }
      />

      {/* Route to Avatar Customization Page */}
      <Route
        exact
        path="/avatars"
        element={
          <AuthRoute title="Avatar Customization">
            <Navbar />
            <AvatarPage
              savedAvatar={currentUser.avatar}
              savedName={currentUser.username}
              savedColour={currentUser.chatColour}
            />
          </AuthRoute>
        }
      />

      {/* Route to Classroom Management Page */}
      <Route
        exact
        path="/manage-classroom"
        element={
          <AuthRoute title="Classroom Management">
            <Navbar />
            <ClassroomListPage currentUser={currentUser} />
          </AuthRoute>
        }
      />

      {/* Route to Classroom Space */}
      <Route
        exact
        path="/classroom"
        element={
          <AuthRoute title="Welcome to the Classroom">
            <ClassroomPage />
          </AuthRoute>
        }
      />

      {/* Redirect any non-existing routes to */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Switches>
  );
}

export default Routes;
