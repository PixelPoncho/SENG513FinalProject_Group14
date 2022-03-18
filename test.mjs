import User from "./models/User.mjs";
import {UserRepoPromise} from "./db.mjs";

(async function() {
    const UserRepo = await UserRepoPromise;

    const user = {
        name: "bob",
        email: "bob@example.net",
        password: "password"
    };
    await UserRepo.save(user);

    const allUsers = await UserRepo.find();
    console.log(allUsers);
})();
