// TODO: Disable user from being able to move pages in edit mode

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

function AvatarPage() {
  const [tempColour, setTempColour] = useState("");
  // Used to display edit mode content (ie. buttons) By default should be false, but for development purposes could be set to true
  const [isEditMode, setIsEditMode] = useState(false);
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

    // <>
    //   <div className="avatars --container">

    //     {/* Containing the avatar */}
    //     <div className="left-container">

    //       {!isEditMode &&
    //         <div className="top chat-options non-edit">
    //           <h1 className="sub-header">{currentAvatar.username}</h1>
    //           <div
    //             className='users-color'
    //             style={{ backgroundColor: `${currentAvatar.chatColour}` }}
    //           />
    //           {/* Edit icon */}
    //           <MdEdit
    //             className="edit-icon"
    //             onClick={() => setIsEditMode(true)}
    //           />
    //         </div>
    //       }

    //       {isEditMode &&
    //         <div className="top chat-options edit">
    //           <label>
    //             <input
    //               className="textbox"
    //               placeholder={savedAvatar.username}
    //               onChange={(e) => {
    //                 if (e.target.value === '') {
    //                   setCurrentAvatar({
    //                     ...currentAvatar,
    //                     username: savedAvatar.username,
    //                   });
    //                 } else {
    //                   setCurrentAvatar({
    //                     ...currentAvatar,
    //                     username: e.target.value,
    //                   });
    //                 }
    //               }}
    //             />
    //           </label>

    //           <div
    //             className='users-color'
    //             style={{ backgroundColor: `${currentAvatar.chatColour}` }}
    //             onClick={() => setViewColourModal(true)}
    //           />
    //         </div>
    //       }

    //       <div className="avatar-container">
    //         <Avatar
    //           style={{ width: '100%', height: '100%' }}
    //           topType={currentAvatar.topType}
    //           hairColor={currentAvatar.hairColour}
    //           clotheType={currentAvatar.clothingType}
    //           clotheColor='PastelBlue'
    //           eyeType='Default'
    //           eyebrowType='Default'
    //           mouthType='Smile'
    //           skinColor={currentAvatar.skin}
    //         />
    //       </div>

    //       {isEditMode &&
    //         <div className="btn-container">
    //           <button
    //             form="avatar-form"
    //             className="--btn yellow solid"
    //             onClick={() => saveChanges()}
    //           >
    //             Save Changes
    //           </button>
    //           <button
    //             className="--btn blue outline"
    //             onClick={() => { setViewConfirmModal(true); }}
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       }

    //     </div>
    //     <div className='vertical-divider' />

    //     {/* Container for all avatar customization options*/}
    //     <div className="right-container">
    //       <h1 className='avatar header'>Your Avatar</h1>

    //       {/* Jump to specific customization choices */}
    //       <div className="horizontal-divider top" />

    //       <div className="customization-section">
    //         <SkinIcon
    //           className={`customization-section-icon ` + (activeSection === 'skin' ? 'active' : '')}
    //           onClick={() => {
    //             if (activeSection === 'skin') {
    //               return;
    //             } else {
    //               setActiveSection('skin');
    //             }
    //           }}
    //         />
    //         <HairIcon
    //           className={`customization-section-icon ` + (activeSection === 'hair' ? 'active' : '')}
    //           onClick={() => {
    //             if (activeSection === 'hair') {
    //               return;
    //             } else {
    //               setActiveSection('hair');
    //             }
    //           }}
    //         />
    //         <ClothesIcon
    //           className={`customization-section-icon ` + (activeSection === 'clothes' ? 'active' : '')}
    //           onClick={() => {
    //             if (activeSection === 'clothes') {
    //               return;
    //             } else {
    //               setActiveSection('clothes');
    //             }
    //           }}
    //         />
    //       </div>

    //       <div className="horizontal-divider bottom" />

    //       {/* TODO: Update this section!! add the arrows just in case one section has more than one page associated with it */}
    //       <div className={"customization-options-container " + (activeSection === 'skin' ? 'active-selection' : '')}>
    //         {SkinOptions.map((skinOpt, index) =>
    //           <div
    //             key={skinOpt[1]}
    //             className={"customization-option " + (currentAvatar.skin === skinOpt[0] ? "active-selection" : "")}
    //             style={{ backgroundColor: `${SkinOptions[index][1]}` }}
    //             onClick={() => {
    //               // If something is selected then turn on edit mode and update currentAvatar with the most recent selection
    //               // If the current selection is the saved on, then don't turn on edit mode
    //               if (currentAvatar.skin !== skinOpt[0]) {
    //                 setIsEditMode(true);
    //               }

    //               setCurrentAvatar({
    //                 ...currentAvatar,
    //                 skin: skinOpt[0],
    //               });

    //             }}
    //           />,
    //         )}
    //       </div>

    //       <div className={"customization-options-container " + (activeSection === 'hair' ? 'active-selection' : '')}>
    //         {/* Hack to force new line in flex layout */}
    //         <div className="sub-header hair" style={{ flexBasis: "100%" }}>Hair Style</div>
    //         {HairOptions.map(hair =>
    //           <div
    //             key={hair}
    //             className={"customization-option " + (currentAvatar.topType === hair ? "active-selection" : "")}
    //             style={{ backgroundColor: "white" }} // Hack?
    //             onClick={() => {
    //               if (currentAvatar.topType !== hair) {
    //                 setIsEditMode(true);
    //               }

    //               setCurrentAvatar({
    //                 ...currentAvatar,
    //                 topType: hair,
    //               });
    //             }}
    //           >
    //             <Piece
    //               pieceSize='error' // Forced to pick a pixel size and I don't want to.
    //               pieceType='top'
    //               topType={hair}
    //               hairColor={currentAvatar.hairColour}
    //             />
    //           </div>,
    //         )}

    //         {/* Hack to force new line in flex layout */}
    //         <div className="sub-header hair" style={{ flexBasis: "100%" }}>Hair Colour</div>

    //         {HairColourOptions.map(hairColour =>
    //           <div
    //             key={hairColour[0]}
    //             className={"customization-option  " + (currentAvatar.hairColour === hairColour[0] ? "active-selection" : "")}
    //             style={{ backgroundColor: `${hairColour[1]}` }}
    //             onClick={() => {
    //               if (currentAvatar.hairColour !== hairColour) {
    //                 setIsEditMode(true);
    //               }

    //               setCurrentAvatar({
    //                 ...currentAvatar,
    //                 hairColour: hairColour[0],
    //               });
    //             }}
    //           />,
    //         )}
    //       </div>
    //       <div className={"customization-options-container " + (activeSection === 'clothes' ? 'active-selection' : '')}>
    //         {ClothingOptions.map(clothing =>
    //           <div
    //             key={clothing}
    //             className={"customization-option  " + (currentAvatar.clothingType === clothing ? "active-selection" : "")}
    //             style={{ backgroundColor: "white" }} // Hack?
    //             onClick={() => {
    //               if (currentAvatar.clothingType !== clothing) {
    //                 setIsEditMode(true);
    //               }

    //               setCurrentAvatar({
    //                 ...currentAvatar,
    //                 clothingType: clothing,
    //               });
    //             }}
    //           >
    //             <Piece
    //               pieceType="clothe"
    //               pieceSize="50"
    //               clotheType={clothing}
    //               clotheColor={currentAvatar.clothingColour}
    //             />
    //           </div>,
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   {/* Discard Modal */}
    //   <div
    //     className={"discard-popup-background " + (viewConfirmModal ? "show" : "")}
    //     onClick={(e) => {
    //       // If the popup background is clicked directly then execute the cancel
    //       if (e.target.classList.contains("discard-popup-background")) {
    //         setViewConfirmModal(false);
    //       }
    //     }}
    //   >
    //     <div className="popup --container">
    //       <MdClose
    //         className="btn-close"
    //         onClick={() => { setViewConfirmModal(false); }}
    //       />
    //       <h1 className="header">Discard Unsaved Changes?</h1>
    //       <p className="descriptive-text">Any unsaved changes will be lost. Are you sure you want to discard them?</p>
    //       <div className="btn-container">
    //         <button
    //           className="--btn red solid"
    //           onClick={() => {
    //             setCurrentAvatar(savedAvatar);
    //             setViewConfirmModal(false);
    //             setIsEditMode(false);
    //           }}
    //         >
    //           Discard
    //         </button>
    //         <button
    //           className="--btn blue outline"
    //           onClick={() => setViewConfirmModal(false)}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Color Modal */}
    //   <div
    //     className={"colour-popup-background " + (viewColourModal ? "show" : "")}
    //     onClick={e => {
    //       // If the popup background is clicked directly then execute the cancel
    //       if (e.target.classList.contains("colour-popup-background")) {
    //         onColorModalCancel();
    //       }
    //     }}
    //   >
    //     <div className="popup --container">
    //       <MdClose
    //         className="btn-close"
    //         onClick={() => onColorModalCancel()}
    //       />
    //       <h1 className="header">Select Colour</h1>
    //       <p className="descriptive-text">This will be the colour used to denote your messages in the classroom</p>
    //       <div
    //         className='users-color color-square'
    //         style={{ backgroundColor: `${tempColour}` }}
    //       />
    //       <div className="custom-colors-container">
    //         {ChatColourOptions.map(color =>
    //           <div
    //             key={color}
    //             className={`color-square color-option ${tempColour === color ? 'active' : ''}`}
    //             style={{ backgroundColor: color }}
    //             onClick={() => { setTempColour(color); }}
    //           >
    //             {tempColour === color && <MdCheck color="white" fontSize="30px" />}
    //           </div>,
    //         )}
    //       </div>
    //       <div className="btn-container">
    //         <button
    //           className="--btn yellow solid"
    //           onClick={() => {
    //             setCurrentAvatar({
    //               ...currentAvatar,
    //               chatColour: tempColour,
    //             });
    //             setViewColourModal(false);
    //           }}
    //         >
    //           Select Colour
    //         </button>
    //         <button
    //           className="--btn blue outline"
    //           onClick={() => {
    //             onColorModalCancel();
    //             setTempColour(currentAvatar.chatColour);
    //           }}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default AvatarPage;
