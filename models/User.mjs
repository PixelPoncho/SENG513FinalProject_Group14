import {EntitySchema} from "typeorm";

const User = new EntitySchema({
    name: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        email:  {
            type: "varchar"
        },
        password: {
            type: "varchar"
        }
    }
});

export default User;