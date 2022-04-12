// Importing Components from node_modules
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import axios from "axios";

// Importing icons
import { FiLogOut } from 'react-icons/fi';

const NavbarMobile = () => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    axios.post("/users/logout");
    sessionStorage.removeItem('auth');
    navigate("/login");
  }, []);

  return (
    <Nav activeKey={window.location.pathname} className="ml-auto">
      <Nav.Link
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
        href="/manage-classroom"
        className='sub-nav'
        onClick={(e) => {
          if (window.location.pathname === "/manage-classroom") {
            e.preventDefault();
          }
        }}
      >
        Manage Classrooms
      </Nav.Link>
      <Nav.Link
        className="--btn logout"
        onClick={() => logout()}
      >
        Logout
        <FiLogOut
          style={{ margin: "-6px 0 0 5px" }}
        />
      </Nav.Link>
    </Nav>
  );
};

export default NavbarMobile;
