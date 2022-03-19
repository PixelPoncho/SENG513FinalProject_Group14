import User from "./models/User.mjs";
import Classroom from "./models/Classroom.mjs";
import {UserRepoPromise, ClassroomRepoPromise} from "./db.mjs";

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
