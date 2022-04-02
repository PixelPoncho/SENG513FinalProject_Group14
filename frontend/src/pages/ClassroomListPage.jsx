// TODO: Implement the back-end functionality
// TODO: Highlight actively selected classroom and allow users to click a card to update the actively selected classroom. Track the invite code of said classroom in case the user wants to enter it.
// TODO: Extract the invite code to visit classroom
// TODO: Add menu for each class card and finalize styling of it

// Importing Components from node_modules
import React, { useState } from 'react'

// Importing styling
import '../styles/ClassroomListPage.scss';

function ExistingClassrooms() {
  return (
    <div className="existing-container">
      <p className="descriptive-text">
        Start up one of your classes and invite friends by clicking one from the list below or join a new one by inputting the respective invite code.
      </p>

      <div className="join-class">
        <label htmlFor="inviteCode" className='classroom-management sub-header'>
          Invite Code
          <br />
          <input
            id="inviteCode"
            className="form-control textbox"
            type="text"
            placeholder="XXXX-XXXX"
          />
        </label>

        <button
          className='--btn yellow solid'
          onClick={() => {
            // Do something to open up the classroom whose invite code this belongs to. Check that it is in fact active/valid code/code has been entered. Probably inform user if invalid.
          }}
        >
          Visit Classroom
        </button>
      </div>

      <div className='section-divider'>
        <div className="horizontal-divider short" />
        <h5 className='sub-header'>OR</h5>
        <div className="horizontal-divider short" />
      </div>

      <div className='your-classes'>
        {/* Setup for a card. Need to use .map to create cards for every instance the user has. */}
        <div className='class-card'>
          <h4 className='header'>Class Name</h4>
          <p>Offline/Online status</p>
          {/* Include kebab menu and edit options */}
        </div>

        <div className='class-card'>
          <h4 className='header'>Class Name</h4>
          <p>Offline/Online status</p>
          {/* Include kebab menu and edit options */}
        </div>
      </div>
      <button className='--btn yellow solid'>
        Start Your Class
      </button>
    </div>
  )
}

function NewClassroom() {
  return (
    <div className="new-container">
      <p className="descriptive-text">
        Create a classroom where you and others can interact in! An invite code for the space will be generated upon creation, and can be used by others to join your classroom.
      </p>

      <div className="set-name">
        <label htmlFor="classroomName" className='classroom-management sub-header'>
          Classsroom Name
          <br />
          <input
            id="classroomName"
            className="form-control textbox"
            type="text"
            placeholder="My Classroom"
            onChange={() => {
              // On cahnge update a variable containing the name that the new classroom can be set to. On "Create Classroom" button click should check to see if its an existing one and if it is, let the user know
            }}
          />
        </label>
      </div>

      <h5 className='sub-header'>Select Your Classroom Layout</h5>
      
      <div className='classroom-layout'>
        PLACE TO PICK CLASSROOM LAYOUT?
        {/* Insert classroom options that the user can select from. Or are we only doing one? */}
      </div>

      <button
        className='--btn yellow solid'
        onClick={() => {
          //Create classroom and go live
        }}
      >
        Create Classroom
      </button>
    </div>
  )
}


function ClassroomListPage() {
  // Used to update "section" of customization user is in
  const [activeSubView, setActiveSubView] = useState('existing');

  return (
    <div className="classroom-management --container">

      <div className="subview-toggle-container">
        <h1
          className={`sub-header ` + (activeSubView === 'existing' ? 'active' : '')}
          onClick={() => {
            if (activeSubView === 'existing') {
              return;
            } else {
              setActiveSubView('existing');
            }
          }}
        >
          Existing Classrooms
        </h1>
        <h1
          className={`sub-header ` + (activeSubView === 'new' ? 'active' : '')}
          onClick={() => {
            console.log("here")
            if (activeSubView === 'new') {
              return;
            } else {
              setActiveSubView('new');
            }
          }}
        >
          Create New Classrooms
        </h1>
      </div>

      <div className="horizontal-divider" />

      {activeSubView === 'existing' &&
        <ExistingClassrooms />
      }

      {activeSubView === 'new' &&
        <NewClassroom />
      }

    </div >
  )
}

export default ClassroomListPage