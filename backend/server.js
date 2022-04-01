// creating express server
const express = require("express");
const { createServer } = require("http");
// session handling
const session = require("express-session");
const cookieParser = require("cookie-parser");
// colyseus
const { Server } = require("colyseus");
// custom imports
const { ClassRoom } = require("./src/colyseus/schemas");
const catchAsync = require("./src/utils/catchAsync");
// database
const { userCreateSchema, userLoginSchema, classRoomCreateSchema } = require("./src/db/validations/schemas");
const { createUser, getUserById, loginUser, createClassRoom } = require("./src/db/db");

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret' }));

const gameServer = new Server({
	server: server,
	express: app
});
// gameServer.define("classroom", ClassRoom).filterBy(["classId"]);
gameServer.define("classroom", ClassRoom).filterBy(['roomId']);

// middleware
const checkUserLogin = (req, res, next) => {
	if(!req.session.isLoggedIn || !req.session.userId || !req.session.name) {
		res.send("You are not logged in!");
	}
	next();
};
const validateUserCreate = (req, res, next) => {
	const { error } = userCreateSchema.validate(req.body);
	if(error) {
		res.status(400).json({ error: "Invalid resquest data" })
	} 
	next();
};
const validateUserLogin = (req, res, next) => {
	const { error } = userLoginSchema.validate(req.body);
	if(error) {
		res.status(400).json({ error: "Invalid resquest data" })
	}
	next();
};
const validateClassRoomCreate = (req, res, next) => {
	const { error } = classRoomCreateSchema.validate(req.body);
	if(error) {
		res.status(400).json({ error: "Invalid resquest data" })
	} 
	next();
};

// user routes
app.post(
	"/users/login",
	validateUserLogin,
	catchAsync(async (req, res) => {
		const { error, user } = loginUser(req.body.user);
		if(error) res.status(400).json({ error });
		req.session.isLoggedIn = true;
		req.session.userId = user._id;
		req.session.name = user.name;
		res.json({ user });
	})
);

app.post(
	"/users/createUser",
	validateUserCreate,
	catchAsync(async (req, res) => {
		const { error, user } = await createUser(req.body.user);
		if(error) {
			res.status(400).json({ error });
		}
		else {
			res.json({ user });
		}
	})
);

app.post(
	"/users/getUser",
	checkUserLogin,
	catchAsync(async (req, res) => {
		const user = await getUserById(req.session.userId);
		if(!user) res.status(400).json({ error: "Invalid user" });
		res.json({ user });
	})
);

// class room routes
app.post(
	"/rooms/createRoom",
	checkUserLogin,
	validateClassRoomCreate, 
	catchAsync(async (req, res) => {
		const { error, classRoom } = createClassRoom(req.session.userId, req.body.classRoom);
		if(error) res.status(400).json({ error });
		res.json({ classRoom });
	})
);

app.post(
	"/rooms/deleteRoom/:roomId",
	checkUserLogin,
	catchAsync(async (req, res) => {
		const { roomId } = req.params;
		const { error, deletedRoom } = deletedRoom(req.session.userId, roomId);
		if(error) res.status(400).json({ error });
		res.json({ deletedRoom })
	})
);

gameServer.listen(3000);
console.log("Listening on http://localhost:3000");
