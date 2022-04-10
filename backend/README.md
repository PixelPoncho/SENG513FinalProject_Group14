# Getting Started with [insert game name here] Server

This project was creted using NodeJS, Express, MongoDB, and Colyseus.

To run this project first start the mongod.exe on your local machine, then proceed to run any of the availible scripts.

## Design Overview

### Express

Express is used to setup a simple web server that the client facing front end can make requests to. This allows us to easily encapsulate different functionality into routes for the front end to make requests to. Express was also used to handle sessions, and to ensure that users were logged in when attempting to make certain requests.

### MongoDB

MongoDB is used for persistent storage for our application. This includes things such as user information, user settings, and classroom information. This allows a user to persist certain information between sessions.

### Colyseus

Colyseus is a tool to design real time multiplayer games in NodeJS, it allows for synchronization of game states as well as easy socketed communication between different clients in a given room.

## Availible Scripts

### `npm run seed`

Seeds the database with some test users and test classroom, helpful for both development and testing purposes.

### `npm run db`

Displays the contents of the database, helpful for both development and testing purposes.

### `npm start`

Starts the server on [http://localhost:3001](http://localhost:3001)

The server had no web view of its own, but interacts with the front end through a combination of requests.

