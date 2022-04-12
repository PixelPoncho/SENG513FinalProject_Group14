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

const users = [
    {
        username: "joe",
        email: "joe@test.com",
        password: "joe",
        chatColor: "black",
        avatar: {
            skin: "blue",
            topType: "shirt",
            hairColour: "brown",
            clothingType: "worn",
            clothingColour: "skin",
        }
    },
    {
        username: "bob",
        email: "bob@test.com",
        password: "bob",
        chatColor: "black",
        avatar: {
            skin: "blue",
            topType: "shirt",
            hairColour: "brown",
            clothingType: "worn",
            clothingColour: "skin",
        }
    },
    {
        username: "tim",
        email: "tim@test.com",
        password: "tim",
        chatColor: "black",
        avatar: {
            skin: "blue",
            topType: "shirt",
            hairColour: "brown",
            clothingType: "worn",
            clothingColour: "skin",
        }
    },
];

const rooms = [
    {
        name: "Joe's Room",
        active: false,
        owner: "joe@test.com",
    },
    {
        name: "Bob's Room",
        active: false,
        owner: "bob@test.com",
    },
    {
        name: "Tim's Room",
        active: false,
        owner: "tim@test.com",
    }
];

const seedDB = async () => {
    await ClassRoomData.deleteMany({});
	await UserData.deleteMany({});

    for(let user in users) {
        console.log(users[user]);
        let tempUser = new UserData(users[user]);
        await tempUser.save();
    }
    for(let room in rooms) {
        console.log(rooms[room]);
        let tempUser = await UserData.findOne({ email: rooms[room].owner });
        if(!tempUser) {
            console.log('Failed to create room');
            continue;
        }
        rooms[room].owner = tempUser._id;
        let tempRoom = new ClassRoomData(rooms[room]);
        await tempRoom.save();
        tempUser.ownedClassRooms.push(tempRoom);
        await tempUser.save();
    }
};

seedDB().then(() => {
	mongoose.connection.close();
});