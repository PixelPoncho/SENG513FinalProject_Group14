const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassRoomSchema = new Schema({
	name: String,
    active: Boolean,
    admin: {
        type: Schema.Types.ObjectId,
        ref: "UserData",  
    },
});

module.exports = mongoose.model("ClassRoomData", ClassRoomSchema);