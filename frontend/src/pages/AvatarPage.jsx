// Importing Components from node_modules
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Import Local Components
import {
  SkinOptions,
  HairOptions,
  HairColourOptions,
  ClothingOptions,
  ChatColourOptions,
} from '../components/avatar/AvatarOptions';
import DesktopAvatar from '../components/avatar/DesktopAvatar';
import MobileAvatar from '../components/avatar/MobileAvatar';

function AvatarPage({
  isEditMode,
  setIsEditMode,
}) {
  const [tempColour, setTempColour] = useState("");
  // Used to update "section" of customization user is in
  const [activeSection, setActiveSection] = useState('skin');
  // Used to determine which modal is active
  const [viewColourModal, setViewColourModal] = useState(false);
  const [viewConfirmModal, setViewConfirmModal] = useState(false);

  // Saved state of the user to compare when changes have been made/restore to. This can be retrieved through other methods. (ie. maybe saved in session state on login or one time request to server on page access?)
  const [savedAvatar, setSavedAvatar] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState({});

  // Defining state to determine window size and determine if resize pop-up is visible
  const [width, setWidth] = useState(window.innerWidth);

  /*
    The following is used to ensure that the resize pop-up is only visible within a certain range of window width (i.e. avoids it remaining it open, when window fits desktop)
  */
  const handleResize = () => { setWidth(window.innerWidth); };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, [width]);


  // Create a promise and get the current user info on load
  const loadUser = useCallback(() => {
    return axios.post("/users/getUser");
  }, []);

  // Perform an initial loading of the user's existing avatar preferences
  useEffect(() => {
    loadUser()
      .then((data) => {
        let temp = {
          chatColour: data.data.user.chatColour ?? ChatColourOptions[0],
          username: data.data.user.username ?? "Display Name",
          skin: data.data.user.avatar.skin ?? SkinOptions[0][0],
          topType: data.data.user.avatar.topType ?? HairOptions[0][0], // topType is actually hair style not shirts
          hairColour: data.data.user.avatar.hairColour ?? HairColourOptions[0][0],
          clothingType: data.data.user.avatar.clothingType ?? ClothingOptions[0][0],
          clothingColour: data.data.user.avatar.clothingColour ?? ClothingOptions[0][0],
        };
        setSavedAvatar(temp);
      });
  }, []);

  useEffect(() => {
    setTempColour(savedAvatar.chatColour);
    setCurrentAvatar(savedAvatar);
  }, [savedAvatar]);

  // Following used when the user "saves"
  const updateUserAvatar = useCallback((data) => {
    return axios.post("/users/updateUser", data);
  }, []);

  const saveChanges = () => {
    setIsEditMode(false);

    const data = {
      user: {
        username: currentAvatar.username,
        chatColour: currentAvatar.chatColour,
        avatar: {
          skin: currentAvatar.skin,
          topType: currentAvatar.topType,
          hairColour: currentAvatar.hairColour,
          clothingType: currentAvatar.clothingType,
          clothingColour: currentAvatar.clothingColour,
        },
      },
    };

    updateUserAvatar(data)
      .then(() => {
        setSavedAvatar(currentAvatar);
      })
      .catch((err) => { });
  };

  // Used to revert state when a user presses cancel on modals
  const onColorModalCancel = () => {
    setViewColourModal(false);

    // Reset the current chat colour to the last saved one
    setCurrentAvatar({
      ...currentAvatar,
      chatColour: savedAvatar.chatColour,
    });
  };

  return (
    <>
      {(width <= 1400) && (<MobileAvatar
        tempColour={tempColour}
        setTempColour={setTempColour}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        viewColourModal={viewColourModal}
        setViewColourModal={setViewColourModal}
        viewConfirmModal={viewConfirmModal}
        setViewConfirmModal={setViewConfirmModal}
        savedAvatar={savedAvatar}
        currentAvatar={currentAvatar}
        setCurrentAvatar={setCurrentAvatar}
        saveChanges={saveChanges}
        onColorModalCancel={onColorModalCancel}
      />)}

      {(width > 1400) && (
        <DesktopAvatar
          tempColour={tempColour}
          setTempColour={setTempColour}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          viewColourModal={viewColourModal}
          setViewColourModal={setViewColourModal}
          viewConfirmModal={viewConfirmModal}
          setViewConfirmModal={setViewConfirmModal}
          savedAvatar={savedAvatar}
          currentAvatar={currentAvatar}
          setCurrentAvatar={setCurrentAvatar}
          saveChanges={saveChanges}
          onColorModalCancel={onColorModalCancel}
        />
      )}
    </>
  );
}

export default AvatarPage;
