import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";

const app = express();
app.use(express.json());

const gameServer = new Server({
    server: createServer(app)
});

gameServer.listen(3000);
console.log("Listening on ws://localhost:3000");