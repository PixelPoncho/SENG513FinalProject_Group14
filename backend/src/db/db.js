const mongoose = require("mongoose");
const UserData = require("./schemas/userSchema");
const ClassRoomData = require("./schemas/classRoomSchema");

mongoose.connect("mongodb://localhost:27017/seng513", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

exports.loginUser = async (loginData) => {
    const user = await UserData.findOne({ email: loginData.email }).populate("ownedClassRooms visitedClassRooms bannedClassRooms");
    if(!user) return { error: "Invalid email" };
    if(loginData.password !== user.password) return { error: "Invalid password" };
    return { user };
};

exports.createUser = async (userData) => {
    const defaultAvatar = {
        skin: "Tanned",
        topType: "LongHairStraight",
        hairColour: "Auburn",
        clothingType: "BlazerShirt",
        clothingColour: "#1ABC9C",
    };
    userData = { ...userData, avatar: defaultAvatar, chatColour: "black" };
    const user = new UserData(userData);
    let otherUser = await UserData.findOne({ email: userData.email });
    if(otherUser) {
        return { error: "email exists" };
    }
    // otherUser = await UserData.findOne({ username: userData.username });
    // if(otherUser) {
    //     return { error: "username exists" };
    // }
    await user.save();
    return { user: user };
};
const getUserById = async (userId) => {
    return UserData.findById(userId).populate("ownedClassRooms visitedClassRooms bannedClassRooms avatar");
};
exports.getUserById = getUserById;

exports.updateUser = async (userId, userData) => {
    const user = await getUserById(userId);
    if(!user) return { error: "No user found" };
    if(userData.username) user.username = userData.username;
    if(userData.chatColour) user.chatColour = userData.chatColour;
    if(userData.avatar) {
        for(const [key, value] of Object.entries(userData.avatar)) {
            if(value) {
                user.avatar[key] = value;
            }
        }
    }

    await user.save();
    return { user };
};

// create a delete user that goes through and deletes all the owned classrooms that user has 
// the delete the user element from the database

// exports.getUserByIdMinified = async (userId) => await UserData.findById(userId);

exports.getClassRoomById = async (roomId) => await ClassRoomData.findById(roomId);

exports.activateClassRoom = async (roomId) => {
    const classRoom = await ClassRoomData.findById(roomId).populate("owner");
    if(!classRoom) return { error: "classroom does not exist" };
    if(classRoom.active === true) return { error: "classroom already active" };
    classRoom.active = true;
    await classRoom.save();
    return { classRoom };
};

exports.deactivateClassRoom = async (roomId) => {
    const classRoom = await ClassRoomData.findById(roomId);
    if(!classRoom) return { error: "classroom does not exist" };
    if(classRoom.active === false) return { error: "classroom already inactive" };
    classRoom.active = false;
    await classRoom.save();
    return { classRoom };
};

exports.createClassRoom = async (userId, classRoomData) => {
    const user = await UserData.findById(userId).populate("ownedClassRooms");
    if(!user) return { error: "Invalid userId" };
	const existingRoom = user.ownedClassRooms.find(el => el.name === classRoomData.name);
	if(existingRoom) return { error: "Invalid room name" };
	const classRoom = new ClassRoomData({ ...classRoomData, active: false });
    classRoom.owner = user;
	await classRoom.save()
        .then(async (result) => {
            user.ownedClassRooms.push(classRoom);
            await user.save();
        }).catch((error) => {
            return { error };
        });
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
