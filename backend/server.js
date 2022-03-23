// creating express server
const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
// session handling
const session = require("express-session");
const cookieParser = require("cookie-parser");
// colyseus
const { Server } = require("colyseus");
// custom imports
const { ClassRoom } = require("./src/colyseus/schemas");
const catchAsync = require("./src/utils/catchAsync");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret' }));

const gameServer = new Server({
	server: server,
	express: app
});
// gameServer.define("classroom", ClassRoom).filterBy(["classId"]);
gameServer.define("classroom", ClassRoom);

// base pages
app.get("/", (req, res) => {
	// this should be the user login page
	// we will handle user loging in here
	res.sendFile(__dirname + "/public/fakeLogin/login.html");
});
app.get("/home", (req, res) => {
	// return the home page for the user
	// we should send them the information they need like
	// after getting this post another endpoint to get
	// the rooms the user can join or can start
	// we probably wont need this since we will just be 
	// handling routing on the front end
	// depends how it gets laid out
});

// handling users
const checkUserLogin = (req, res, next) => {
	if(!req.session.isLoggedIn) {
		res.send("You are not logged in!");
	}
	next();
};
app.post("/users/login", (req, res) => {
	const { username, password } = req.body;
	if(!username || !password) {
		res.json({ error: "Specify both username and password" });
	}
	// validate the user
	req.session.isLoggedIn = true;
	req.session.name = username;
	// more info here
	res.redirect("/home");
});
app.post("/users/createUser", (req, res) => {
	// create a new user account
	// make sure the username is unique
	res.json({ error, response });
});

// handle rooms
app.get("/rooms/startRoom/:roomId", checkUserLogin, (req, res) => {
	const roomId = req.params.roomId;
	// make sure the room is not currently active
	// send the user with these query params 
	res.redirect(`/rooms/${roomId}?isNew=true&roomId=${roomId}`);
});
app.get("/rooms/joinRoom/:roomId", checkUserLogin, (req, res) => {
	const roomId = req.params.roomId;
	// make sure the room is currently active
	// send the user the query parameters needed
	res.redirect(`/rooms/${roomId}?isNew=false&roomId=${roomId}`);
});
app.get("/rooms/:roomId", checkUserLogin, (req, res) => {
	// send them to the classroom, this could also work as just a post request to get data
	// depends if we use react router and have a totally distinct front end
	res.sendFile(__dirname + "/public/fakeClassroom/classroom.html");
});
app.post("/rooms/roomStatus/:roomId", checkUserLogin, (req, res) => {
	const roomId = req.params.roomId;
	// check if this room is online
	// this will be used if we want to add a user to the listed room
});
app.post("/rooms/userRooms", checkUserLogin, (req, res) => {
	// query the database for this users rooms
	res.json({ userRooms });
});
app.post("/rooms/createRoom", checkUserLogin, (req, res) => {
	// handle the creation of a new classroom here
	const {} = req.body;
	// save room to the database
});

gameServer.listen(3000);
console.log("Listening on http://localhost:3000");
