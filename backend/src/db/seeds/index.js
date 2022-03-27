// const mongoose = require("mongoose");
// const UserData = require("../schemas/userSchema");
// const ClassRoomData = require("../schemas/classRoomSchema");

// mongoose.connect("mongodb://localhost:27017/seng513", {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
// 	console.log("Database connected");
// });

// const users = [
//     {},
//     {},
//     {},
// ];

// const rooms = [
//     {
//         name: "Room1",
//         owner: 
//     },
//     {},
//     {}
// ];

// const seedDB = async () => {
//     await ClassRoomData.deleteMany({});
// 	await UserData.deleteMany({});
//     for(let user : users) {

//     }
// 	for (let i = 0; i < 50; i++) {
// 		const location = sample(cities);
// 		const price = Math.floor(Math.random() * 20) + 10;
// 		const camp = new Campground({
// 			location: `${location.city}, ${location.state}`,
// 			title: `${sample(descriptors)} ${sample(places)}`,
// 			image: "https://source.unsplash.com/collection/483251",
// 			description:
// 				"Temp text loremalksdfjl asdkdkfkjlas;dkfj aksldjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjf; askldjflkasdjflk klsadjf lkasdjfklaslkd fjlkasd jlk;sadj fl;ksadjf lk;dasjf lk;adslk;f jiolaewjrlkasdklfjkslvnlaks djhflkj as klsdaf jwowo thsi hsi asljkdflask;djflksajdfl;a",
// 			price,
// 		});
// 		await camp.save();
// 	}
// };

// seedDB().then(() => {
// 	mongoose.connection.close();
// });