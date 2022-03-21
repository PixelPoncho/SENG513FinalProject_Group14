const { Server } = require("colyseus");
const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const { ClassRoom } = require("./colyseusObjects/schemas");
const { startClassRoom } = require("./colyseusObjects/setupFunctions.js");

const classRooms = [
    {
        classId: "room1",
        className: "Science10",
        teacher: "jane@school.com" 
    },
    {
        classId: "room2",
        className: "Science20",
        teacher: "jane@school.com" 
    },
    {
        classId: "room3",
        className: "Science30",
        teacher: "jane@school.com" 
    }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gameServer = new Server({
    server,
});
gameServer.define('classroom', ClassRoom).filterBy(['classId']);


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname+"/public/fakeLogin/login.html");
});

app.get('/join', (req, res) => {
    res.sendFile(__dirname+"/public/fakeJoin/join.html");
});

app.get('/room/:roomId', (req, res) => {
    res.sendFile(__dirname+"/public/fakeClassroom/classroom.html");
});

app.post('/startClassRoom/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    const room = startClassRoom(classRooms.find(classRoom => classRoom.classId === roomId));
    console.log(`started room ${roomId}: ${room}`);
    res.redirect(`/room/${roomId}`);
});

gameServer.listen(3000);
console.log("Listening on http://localhost:3000");