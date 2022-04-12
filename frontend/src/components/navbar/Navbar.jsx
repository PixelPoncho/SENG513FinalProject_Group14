// Importing Components from node_modules
import React, {useState, useEffect} from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';

// Import Local Components
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';

// Importing styles
import '../../styles/Navbar.scss';

const Navbar = () => {
    // Defining state to determine window size and determine if resize pop-up is visible
    const [width, setWidth] = useState(window.innerWidth);

    /*
      The following is used to ensure that the resize pop-up is only visible within a certain range of window width (i.e. avoids it remaining it open, when window fits desktop)
    */
    const handleResize = () => { setWidth(window.innerWidth); };

    useEffect(() => {
      window.addEventListener('resize', handleResize, false);
    }, [width]);

  return (
    <>
      <BootstrapNavbar
        expand="lg"
        variant="dark"
        className={`${width > 992 ? 'desktop-nav' : 'mobile-nav'}`}
      >

        {/* Logo on nav */}
        {/* <BootstrapNavbar.Brand>
      </BootstrapNavbar.Brand> */}

        {/* Toggle for {sm | md | lg } devices */}
        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {(width <= 992) && (<NavbarMobile />)}
          {(width > 992) && (<NavbarDesktop />)}
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
