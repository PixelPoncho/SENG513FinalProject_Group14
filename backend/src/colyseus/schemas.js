const { Room } = require("colyseus");
const { Schema, MapSchema } = require("@colyseus/schema");

class User extends Schema {
    constructor(name, x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

class State extends Schema {
    constructor() {
        super();
        this.users = new MapSchema();
    }

    addUser(sessionId, name) {
        this.users.set(sessionId, new User(name));
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

    onCreate(options) {
        console.log("ClassRoom created ", options);
        const { classId, className, owner } = options;
        this.roomId = classId;
        this.setMetadata({ className, owner });
        this.setState(new State());
        this.onMessage("chat", (client, message) => {
            console.log(`chat from ${client.sessionId} saying ${message}`);
            this.broadcast("messages", client.name, message);
        });
    }

    onAuth(client, options, req) {
        // make sure this user (in req.session.username) is allowed to join this room
        // this room is specified by this.roomId
        // or just make sure they arent banned I guess depending on how this is handled
        return true;
    }

    onJoin(client, options, auth) {
        // consider handling this differently
        // like using req.session in auth and then changing the auth
        // params to like the options from the database
        const { name } = options;
        this.state.addUser(client.sessionId, name);
    }

    onLeave(client) {
        // save any information we want to make persistent
        this.state.removeUser(client.sessionId);
    }

    onDispose() {
        // this should probably be fine
        console.log('Nobody is here, learn to shut this down');
    }
}

module.exports = { User, State, ClassRoom };