const mongoose = require("mongoose");
const UserData = require("./schemas/userSchema");
const ClassRoomData = require("./schemas/classRoomSchema");

mongoose.connect("mongodb://localhost:27017/seng513", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

exports.loginUser = async (loginData) => {
    const user = await UserData.findOne({ username: loginData.username }).populate("ownedClassRooms").populate("visitedClassRooms").populate("bannedClassRooms");
    if(!user) return { error: "Invalid username" };
    if(loginData.password !== user.password) return { error: "Invalid password" };
    return { user };
};

exports.createUser = async (userData) => {
    const user = new UserData(userData);
	const otherUser = await UserData.findOne({ username: userData.username });
	if(otherUser) return { error: "Username exists" };
	await user.save();
    return { user: user };
};
exports.getUserById = async (userId) => {
    return await UserData.findById(userId).populate("ownedClassRooms").populate("visitedClassRooms").populate("bannedClassRooms");
};

exports.createClassRoom = async (userId, classRoomData) => {
    const user = await UserData.findById(userId).populate("ownedClassRooms");
	const existingRoom = user.ownedClassRooms.find(el => el.name === classRoomData.name);
	if(existingRoom) return { error: "Invalid room name" };
	const classRoom = new ClassRoomData({ ...classRoomData, active: false });
	await classRoom.save();
    return { classRoom };
};

exports.deleteClassRoom = async (userId, roomId) => {
    const user = await UserData.findById(userId).populate("ownedClassRooms");
    const room = user.ownedClassRooms.find(el => el._id === roomId);
    if(!room) return { error: "Invalid room" };
    await UserData.updateMany({}, {
        $pull: { ownedClassRooms: roomId, visitedClassRooms: roomId , bannedClassRooms: roomId }
    }, { multi: true });
    const deletedRoom = await ClassRoomData.findByIdAndDelete(roomId);
    return { deletedRoom };
};
