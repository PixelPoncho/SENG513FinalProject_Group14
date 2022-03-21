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
        const { classId, className, teacher } = options;
        this.setMetadata({ classId, className, teacher });
        this.setState(new State());
        this.onMessage("chat", (client, message) => {
            console.log(`chat from ${client.sessionId} saying ${message}`);
        });

        // this.setSimulationInterval((deltaTime) => this.update(deltaTime));
    }

    // update(deltaTime) {
    //     // implement your physics or world updates here!
    //     // this is a good place to update the room state
    // }

    // use this to validate that the client is selecting something
    // that it should actually have access to
    onAuth(client, options, req) {
        return true;
    }

    onJoin(client, options, auth) {
        const { name } = options;
        this.state.addUser(client.sessionId, name);
    }

    onLeave(client) {
        this.state.removeUser(client.sessionId);
    }

    onDispose() {
        console.log('Nobody is here, learn to shut this down');
    }
}

module.exports = { User, State, ClassRoom };