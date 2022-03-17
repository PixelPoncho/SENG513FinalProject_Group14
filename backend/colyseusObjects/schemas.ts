import http from "http";
import { Room, Client } from "colyseus";
import { Schema, MapSchema } from "@colyseus/schema";

export class User extends Schema {
    x: number;
    y: number;
    name: string;
    constructor(name: string, x: number = 0, y: number = 0) {
        super();
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

export class State extends Schema {
    users: MapSchema<User>;
    constructor() {
        super();
        this.users = new MapSchema<User>();
    }

    addUser(sessionId: string, name: string) {
        this.users.set(sessionId, new User(name));
    }
    
    removeUser(sessionId: string) {
        this.users.delete(sessionId);
    }

    moveUser(sessionId: string, x: number, y: number) {
        const user = this.users.get(sessionId);
        user.x = x;
        user.y = y
    }
}

export class ClassRoom extends Room<State> {
    maxClients = 20;

    onCreate(options: any) {
        console.log("ClassRoom created ", options);
        this.setMetadata({ teacher: "TestTeacher"});
        this.setState(new State());

        this.onMessage("chat", (client, message) => {
            console.log(`chat from ${client.sessionId} saying ${message}`);
        });

        // this.setSimulationInterval((deltaTime) => this.update(deltaTime));
    }

    // update(deltaTime: number) {
    //     // implement your physics or world updates here!
    //     // this is a good place to update the room state
    // }

    // use this to validate that the client is selecting something
    // that it should actually have access to
    onAuth(client: Client, options: any, req: http.IncomingMessage) {
        return true;
    }

    onJoin(client: Client, options: any, auth: any) {
        const { name } = options;
        this.state.addUser(client.sessionId, name);
    }

    onLeave(client: Client) {
        this.state.removeUser(client.sessionId);
    }

    onDispose() {
        console.log('Nobody is here, learn to shut this down');
    }
}