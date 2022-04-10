const { Room } = require("colyseus");
const { Schema, MapSchema, defineTypes } = require("@colyseus/schema");
const { getUserById, activateClassRoom, deactivateClassRoom, getClassRoomById } = require("../db/db");

class Avatar extends Schema {
    constructor(skin, topType, hairColour, clothingType, clothingColour) {
        super();
        this.skin = skin;
        this.topType = topType;
        this.hairColour = hairColour;
        this.clothingType = clothingType;
        this.clothingColour = clothingColour;
    }
}
defineTypes(Avatar, {
    skin: "string",
    topType: "string",
    hairColour: "string",
    clothingType: "string",
    clothingColour: "string",
});

class User extends Schema {
    constructor(properties, x = 0, y = 0) {
        super();
        const { userId, username, email, avatar } = properties;
        this.x = x;
        this.y = y;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
    }
}

defineTypes(User, {
    x: "number",
    y: "number",
    userId: "string",
    username: "string",
    email: "string",
    avatar: Avatar
});

class State extends Schema {
    constructor(gridSize) {
        super();
        this.users = new MapSchema();
        this.gridSize = gridSize;
    }

    addUser(sessionId, properties) {
        this.users.set(sessionId, new User(properties));
    }
    
    removeUser(sessionId) {
        this.users.delete(sessionId);
    }

    moveUser(sessionId, deltaX, deltaY) {
        const user = this.users.get(sessionId);
        user.x = user.x + deltaX;
        user.y = user.y + deltaY;
        if(user.x < 0) user.x = 0;
        else if(user.x > this.gridSize) user.x = this.gridSize;
        if(user.y < 0) user.y = 0;
        else if(user.y > this.gridSize) user.y = this.gridSize;
        this.users.set(sessionId, user);
    }
}

defineTypes(State, {
    users: {map: User},
    gridSize: "number"
});

class ClassRoom extends Room {
    maxClients = 20;
    gridSize = 10;

    // anyone will be able to start a room, they just wont have admin in that room
    // the classId will need to be unique since the filterby would just sent them to existing room
    // this protects us from the issue of multiple classroom instances
    // if they just make up a classId then disconnect up front
    async onCreate(options) {
        console.log("Starting ClassRoom with options ", options);
        // get the classId from the user set options
        const { classId } = options;
        this.classId = classId;
        // get the classroom the user wants to start
        // if it is a real classroom and not active start it
        const { error, classRoom } = await activateClassRoom(classId);
        if(error) {
            console.log(error);
            this.disconnect();
            return;
        }
        //this.setMetadata({ classId, className: classRoom.name, owner: classRoom.owner._id });
        this.setState(new State(this.gridSize));
        this.onMessage("chat", (client, message) => {
            console.log(`chat from ${client.sessionId} saying ${message}`);
            this.broadcast("chat", client.name, message);
        });
        this.onMessage("move", (client, message) => {
            const { deltaX, deltaY } = message;
            this.state.moveUser(client.sessionId, deltaX, deltaY);
        });
        console.log("ClassRoom created successfully ");
    }

    // consider making this async and just throw new error
    onAuth(client, options, req) {
        console.log(client.sessionId + " is in auth with options " + JSON.stringify(options) + " req session " + JSON.stringify(req.session) );
        console.log(req.session.userId);
        // use a promise so that we can have custom rejections letting the user know why they failed to join
        return new Promise(async (resolve, reject) => {
            const { classId } = options;

            if(!classId) reject({ error: "Room not running" });
            // make sure routing works and users are going to the correct rooms
            if(classId !== this.classId) reject({ error: "Request room doesnt match this room id" });
            // find the user
            if(!req.session.isLoggedIn || !req.session.userId) reject({ error: "Not logged in" });
            const user = await getUserById(req.session.userId);
            if(!user) reject({ errror: "Invalid user" });
            console.log(JSON.stringify(user));
            // make sure the user isint banned from this room
            if(user.bannedClassRooms.includes(this.classId)) reject({ error: "User banned from this room" });
            const avatar = new Avatar(
                user.avatar.skin,
                user.avatar.topType,
                user.avatar.hairColour,
                user.avatar.clothingType,
                user.avatar.clothingColour
            )
            resolve({ userId: user._id, username: user.username, email: user.email, avatar: avatar });
        });
    }

    onJoin(client, options, auth) {
        console.log(client.sessionId + ' is joining ' + this.classId + ' with options ' + JSON.stringify(options) + ' auth ' + JSON.stringify(auth) );
        const { userId, username, email, avatar } = auth;
        const userIdStr = userId.toString();
        //const isOwner = userId === this.metadata.owner;
        // assign userful information to the client
        // we carry the name, id and if they are the owner of the room
        //client.userData = { userId, name, isOwner }
        this.state.addUser(client.sessionId, { userIdStr, username, email, avatar });
    }

    onLeave(client) {
        console.log(client.sessionId + ' is leaving the room ' + this.classId);
        this.state.removeUser(client.sessionId);
    }

    async onDispose() {
        console.log(`shutting down room ${this.classId}`);
        const { error, classRoom } = await deactivateClassRoom(this.classId);
        if(error) console.log(`${this.classId} - ${error}`);
    }
}


module.exports = { User, State, ClassRoom };