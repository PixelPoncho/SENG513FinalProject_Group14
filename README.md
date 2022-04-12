# Welcome to the Virtual Classroom Space
This is an application designed to create a virtual environment for users to join and interact with one another.

For this application to run correctly, you are required to setup both the back- and front-end. In order to learn how to do that, just keep reading!

## About the Back-End
This section of the codebase was created using NodeJS, Express, MongoDB, and Colyseus.

First things first, make sure to have the listed technologies about installed! 
#### **`NodeJS`**
Most people have this installed by default. However, if you don't head over to the NodeJs [site](https://nodejs.org/en/). This project ran using Version 16 of NodeJS, so we suggest you install the same just in case of compatibility issues. `NPM` should also be available once you install NodeJS.
#### **`MongoDB`** 
If you don't already have MongoDB installed, you may find it at this site: [MongoDB Download](https://www.mongodb.com/try/download/community) and download the community server version of the database.

Now to get MongoDB running. The version you just installed, should include a program called "_MongoDB Compass_". This program can be used to connect to the database. 

Open up `Compass` and try connecting to the default database `mongodb://localhost:27017`. 
- If it did not work, navigate to the MongoDB installation site, go to `bin`, and run `mongod.exe`. This will start the MongoDB server listening. 
- **Ensure the port that it is listening on aligns with the port specified in the database path in the application** (27017)! However, this shouldn't be an issue as the default port that MongoDB listens on is the one that the application's server will try and access the local MongoDB server from.

## Starting the Backend
Now as we mentioned, this program requires both the back-end and front-end to be running simultaneously. So 
To start the backend you will need to navigate to `src/backend/`. Once in the location run the following comand:
- `npm install` to install the dependencies
- [Optional] `npm run seed` to seed the database with test data.
- `npm start` will start the server on local port `3001` 

### All Available Back-End Scripts

#### `npm run seed`
Seeds the database with some test users and test classroom, helpful for both development and testing purposes.

#### `npm run db`
Displays the contents of the database, helpful for both development and testing purposes.

#### `npm start`

<hr />

# Getting Started with the Front-End
This application was bootstrapped from the "Create React App" repository. You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

It uses a few different react libraries to be able to provide it's full functionality, such as: 
- `react-icons`: for svgs used throughout the application
- `react-bootstrap`: for some default components (ie. navbar) and styling
- `axios`: to be able to make requests using HTTP methods
- `react-router`: to allow our application to be more than a SPA

## Starting the Front-End
Similar to the backend you must navigate to the `src/frontend/` directory, where we ask you run the following commands:
- `npm install` to install all the required dependencies
- `npm start` to start the application and makes it available locally at `localhost:3000` in your browser

### Available Front-End Scripts

- `start` starts the application and makes it available locally at `localhost:3000` in your browser. The page will reload if you make edits. You will also see any lint errors in the console.
- `test` launches the test runner in the interactive watch mode (more info [here](https://facebook.github.io/create-react-app/docs/running-tests))
- `build` runs build sequence to create a package of the application in the `build` folder
- `lint` runs ESLint against every .js & .jsx file found in the `src` folder and outputs a report of lint error & warnings to the user if any are found.
- `lint:fix` functions like `lint` except it automatically resolves a majority of inconsistencies.

#### `npm start`

Starts the application and makes it available locally at `localhost:3000` in your browser. The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm run test`

Launches the test runner in the interactive watch mode (more info [here](https://facebook.github.io/create-react-app/docs/running-tests))

#### `npm run build`

Runs build sequence to create a package of the application in the `build` folder, typically used for hosting your application at some external domain.

#### `npm run lint`

Runs ESLint against every .js & .jsx file found in the `src` folder and outputs a report of lint error & warnings to the user if any are found.

#### `npm run lint:fix`
Functions like `lint` except it automatically resolves a majority of inconsistencies.

<hr />

## Design Overview

### Express

Express is used to setup a simple web server that the client facing front end can make requests to. This allows us to easily encapsulate different functionality into routes for the front end to make requests to. Express was also used to handle sessions, and to ensure that users were logged in when attempting to make certain requests.

### MongoDB

MongoDB is used for persistent storage for our application. This includes things such as user information, user settings, and classroom information. This allows a user to persist certain information between sessions.

### Colyseus

Colyseus is a tool to design real time multiplayer games in NodeJS, it allows for synchronization of game states as well as easy socketed communication between different clients in a given room.

### React

React is a Javascript library that is used for front-end development, as you can build UIs based on various components. 
