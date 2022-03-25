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
const { UserRepoPromise, ClassroomRepoPromise } = require("../db.js");

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
app.post("/users/login", async (req, res) => {
	const { email, password } = req.body;
	if(!email || !password) {
		res.json({ error: "Specify both email and password" });
		return;
	}

	const UserRepo = await UserRepoPromise;
	const user = await UserRepo.findOneBy({email});

	// Obviously this isn't meant to be a secure login, we just need something
	if(user && user.password === password) {
		// validate the user
		req.session.isLoggedIn = true;
		req.session.userId = user.id;
		req.session.name = user.name;
		res.json({user});
	}
	else {
		req.session.isLoggedIn = false;
		req.session.name = null;
		res.json({error: "Email/password combination was incorrect"});
	}
});
app.post("/users/createUser", async (req, res) => {
	const {name, email, password} = req.body;
	const UserRepo = await UserRepoPromise;

	try {
		const user = await UserRepo.save({name, email, password});
		res.json({user});
	}
	catch(ex) {
		res.json({user: null});
	}
});
app.get("/user", checkUserLogin, async (req, res) => {
	const id = new String(req.session?.userId);
	const UserRepo = await UserRepoPromise;
	const user = await UserRepo.find({
		where: {id},
		relations: {
			classrooms: true
		}
	});
	res.json(user);
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
app.post("/rooms/createRoom", checkUserLogin, async (req, res) => {
	// handle the creation of a new classroom here
	const { name } = req.body;
	const ClassroomRepo = await ClassroomRepoPromise;

	try {
		const classroom = await ClassroomRepo.save({name});
		res.json({classroom});
	}
	catch (e) {
		res.json({classroom: null});
	}
});

gameServer.listen(3000);
console.log("Listening on http://localhost:3000");
