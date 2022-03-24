const User = require("./models/User.js");
const Classroom = require("./models/Classroom.js");
const {UserRepoPromise, ClassroomRepoPromise} = require("./db.js");

(async function() {
    const UserRepo = await UserRepoPromise;
    const ClassroomRepo = await ClassroomRepoPromise;

    const user = {
        name: "bob",
        email: "bob@example.net",
        password: "password"
    };
    await UserRepo.save(user);

    const classroom = {
        name: "seng 513",
        teacher: user.id
    }

    await ClassroomRepo.save(classroom);
    console.log(classroom);
})();
