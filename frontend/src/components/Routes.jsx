// TODO: Convert paths to custom Unauth and Auth Routes

// Importing Components from node_modules
import React, {useEffect, useState} from "react";
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
import Navbar from "./Navbar";

/*
 * Function used to update each page's <title> tag. This tag is
 * typically found in the public folder (index.html), and would
 * otherwise be static
 */
const Page = (props) => {
  useEffect(() => {
    document.title = props.title || '';
  }, [props.title]);
  return props.children;
};

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

        (async () => {
            const response = await axios.post("/users/getUser");
            const user = response.data.user;

            if(user !== undefined) {
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
          <>
            <Page title="Sign In">
              <SignInPage />
            </Page>
          </>
        }
      />

      {/* Route to Sign Up Page */}
      <Route
        exact
        path="/signup"
        element={
          <>
            <Page title="Sign Up">
              <SignUpPage />
            </Page>
          </>
        }
      />

      {/* Route to Avatar Customization Page */}
      <Route
        exact
        path="/avatars"
        element={
          <>
            <Navbar />
            <Page title="Avatar Customization">
              <AvatarPage />
            </Page>
          </>
        }
      />

      {/* Route to Classroom Management Page */}
      <Route
        exact
        path="/manage-classroom"
        element={
          <>
            <Navbar />
            <Page title="Classroom Management">
              <ClassroomListPage currentUser={currentUser} />
            </Page>
          </>
        }
      />

      {/* Route to Classroom Space */}
      <Route
        exact
        path="/classroom"
        element={
          <>
            <Page title="Welcome to the Classroom">
              <ClassroomPage />
            </Page>
          </>
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
