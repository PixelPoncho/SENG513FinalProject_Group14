import express from "express";

const app = express();
const port = 3001;

app.get("/api/", (req, res) => {
    res.send("Hello world from the server side");
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})