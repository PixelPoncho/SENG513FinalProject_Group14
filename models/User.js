const {EntitySchema} = require("typeorm");

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
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar"
        }
    },
    relations: {
        classrooms: {
            target: "Classroom",
            type:"many-to-many",
            joinTable: true
        }
    }

});

module.exports = User;