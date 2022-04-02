const { Room } = require("colyseus");
const { Schema, MapSchema } = require("@colyseus/schema");
const { getUserById, activateClassRoom, deactivateClassRoom, getClassRoomById } = require("../db/db");

class User extends Schema {
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }
}

class State extends Schema {
    constructor() {
        super();
        this.users = new MapSchema();
    }

    addUser(sessionId) {
        this.users.set(sessionId, new User());
    }
    
    removeUser(sessionId) {
        this.users.delete(sessionId);
    }

    moveUser(sessionId, x, y) {
        const user = this.users.get(sessionId);
        user.x = x;
        user.y = y
    }
}

class ClassRoom extends Room {
    maxClients = 20;

    // anyone will be able to start a room, they just wont have admin in that room
    // the roomId will need to be unique since the filterby would just sent them to existing room
    // this protects us from the issue of multiple classroom instances
    // if they just make up a roomId then disconnect up front
    async onCreate(options) {
        console.log("Starting ClassRoom with options ", options);
        // get the roomId from the user set options
        const { roomId } = options;
        this.roomId = roomId;
        // get the classroom the user wants to start
        // if it is a real classroom and not active start it
        const { error, classRoom } = await activateClassRoom(roomId);
        if(error) {
            console.log(error);
            this.disconnect();
            return;
        }
        this.setMetadata({ roomId, className: classRoom.name, owner: classRoom.owner._id });
        this.setState(new State());
        this.onMessage("chat", (client, message) => {
            console.log(`chat from ${client.sessionId} saying ${message}`);
            this.broadcast("messages", client.name, message);
        });
        console.log("ClassRoom created successfully ");
    }

    // consider making this async and just throw new error
    onAuth(client, options, req) {
        // use a promise so that we can have custom rejections letting the user know why they failed to join
        return new Promise((resolve, reject) => {
            const { roomId } = options;
            // make sure routing works and users are going to the correct rooms
            if(roomId !== this.roomId) reject({ error: "Request room doesnt match this room id" });
            // find the user
            if(!req.session.isLoggedIn || !req.session.userId) reject({ error: "Not logged in" });
            const user = getUserById(req.session.userId);
            if(!user) reject({ errror: "Invalid user" });
            // make sure the user isint banned from this room
            if(user.bannedRooms.includes(this.roomId)) reject({ error: "User banned from this room" });
            resolve({ userId: user._id, name: user.name });
        });
    }

    onJoin(client, options, auth) {
        const { userId, name } = auth;
        const isOwner = userId === this.metadata.owner;
        // assign userful information to the client
        // we carry the name, id and if they are the owner of the room
        client.userData = { userId, name, isOwner }
        this.state.addUser(client.sessionId);
    }

    onLeave(client) {
        this.state.removeUser(client.sessionId);
    }

    async onDispose() {
        console.log(`shutting down room ${this.roomId}`);
        const { error, classRoom } = await deactivateClassRoom(this.roomId);
        if(error) console.log(`${this.roomId} - ${error}`);
    }
}

module.exports = { User, State, ClassRoom };