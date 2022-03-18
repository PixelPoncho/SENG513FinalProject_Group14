const { Server } = require("colyseus");
const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);

const classRooms = [
    {
        id_: "room1",
        name: "Science10",
        teacher: "jane@school.com" 
    },
    {
        id_: "room2",
        name: "Science20",
        teacher: "jane@school.com" 
    },
    {
        id_: "room3",
        name: "Science30",
        teacher: "jane@school.com" 
    }
];

const { instantiateClassRoom } = require("./utils/setupFunctions.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gameServer = new Server({
    server,
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname+"/public/fakeLogin/index.html");
});

app.get('/join', (req, res) => {
    res.sendFile(__dirname+"/public/fakeJoin/index.html");
});

app.get('/room/:roomId', (req, res) => {
    res.sendFile(__dirname+"/public/fakeClassroom/index.html");
});

app.post('/startClassRoom/:roomId', (req, res) => {
    const roomId = req.params.id;
    instantiateClassRoom(roomId);
    res.redirect(`/rooms/${roomId}`);
});

gameServer.listen(3000);
console.log("Listening on http://localhost:3000");