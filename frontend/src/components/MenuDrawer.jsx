import React, {useState, useEffect, useCallback } from 'react'

// Import styling
import '../styles/MenuDrawer.scss'

// Import react-icons
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTshirt, FaChalkboardTeacher } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri'
import { MdHistory } from 'react-icons/md'
import { BiExit, BiArrowBack } from 'react-icons/bi'

const MenuDrawer = props => {
//   const {
//   } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='menu-drawer'>
        {isMenuOpen ? (
            <div className='menu-container'>
                <BiArrowBack
                    style={{
                        padding: "10px",
                        width: "50px",
                        height: "60px",
                        color: "var(--white)",
                        backgroundColor: "var(--light-blue)",
                        borderRadius: "20px",
                    }}
                    onMouseOver={({ target }) => {
                        target.style.backgroundColor = "var(--gray)";
                        target.style.cursor = "pointer";
                    }}
                    onMouseOut={({ target }) => {
                        target.style.backgroundColor = "var(--light-blue)";
                        target.style.cursor = "default";
                    }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                />

                <FaTshirt
                    style={{
                        padding: "10px",
                        width: "50px",
                        height: "60px",
                        color: "var(--white)",
                        backgroundColor: "var(--light-blue)",
                        borderRadius: "20px",
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

                <RiTeamFill
                    style={{
                        padding: "10px",
                        width: "50px",
                        height: "60px",
                        color: "var(--white)",
                        backgroundColor: "var(--light-blue)",
                        borderRadius: "20px",
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

                <MdHistory
                    style={{
                        padding: "10px",
                        width: "50px",
                        height: "60px",
                        color: "var(--white)",
                        backgroundColor: "var(--light-blue)",
                        borderRadius: "20px",
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

                <FaChalkboardTeacher
                    style={{
                        padding: "10px",
                        width: "50px",
                        height: "60px",
                        color: "var(--white)",
                        backgroundColor: "var(--light-blue)",
                        borderRadius: "20px",
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

                <div className='exit-button'>
                    <BiExit
                        style={{
                            padding: "10px",
                            width: "50px",
                            height: "60px",
                            color: "var(--red)",
                            backgroundColor: "var(--light-blue)",
                            borderRadius: "20px",
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
            </div>
        ) : (
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
        )}
    </div>
  );
}

export default MenuDrawer
