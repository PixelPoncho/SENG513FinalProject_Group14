// TODO: Integrate the profile picture API thingy
// TODO: Disable user from being able to move pages in edit mode
// TODO: On change, set it to edit mode
// TODO: Color picker
// TODO: Save changes on "save" click
// TODO: Add interactivity of avatar customization (ie. see different "sub-page")

// Importing Components from node_modules
import React, { useState } from 'react'

// Importing icons
import { MdEdit } from 'react-icons/md'

// Importing Assets
import { ReactComponent as ClothesIcon } from '../assets/clothes.svg'
import { ReactComponent as SkinIcon } from '../assets/skin.svg'
import { ReactComponent as HairIcon } from '../assets/hair.svg'

// Importing styling
import '../styles/AvatarPage.scss';

// Customization Options available for the user to interact with. 
// Assumed the API has a large number of options, but we're limiting what users can pick
const SkinOptions = [
  "#FFECE0",
  "#F9D6C0",
  "#F1C3A1",
  "#A96B52",
  "#7E4220",
  "#4B301F"
]

const HairOptions = [];
const ClothingOptions = [];

function AvatarPage() {
  // Used to display edit mode content (ie. buttons) By default should be false, but for development purposes could be set to true
  const [isEditMode, setIsEditMode] = useState(true);
  // Used to update "section" of customization user is in
  const [activeSection, setActiveSection] = useState('skin');
  // Used to track overall page of customization the user is in.
  let page = 1;

  // Saved state of the user to compare when changes have been made/restore to. This can be retrieved through other methods. (ie. maybe saved in session state on login or one time request to server on page access?)
  let savedAvatar = {
    username: "Percival",
    chatColour: "#00b1fc",
    skin: "",
    hair: "",
    clothing: "",
  }

  // To be used when the user is in edit mode. Any time a new selection is made this is automatically updated 
  let currentAvatar = {
    username: "Percival",
    chatColour: "#00b1fc",
    skin: "",
    hair: "",
    clothing: "",
  }

  return (
    <div className="avatars --container">

      {/* Containing the avatar */}
      <div className="left-container">
        {!isEditMode &&
          <div className="top chat-options non-edit">
            <h1 className="sub-header">{savedAvatar.username}</h1>
            <div
              className='users-color'
              style={{ backgroundColor: `${savedAvatar.chatColour}` }}
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
            <input
              className="textbox"
              placeholder={savedAvatar.username}
              onChange={(e) => {
                // Update the username when user starts typing
                console.log(e.target.value);

                if (e.target.value === "") {
                  currentAvatar.username = savedAvatar.username;
                } else {
                  currentAvatar.username = e.target.value;
                }
              }}
            />
            <div
              className='users-color'
              style={{ backgroundColor: `${savedAvatar.chatColour}` }}
              onClick={() => {
                // TODO: open modal with options for chat colours!
                console.log("open module with colour options")
              }}
            />
          </div>
        }


        <div className="avatar-container">
          {/* INSERT CODE HERE TO DISPLAY AVATAR */}
        </div>


        {isEditMode &&
          <div className="btn-container">
            <button
              className="--btn yellow solid"
              onClick={() => {
                // TODO: When button is clicked, send the information to the server too! This can be moved to a non-inline function afterwards but just for a starting point

                savedAvatar = currentAvatar;
                setIsEditMode(false);
              }}
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

        {/* TODO: Update this section!! Use .map() and add the arrows just incase one section has more than one page associated with it */}
        <div className="customization-options-container">
          <div
            className="customization-option active-selection"
            style={{ backgroundColor: `${SkinOptions[0]}` }}
            onClick={() => {
              // If something is selected then turn on edit mode and update currentAvatar with the most recent selection
              // If the current selection is the saved on, then don't turn on edit mode
              setIsEditMode(true);
              if (page === 1) {
                currentAvatar.skin = ''
              } else if (page === 2) {
                currentAvatar.hair = ''
              } else if (page === 3) {
                currentAvatar.clothing = ''
              }
            }}
          />
          <div
            className="customization-option"
            style={{ backgroundColor: `${SkinOptions[1]}` }}
          />
          <div
            className="customization-option"
            style={{ backgroundColor: `${SkinOptions[2]}` }}
          />
          <div
            className="customization-option"
            style={{ backgroundColor: `${SkinOptions[3]}` }}
          />
          <div
            className="customization-option"
            style={{ backgroundColor: `${SkinOptions[4]}` }}
          />
          <div
            className="customization-option"
            style={{ backgroundColor: `${SkinOptions[5]}` }}
          />
        </div>
      </div>
    </div>
  )
}

export default AvatarPage