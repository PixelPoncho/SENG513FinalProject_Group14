// Importing Components from node_modules
import React, {useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, NavDropdown } from 'react-bootstrap';
import axios from "axios";

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
      <NavDropdown title="Classrooms" id="basic-nav-dropdown">
        <Nav.Link
          href="/manage-classroom"
          onClick={(e) => {
            if (window.location.pathname === "/manage-classroom") {
              e.preventDefault();
            }
          }}
        >
          Existing Classrooms
        </Nav.Link>
        <Nav.Link
          href="/create-classroom"
          onClick={(e) => {
            if (window.location.pathname === "/create-classroom") {
              e.preventDefault();
            }
          }}
        >
          Create Classroom
        </Nav.Link>
      </NavDropdown>
      <Nav.Link
        className="--btn logout"
        onClick={() => logout()}
      >
        Logout
      </Nav.Link>
    </Nav>
  );
};

export default NavbarMobile;
