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
  const {
    handleChatHistoryClick,
    handleAvatarModalClick,
    handleExitModalClick
  } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='menu-drawer'>
        {isMenuOpen ? (
            <div className='menu-container'>
                <BiArrowBack
                    className='menu-icon'
                    onClick={handleMenuClick}
                />
                <FaTshirt
                    className='menu-icon'
                    onClick={handleAvatarModalClick}
                />

                <RiTeamFill
                    className='menu-icon'
                />

                <MdHistory
                    className='menu-icon'
                    onClick={handleChatHistoryClick}
                />

                <FaChalkboardTeacher
                    className='menu-icon disabled'
                />

                <div className='exit-button'>
                    <BiExit
                        className='menu-icon exit'
                        onClick={handleExitModalClick}
                    />
                </div>
            </div>
        ) : (
            <AiOutlineMenu
                className='menu-icon main'
                onClick={handleMenuClick}
            />
        )}
    </div>
  );
}

export default MenuDrawer
