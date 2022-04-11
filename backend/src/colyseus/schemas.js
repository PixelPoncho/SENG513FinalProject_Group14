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
        console.log(JSON.stringify(properties));
        const { userId, username, email, avatar } = properties;
        this.x = x;
        this.y = y;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.avatar = new Avatar(
            avatar.skin,
            avatar.topType,
            avatar.hairColour,
            avatar.clothingType,
            avatar.clothingColour
        );
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
        else if(user.x >= this.gridSize) user.x = this.gridSize-1;
        if(user.y < 0) user.y = 0;
        else if(user.y >= this.gridSize) user.y = this.gridSize-1;
        this.users.set(sessionId, user);
    }
}

defineTypes(State, {
    users: {map: User},
    gridSize: "number"
});

class ClassRoom extends Room {
    maxClients = 20;
    gridSize = 14;

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
        console.log("state " + this.state);
        this.onMessage("chat", (client, message) => {
            console.log(`chat from ${client.sessionId} saying ${message}`);
            const user = this.state.users.get(client.sessionId);
            this.broadcast("chat", {
                userId: user.userId,
                username: user.username,
                chatColour : user?.chatColour ?? "black", //A fallback chat colour
                content: message,
                sentAt: new Date()
            });
        });
        this.onMessage("move", (client, message) => {
            const { deltaX, deltaY } = message;
            this.state.moveUser(client.sessionId, deltaX, deltaY);
        });
        console.log("ClassRoom created successfully ");
    }

    // consider making this async and just throw new error
    async onAuth(client, options, req) {
        console.log(client.sessionId + " is in auth with options " + JSON.stringify(options) + " req session " + JSON.stringify(req.session) );
        console.log(req.session.userId);
        // use a promise so that we can have custom rejections letting the user know why they failed to join
        return await new Promise(async (resolve, reject) => {
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
            resolve({ userId: user._id, username: user.username, email: user.email, avatar: user.avatar });
        });
    }

    onJoin(client, options, auth) {
        console.log(client.sessionId + ' is joining ' + this.classId + ' with options ' + JSON.stringify(options) + ' auth ' + JSON.stringify(auth) );
        const { userId, username, email, avatar } = auth;
        // is this not already a string? mongodb holds these as strings I beleive
        const userIdStr = userId.toString();
        //const isOwner = userId === this.metadata.owner;
        // assign userful information to the client
        // we carry the name, id and if they are the owner of the room
        //client.userData = { userId, name, isOwner }
        const sessionId = client.sessionId;
        const user = { userId: userIdStr, username, email, avatar };
        console.log(this.state);
        this.state.addUser(sessionId, user);
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