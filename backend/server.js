const { Server } = require("colyseus");
const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);

const { instantiateClassRoom } = require("./utils/setupFunctions.js");

app.use(express.json());

const gameServer = new Server({
    server,
});

app.get('/', (req, res) => {
    // const reservation = instantiateClassRoom({ 
    //     className: "Science10", 
    //     teacher: "TestTeacher", 
    //     classId: "testclassid" 
    // });
    res.sendFile(__dirname, "/public/index.html");
});

server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});

gameServer.listen(3001);
console.log("Listening on ws://localhost:3001");