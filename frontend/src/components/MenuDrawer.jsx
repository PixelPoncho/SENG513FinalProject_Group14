import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/MenuDrawer.scss'

// Import react-icons
import { AiOutlineMenu } from 'react-icons/ai';

const MenuDrawer = props => {
//   const {
//   } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='menu-drawer'>
        <AiOutlineMenu
              style={{
                margin: "15px",
                padding: "10px",
                width: "50px",
                height: "60px",
                color: "var(--white)",
                backgroundColor: "var(--light-blue)",
                borderRadius: "20px",
                boxShadow: "var(--card-shadow)"
              }}
              onMouseOver={({ target }) => {
                target.style.backgroundColor = "var(--gray)";
                target.style.cursor = "pointer";
              }}
              onMouseOut={({ target }) => {
                target.style.backgroundColor = "var(--light-blue)";
                target.style.cursor = "default";
              }}
        />
    </div>
  );
}

export default MenuDrawer
