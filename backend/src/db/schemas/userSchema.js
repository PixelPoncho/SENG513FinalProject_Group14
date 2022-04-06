const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,

    avatar: {
        skinColour: String,
        topType: String,
        hairColour: String,
        clothing: String,
        clothingColour: String,
    },

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