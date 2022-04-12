// Importing Components from node_modules
import React from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';

// Import Local Components
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

// Importing styles
import '../../styles/Navbar.scss';

const Navbar = () => {
  return (
    <>
      <BootstrapNavbar
        expand="lg"
        variant="dark"
      >

        {/* Logo on nav */}
        {/* <BootstrapNavbar.Brand>
      </BootstrapNavbar.Brand> */}

        {/* Toggle for {sm | md | lg } devices */}
        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/*
          <NavbarDesktop />
          */}
          <NavbarMobile />
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
