// TODO: Disable user from being able to move pages in edit mode
// TODO: On change, set it to edit mode
// TODO: Color picker
// TODO: Add interactivity of avatar customization (ie. see different "sub-page")

// Importing Components from node_modules
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
// Importing the Avatar react library
import Avatar from 'avataaars';
import { Piece } from "avataaars";

// Import Local Components
import FormError from "../components/FormError";
import {
  SkinOptions,
  HairOptions,
  HairColourOptions,
  ClothingOptions,
  ChatColourOptions,
} from '../components/AvatarOptions';

// Importing icons
import { MdEdit, MdClose, MdCheck } from 'react-icons/md';

// Importing Assets
import { ReactComponent as ClothesIcon } from '../assets/clothes.svg';
import { ReactComponent as SkinIcon } from '../assets/skin.svg';
import { ReactComponent as HairIcon } from '../assets/hair.svg';

// Importing styling
import '../styles/AvatarPage.scss';

function AvatarPage({savedAvatar, savedName, savedColour}) {
  // Used to display edit mode content (ie. buttons) By default should be false, but for development purposes could be set to true
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditColour, setIsEditColour] = useState(false);

  // Used to update "section" of customization user is in
  const [activeSection, setActiveSection] = useState('skin');
  // Used to track overall page of customization the user is in.
  let page = 1;

  const { register, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onSubmit',
  });

  // Saved state of the user to compare when changes have been made/restore to. This can be retrieved through other methods. (ie. maybe saved in session state on login or one time request to server on page access?)
  let savedAvatarUpdated = savedAvatar;

  let [currentAvatar, setCurrentAvatar] = useState({
    // TODO: These values are displayed initially, should we have better defaults?
    chatColour: "#000",
    skin: SkinOptions[0][0],
    topType: HairOptions[0],
    hairColour: HairColourOptions[0][0],
    clothingType: ClothingOptions[0],
  });

  // Perform an initial loading of the user's existing avatar preferences/
  useEffect(() => {
    loadUser().then((data) => {
      if (data) {
        console.log(data)
        user => {
          if (user?.avatar !== undefined) {
            savedAvatar.chatColour = savedColour;
            savedAvatar.username = savedName;
            savedAvatar.skin = user.avatar.skin;
            savedAvatar.topType = user.avatar.topType;
            savedAvatar.hairColour = user.avatar.hairColour;
            savedAvatar.clothingType = user.avatar.clothingType;

            const newObj = {
              chatColour: savedAvatar.chatColour,
              username: savedAvatar.username,
              skin: savedAvatar.skin,
              topType: savedAvatar.topType,
              hairColour: savedAvatar.hairColour,
              clothingType: savedAvatar.clothingType,
            };
            setCurrentAvatar(newObj);
          }
        };
      }
    });
  }, []);

  // On page load, call the API to fetch user data
  const loadUser = useCallback(() => {
    const dataPromise = axios.post("/users/getUser")
      .then((resp) => resp.data)
      .catch((err) => setError(err));
    return dataPromise;
  }, []);

  const onSave = async e => {
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

    try {
      await axios.post("/users/updateUser", data);
    } catch (error) {
      // No error handling needed currently.
    }
  };

  const onColorModalCancel = () => {
    setIsEditColour(false);

    // Reset the current chat colour to the last saved one
    setCurrentAvatar({
      ...currentAvatar,
      chatColour: savedAvatar.chatColour,
    });
  };

  return (
    <>
      <form className="avatars --container" onSubmit={handleSubmit(onSave)}>

        {/* Containing the avatar */}
        <div className="left-container">

          {!isEditMode &&
            <div className="top chat-options non-edit">
              <h1 className="sub-header">{currentAvatar.username}</h1>
              <div
                className='users-color'
                style={{ backgroundColor: `${currentAvatar.chatColour}` }}
                onClick={() => {
                  setIsEditMode(true);
                  setIsEditColour(true);
                }}
              />
              {/* Edit icon */}
              <MdEdit
                className="edit-icon"
                onClick={() => setIsEditMode(true)}
              />
            </div>
          }

          {isEditMode &&
            <div className="top chat-options edit">
              <label>
                <input
                  className="textbox"
                  value={currentAvatar.username}
                  {...register("username", { required: true })}
                  onChange={(e) => {
                    setCurrentAvatar({
                      ...currentAvatar,
                      username: e.target.value,
                    });
                  }}
                />
                {errors.username && (<FormError errorMsg="A username is required" />)}
              </label>

              <div
                className='users-color'
                style={{ backgroundColor: `${currentAvatar.chatColour}` }}
                onClick={() => setIsEditColour(true)}
              />
            </div>
          }

          <div className="avatar-container">
            <Avatar
              style={{ width: '100%', height: '100%' }}
              avatarStyle='Transparent'
              topType={currentAvatar.topType}
              accessoriesType='Blank'
              hairColor={currentAvatar.hairColour}
              facialHairType='Blank'
              clotheType={currentAvatar.clothingType}
              clotheColor='PastelBlue'
              eyeType='Default'
              eyebrowType='Default'
              mouthType='Smile'
              skinColor={currentAvatar.skin}
            />
          </div>

          {isEditMode &&
            <div className="btn-container">
              <button
                className="--btn yellow solid"
                {...register("save-changes")}
              >
                Save Changes
              </button>
              <button
                className="--btn blue outline"
                onClick={() => {
                  // TODO: Open modal that asks user if they want to lose their progress
                }}
              >
                Cancel
              </button>
            </div>
          }

        </div>
        <div className='vertical-divider' />

        {/* Container for all avatar customization options*/}
        <div className="right-container">
          <h1 className='avatar header'>Your Avatar</h1>

          {/* Jump to specific customization choices */}
          <div className="horizontal-divider top" />

          <div className="customization-section">
            <SkinIcon
              className={`customization-section-icon ` + (activeSection === 'skin' ? 'active' : '')}
              onClick={() => {
                if (activeSection === 'skin') {
                  return;
                } else {
                  setActiveSection('skin');
                  // TODO: Take additional action to make sure customization options jump to the relevant category
                  page = 1;
                }
              }}
            />
            <HairIcon
              className={`customization-section-icon ` + (activeSection === 'hair' ? 'active' : '')}
              onClick={() => {
                if (activeSection === 'hair') {
                  return;
                } else {
                  setActiveSection('hair');
                  // TODO: Take additional action to make sure customization options jump to the relevant category

                  page = 2;
                }
              }}
            />
            <ClothesIcon
              className={`customization-section-icon ` + (activeSection === 'clothes' ? 'active' : '')}
              onClick={() => {
                if (activeSection === 'clothes') {
                  return;
                } else {
                  setActiveSection('clothes');
                  // TODO: Take additional action to make sure customization options jump to the relevant category

                  page = 3;
                }
              }}
            />
          </div>

          <div className="horizontal-divider bottom" />

          {/* TODO: Update this section!! add the arrows just in case one section has more than one page associated with it */}
          <div className={"customization-options-container " + (activeSection === 'skin' ? 'active-selection' : '')}>
            {SkinOptions.map((skinOpt, index) =>
              <div
                key={skinOpt[1]}
                className={"customization-option " + (currentAvatar.skin === skinOpt[0] ? "active-selection" : "")}
                style={{ backgroundColor: `${SkinOptions[index][1]}` }}
                onClick={() => {
                  setCurrentAvatar({
                    ...currentAvatar,
                    skin: skinOpt[0],
                  });

                  // If something is selected then turn on edit mode and update currentAvatar with the most recent selection
                  // If the current selection is the saved on, then don't turn on edit mode
                  if (currentAvatar.skin !== savedAvatar.skin) {
                    setIsEditMode(true);
                  }

                  // TODO: (STEVEN) What is the purpose of this?
                  if (page === 1) {
                    currentAvatar.skin = '';
                  } else if (page === 2) {
                    currentAvatar.hair = '';
                  } else if (page === 3) {
                    currentAvatar.clothing = '';
                  }
                }}
              />,
            )}
          </div>

          <div className={"customization-options-container " + (activeSection === 'hair' ? 'active-selection' : '')}>
            {/* Hack to force new line in flex layout */}
            <div className="sub-header" style={{ flexBasis: "100%" }}>Hair Style</div>
            {HairOptions.map(hair =>
              <div
                key={hair}
                className={"customization-option " + (currentAvatar.topType === hair ? "active-selection" : "")}
                style={{ backgroundColor: "white" }} // Hack?
                onClick={() => {
                  if (currentAvatar.topType !== savedAvatar.topType) {
                    setIsEditMode(true);
                  }

                  setCurrentAvatar({
                    ...currentAvatar,
                    topType: hair,
                  });
                }}
              >
                <Piece
                  pieceSize='error' // Forced to pick a pixel size and I don't want to.
                  pieceType='top'
                  topType={hair}
                  hairColor={currentAvatar.hairColour}
                />
              </div>,
            )}

            {/* Hack to force new line in flex layout */}
            <div className="sub-header" style={{ flexBasis: "100%" }}>Hair Colour</div>

            {HairColourOptions.map(hairColour =>
              <div
                key={hairColour[0]}
                className={"customization-option  " + (currentAvatar.hairColour === hairColour[0] ? "active-selection" : "")}
                style={{ backgroundColor: `${hairColour[1]}` }}
                onClick={() => {
                  if (currentAvatar.hairColour !== savedAvatar.hairColour) {
                    setIsEditMode(true);
                  }

                  setCurrentAvatar({
                    ...currentAvatar,
                    hairColour: hairColour[0],
                  });
                }}
              />,
            )}
          </div>
          <div className={"customization-options-container " + (activeSection === 'clothes' ? 'active-selection' : '')}>
            {ClothingOptions.map(clothing =>
              <div
                key={clothing}
                className={"customization-option  " + (currentAvatar.clothingType === clothing ? "active-selection" : "")}
                style={{ backgroundColor: "white" }} // Hack?
                onClick={() => {
                  if (currentAvatar.clothingType !== savedAvatar.clothingType) {
                    setIsEditMode(true);
                  }

                  setCurrentAvatar({
                    ...currentAvatar,
                    clothingType: clothing,
                  });
                }}
              >
                <Piece
                  pieceType="clothe"
                  pieceSize="50"
                  clotheType={clothing}
                  clotheColor={currentAvatar.clothingColour}
                />
              </div>,
            )}
          </div>
        </div>
      </form>
      <div
        className={"popup-background " + (isEditColour ? "show" : "")}
        onClick={e => {
          // If the popup background is clicked directly then execute the cancel
          if (e.target.classList.contains("popup-background")) {
            onColorModalCancel();
          }
        }}
      >
        <div className="popup --container">
          <MdClose
            className="btn-close"
            onClick={onColorModalCancel}
          />
          <h1 className="header">Select Colour</h1>
          <p className="descriptive-text">This will be the colour used to denote your messages in the classroom</p>
          <div
            className='users-color color-square'
            style={{ backgroundColor: `${currentAvatar.chatColour}` }}
          />
          <div className="custom-colors-container">
            {ChatColourOptions.map(color =>
              <div
                key={color}
                className="color-square color-option"
                style={{ backgroundColor: color }}
                onClick={e => {
                  setCurrentAvatar({
                    ...currentAvatar,
                    chatColour: color,
                  });
                }}
              >
                {currentAvatar.chatColour === color && <MdCheck color="white" fontSize="30px" />}
              </div>,
            )}
          </div>
          <div className="btn-container">
            <button
              className="--btn yellow solid"
              onClick={async() => {
                await onSave();
                setIsEditColour(false);
              }}
            >
              Save
            </button>
            <button
              className="--btn blue outline"
              onClick={onColorModalCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvatarPage;
