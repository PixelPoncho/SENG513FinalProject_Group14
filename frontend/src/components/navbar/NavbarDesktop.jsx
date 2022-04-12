// Importing Components from node_modules
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import axios from "axios";

const NavbarDesktop = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    axios.post("/users/logout");
    sessionStorage.removeItem('auth');
    navigate("/login");
  }, []);

  return (
    <Nav activeKey={window.location.pathname} className="ml-auto desktop-nav">
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
  );
};

export default NavbarDesktop;
