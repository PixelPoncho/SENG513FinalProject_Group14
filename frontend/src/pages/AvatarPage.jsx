// TODO: Integrate the profile picture API thingy
// TODO: Disable user from being able to move pages in edit mode
// TODO: On change, set it to edit mode
// TODO: Color picker
// TODO: Save changes on "save" click
// TODO: Add interactivity of avatar customization (ie. see different "sub-page")

// Importing Components from node_modules
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Importing icons
import { MdEdit } from 'react-icons/md'

// Importing Assets
import { ReactComponent as ClothesIcon } from '../assets/clothes.svg'
import { ReactComponent as SkinIcon } from '../assets/skin.svg'
import { ReactComponent as HairIcon } from '../assets/hair.svg'

// Importing the Avatar react library
import Avatar from 'avataaars'
import {Piece} from "avataaars";

// Importing styling
import '../styles/AvatarPage.scss';

// Customization Options available for the user to interact with. 
// Assumed the API has a large number of options, but we're limiting what users can pick


const SkinOptions = [
    ['Tanned', '#FD9841'],
    ['Yellow', '#F8D25C'],
    ['Pale', '#FFDBB4'],
    ['Light', '#EDB98A'],
    ['Brown', '#D08B5B'],
    ['DarkBrown', '#AE5D29'],
    ['Black', '#614335']
];

const HairOptions = [
    'LongHairStraight',
    'ShortHairFrizzle',
    'Turban'
];

const HairColourOptions = [
    ['Auburn', '#A55728'],
    ['Black', '#2C1B18'],
    ['Blonde', '#B58143'],
    ['BlondeGolden', '#D6B370'],
    ['Brown', '#724133'],
    ['BrownDark', '#4A312C'],
    ['PastelPink', '#F59797'],
    ['Blue', '#000fdb']
];

const ClothingOptions = [
    "BlazerShirt",
    "BlazerSweater",
    "CollarSweater",
    "GraphicShirt",
    "Hoodie",
    "Overall",
    "ShirtCrewNeck",
    "ShirtScoopNeck",
    "ShirtVNeck",
];

const loadUser = new Promise(async resolve => {
    const resp = await axios.post("/users/getUser");
    const user = resp.data.user;
    resolve(user);
});

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
    topType: "",
    hairColour: "",
    clothingType: "",
    clothingColour: ""
  }

  const [currentAvatar, setCurrentAvatar] = useState({
      // These initial values act as defaults
      username: "Percival",
      chatColour: "#00b1fc",
      skin: SkinOptions[0][0],
      topType: HairOptions[0],
      hairColour: HairColourOptions[0][0],
      clothingType: ClothingOptions[0],
      clothingColour: "PastelBlue" // Hardcode for now
  });

  // Perform an initial loading of the user's existing avatar preferences/
  // Note: I don't understand how this works but using useEffect with empty dependencies
  // prevents this from generating an infinite render loop (because setCurrentAvatar triggers a re-render)
  useEffect(() => {
      loadUser.then(user => {
          if(user?.avatar !== undefined) {
              savedAvatar.username = user.username;
              savedAvatar.skin = user.avatar.skin;
              savedAvatar.topType = user.avatar.topType;
              savedAvatar.hairColour = user.avatar.hairColour;
              savedAvatar.clothingType = user.avatar.clothingType;
              savedAvatar.clothingColour = user.avatar.clothingColour;
              setCurrentAvatar(savedAvatar);
          }
      });
  }, []);

    const onSave = async () => {
        const data = {
            user: {
                username: currentAvatar.username,
                chatColour: currentAvatar.chatColour,
                avatar: {
                    skin: currentAvatar.skin,
                    topType: currentAvatar.topType,
                    hairColour: currentAvatar.hairColour,
                    clothingType: currentAvatar.clothingType,
                    clothingColour: currentAvatar.clothingColour
                }
            }
        };
        const response = await axios.post("/users/updateUser", data);
    };

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
            <Avatar
                style={{width: '100%', height: '100%'}}
                avatarStyle='Transparent'
                topType={currentAvatar.topType}
                accessoriesType='Prescription02'
                hairColor={currentAvatar.hairColour}
                facialHairType='Blank'
                clotheType={currentAvatar.clothingType}
                clotheColor='PastelBlue'
                eyeType='Happy'
                eyebrowType='Default'
                mouthType='Smile'
                skinColor={currentAvatar.skin}
            />
        </div>


        {isEditMode &&
          <div className="btn-container">
            <button
              className="--btn yellow solid"
              onClick={onSave}
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
                    className={"customization-option " + (currentAvatar.skin === skinOpt[0] ? "active-selection" : "") }
                    style={{ backgroundColor: `${SkinOptions[index][1]}` }}
                    onClick={() => {
                        setCurrentAvatar({
                            ...currentAvatar,
                            skin: skinOpt[0]
                        });

                        // If something is selected then turn on edit mode and update currentAvatar with the most recent selection
                        // If the current selection is the saved on, then don't turn on edit mode
                        if(currentAvatar.skin !== savedAvatar.skin) {
                            setIsEditMode(true);
                        }

                        //TODO: (STEVEN) What is the purpose of this?
                        if (page === 1) {
                            currentAvatar.skin = ''
                        } else if (page === 2) {
                            currentAvatar.hair = ''
                        } else if (page === 3) {
                            currentAvatar.clothing = ''
                        }
                    }}
                />
            )}
        </div>

        <div className={"customization-options-container " + (activeSection === 'hair' ? 'active-selection' : '')}>
            {/* Hack to force new line in flex layout */}
            <div className="sub-header" style={{flexBasis: "100%"}}>Hair Style</div>
            {HairOptions.map(hair =>
                <div
                    key={hair}
                    className={"customization-option " + (currentAvatar.topType === hair ? "active-selection" : "") }
                    style={{ backgroundColor: "white" }} // Hack?
                    onClick={() => {
                        setCurrentAvatar({
                            ...currentAvatar,
                            topType: hair
                        });
                    }}
                >
                    <Piece
                        pieceSize='error' // Forced to pick a pixel size and I don't want to.
                        pieceType='top'
                        topType={hair}
                        hairColor={currentAvatar.hairColour}
                    />
                </div>
            )}

            {/* Hack to force new line in flex layout */}
            <div className="sub-header" style={{flexBasis: "100%"}}>Hair Colour</div>

            {HairColourOptions.map(hairColour =>
                <div
                    key={hairColour[0]}
                    className={"customization-option  " + (currentAvatar.hairColour === hairColour[0] ? "active-selection" : "")}
                    style={{ backgroundColor: `${hairColour[1]}` }}
                    onClick={() => {
                        setCurrentAvatar({
                            ...currentAvatar,
                            hairColour: hairColour[0]
                        });
                    }}
                />
            )}
        </div>
        <div className={"customization-options-container " + (activeSection === 'clothes' ? 'active-selection' : '')}>
            {ClothingOptions.map(clothing =>
                <div
                    key={clothing}
                    className={"customization-option  " + (currentAvatar.clothingType === clothing ? "active-selection" : "")}
                    style={{ backgroundColor: "white" }} // Hack?
                    onClick={() => {
                        setCurrentAvatar({
                            ...currentAvatar,
                            clothingType: clothing
                        });
                    }}
                >
                    <Piece
                        pieceType="clothe"
                        pieceSize="50"
                        clotheType={clothing}
                        clotheColor={currentAvatar.clothingColour}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default AvatarPage