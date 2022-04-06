const mongoose = require("mongoose");
const UserData = require("../schemas/userSchema");
const ClassRoomData = require("../schemas/classRoomSchema");

mongoose.connect("mongodb://localhost:27017/seng513", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const printClassrooms = async () => {
    console.log("CLASSROOMS");
    const classrooms = await ClassRoomData.find({});
    if(classrooms.length === 0) console.log("No classrooms");
    else classrooms.forEach(console.logjson);
};

const printUsers = async () => {
    console.log("USERS");
    const users = await UserData.find({});
    if(users.length === 0) console.log("No users");
    else users.forEach(console.logjson);
};

const showStuff = async () => {
    await printClassrooms();
    console.log("\n");
    await printUsers();
    mongoose.connection.close();
    return;
};
showStuff();