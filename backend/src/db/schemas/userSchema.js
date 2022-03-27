const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	username: String,
	password: Number,
    ownedClassRooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "ClassRoomData",
        },
    ],
    visitedClassRooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "ClassRoomData",
        },
    ],
    bannedClassRooms: [
        {
            type: Schema.Types.ObjectId,
            ref: "ClassRoomData",
        },
    ],
});

module.exports = mongoose.model("UserData", UserSchema);