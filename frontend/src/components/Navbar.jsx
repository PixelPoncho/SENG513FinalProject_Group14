// TODO: Create the navbar for mobile views (ie. dropdown)

// Importing Components from node_modules
import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, Navbar as ReactNavbar } from 'react-bootstrap';
import axios from "axios";

// Importing styles
import '../styles/Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    axios.post("/users/logout");
    sessionStorage.removeItem('auth');
    navigate("/login");
  }, []);

  return (
    <>
      <ReactNavbar
        expand="lg"
        variant="dark"
      >

        {/* Logo on nav */}
        {/* <ReactNavbar.Brand>
      </ReactNavbar.Brand> */}

        {/* Toggle for {sm | md | lg } devices */}
        <ReactNavbar.Toggle
          aria-controls="basic-navbar-nav"
        />

        <ReactNavbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={window.location.pathname} className="ml-auto">

            <Nav.Link
              className="first-link"
              href="/avatars"
              onClick={(e) => {
                // Used to prevent navigation to the page you're already on, cuz it doesnt make sense.
                if (window.location.pathname === "/avatars") {
                  e.preventDefault();
                }
              }}
            >
              Avatars
            </Nav.Link>

            <Nav.Link
              className="last-link"
              href="/manage-classroom"
              onClick={(e) => {
                if (window.location.pathname === "/manage-classroom") {
                  e.preventDefault();
                }
              }}
            >
              Classrooms
            </Nav.Link>

            {/* Logout "button" */}
            <button
              className="--btn outline red"
              onClick={() => logout()}
            >
              Logout
            </button>
          </Nav>
        </ReactNavbar.Collapse>
      </ReactNavbar>
    </>
  );
};

export default Navbar;
