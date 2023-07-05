import bodyParser from "body-parser";
import express from "express";
import 'dotenv/config'
const app = express();
import { getUserById, getUsers, createUser, deleteUser, updateUser } from "./queries";
const port = process.env.PORT || 3333;

app.use(bodyParser.json());

app.get("/user/:id", getUserById);
app.get("/users", getUsers);
app.post("/user", createUser);
app.put("/user/:id", updateUser);
app.delete("/user/:id", deleteUser);

app.listen(port, () => {
    console.log("listening on port" + port);
})