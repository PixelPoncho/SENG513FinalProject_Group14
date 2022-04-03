// TODO: Disable user from being able to move pages in edit mode
// TODO: On change, set it to edit mode
// TODO: Color picker
// TODO: Add interactivity of avatar customization (ie. see different "sub-page")

// Importing Components from node_modules
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Import Local Components
import FormError from "../components/FormError";

// Importing icons
import { MdEdit, MdClose, MdCheck } from 'react-icons/md'

// Importing Assets
import { ReactComponent as ClothesIcon } from '../assets/clothes.svg'
import { ReactComponent as SkinIcon } from '../assets/skin.svg'
import { ReactComponent as HairIcon } from '../assets/hair.svg'

// Importing the Avatar react library
import Avatar from 'avataaars'
import {Piece} from "avataaars";

// Importing styling
import '../styles/AvatarPage.scss';
import {useForm} from "react-hook-form";

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

const ChatColorOptions = [
    "#1ABC9C",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#E91E63",
    "#F1C40F",
    "#E67E22",
    "#E74C3C",
    "#11806A",
    "#1F8B4C",
    "#206694",
    "#71368A",
    "#AD1457",
    "#C27C0E",
    "#A84300",
    "#992D22",
];

// Create a promise and get the current user info on load
const loadUser = new Promise(async resolve => {
    const resp = await axios.post("/users/getUser");
    const user = resp.data.user;
    resolve(user);
});

function AvatarPage() {
  // Used to display edit mode content (ie. buttons) By default should be false, but for development purposes could be set to true
  const [isEditMode, setIsEditMode] = useState(true);

  const [isEditColour, setIsEditColour] = useState(false);

  // Used to update "section" of customization user is in
  const [activeSection, setActiveSection] = useState('skin');
  // Used to track overall page of customization the user is in.
  let page = 1;

  // Saved state of the user to compare when changes have been made/restore to. This can be retrieved through other methods. (ie. maybe saved in session state on login or one time request to server on page access?)
  let savedAvatar = {
      username: "55555555",
      chatColour: "#555555",
      skin: "",
      topType: "",
      hairColour: "",
      clothingType: "",
      clothingColour: ""
  };

  let [currentAvatar, setCurrentAvatar] = useState({
      //TODO: These values are displayed initially, should we have better defaults?
      username: "666666",
      chatColour: "#666666",
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
              savedAvatar.chatColour = user.chatColour;
              savedAvatar.username = user.username;
              savedAvatar.skin = user.avatar.skin;
              savedAvatar.topType = user.avatar.topType;
              savedAvatar.hairColour = user.avatar.hairColour;
              savedAvatar.clothingType = user.avatar.clothingType;
              savedAvatar.clothingColour = user.avatar.clothingColour;


              const newObj = {
                  chatColour: savedAvatar.chatColour,
                  username: savedAvatar.username,
                  skin: savedAvatar.skin,
                  topType: savedAvatar.topType,
                  hairColour: savedAvatar.hairColour,
                  clothingType: savedAvatar.clothingType,
                  clothingColour: savedAvatar.clothingColour
              }
              setCurrentAvatar(newObj);
          }
      });
  }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onSubmit',
    });

    const onSave = async e => {
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

        try {
            await axios.post("/users/updateUser", data);

        }
        catch(error) {
            // No error handling needed currently.
        }
    };

    const onColorModalCancel = () => {
        setIsEditColour(false);

        // Reset the current chat colour to the last saved one
        setCurrentAvatar({
            ...currentAvatar,
            chatColour: savedAvatar.chatColour
        });
    };

  return (
      <>
    <form className="avatars --container" onSubmit={handleSubmit(onSave)}>

      {/* Containing the avatar */}
      <div className="left-container">

        {!isEditMode &&
          <div className="top chat-options non-edit">
            <h1 className="sub-header">{savedAvatar.username}</h1>
            <div
              className='users-color'
              style={{ backgroundColor: `${currentAvatar.chatColour}` }}
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
                    {...register("username", {required: true})}
                    onChange={(e) => {
                        setCurrentAvatar({
                            ...currentAvatar,
                            username: e.target.value
                        });
                    }}
                />
                {errors.username && (<FormError errorMsg="A username is required"/>)}
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
    </form>
      <div
          className={"popup-background " + (isEditColour ? "show" : "")}
          onClick={e => {
              // If the popup background is clicked directly then execute the cancel
              if(e.target.classList.contains("popup-background")) {
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
                  {ChatColorOptions.map(color =>
                      <div
                          key={color}
                          className="color-square color-option"
                          style={{ backgroundColor: color }}
                          onClick={e => {
                              setCurrentAvatar({
                                  ...currentAvatar,
                                  chatColour: color
                              });
                          }}
                      >
                          {currentAvatar.chatColour === color && <MdCheck color="white" fontSize="30px" />}
                      </div>
                  )}
              </div>
              <div className="btn-container">
                  <button
                      className="--btn yellow solid"
                      onClick={async () => {
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
  )
}

export default AvatarPage