const { EntitySchema } = require("typeorm");

const Classroom = new EntitySchema({
    name: "Classroom",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        invite_code: {
            type: "varchar",
            generated: "uuid" // WHAT WILL THIS DO?
        }
    },
    relations: {
        teacher: {
            target: "User",
            type: "many-to-one"
        }
    }
});

module.exports = Classroom;