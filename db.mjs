import typeorm from "typeorm";
import sqlite3 from "sqlite3";

const DataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    driver: sqlite3,
    synchronize: true,
    entities: [
        "./models/*.mjs"
    ]
});

const db = DataSource.initialize()

const UserRepoPromise = new Promise(async resolve => {
   const connection = await db;
   const repo = connection.getRepository("User");
   resolve(repo);
});

const ClassroomRepoPromise = new Promise(async resolve => {
   const connection = await db;
   const repo = connection.getRepository("Classroom");
   resolve(repo);
});

export {
    db,
    UserRepoPromise,
    ClassroomRepoPromise
};