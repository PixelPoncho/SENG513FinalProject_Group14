# Getting started with the back end

This project was created using NodeJS, Express, MongoDB, and Colyseus.

To run this project first start the mongod.exe on your local machine, then proceed to run any of the available scripts.

To run our application you will need mongodb installed on your machine. you can install it from this link here [MongoDB Download](https://www.mongodb.com/try/download/community) and download the community server version of the database.

Next you will need to ensure mongoDB is running. The version of MongoDB that you just installed includes a program called "MongoDB Compass" that can be used to connect to the database. Open up Compass and try connecting to the default database `mongodb://localhost:27017`. If that works you will not have to manually run MongoDB, if it does not navigate to the MongoDB installation, go to bin, and run mongod.exe, this will start the MongoDB server listening. Ensure the port that it is listening on aligns with the port specified in the database path in the application (27017) This should not be an issue as the default port that MongoDB listens on is the one that the server will try and access the local MongoDB server from.

You will also need to have Node.JS and NPM installed, for Node.JS we used version 16, and whichever version of NPM came with that.

## Starting the backend

To start the backend you will need to navigate to `src\backend\`. The first time you run the application you will need to run `npm install` to install the dependencies. To start the application run `npm start`. This will start the backend server on localhost port 3001.

## Design Overview

### Express

Express is used to setup a simple web server that the client facing front end can make requests to. This allows us to easily encapsulate different functionality into routes for the front end to make requests to. Express was also used to handle sessions, and to ensure that users were logged in when attempting to make certain requests.

### MongoDB

MongoDB is used for persistent storage for our application. This includes things such as user information, user settings, and classroom information. This allows a user to persist certain information between sessions.

### Colyseus

Colyseus is a tool to design real time multiplayer games in NodeJS, it allows for synchronization of game states as well as easy socketed communication between different clients in a given room.

## Available Scripts

### `npm run seed`

Seeds the database with some test users and test classroom, helpful for both development and testing purposes.

### `npm run db`

Displays the contents of the database, helpful for both development and testing purposes.

### `npm start`

Starts the server on [http://localhost:3001](http://localhost:3001)

The server had no web view of its own, but interacts with the front end through a combination of requests.

