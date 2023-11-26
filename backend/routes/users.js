import express from "express";
import client from "../dbclient.js";
import bcrypt from "bcrypt";
import { createLog } from "../utils.js";
import { ObjectId } from "mongodb";

const route = express.Router();
const dbName = process.env.DB;
/*
User Schema:
  {
    id: Number,             
    username: String,
    password: String,
    email: String,
    gender: String,
    birthdate: Date,
    profile_pic: String,
    messages: Array<String>
  },
*/

// REGISTER_USER
route.post("/register", async (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ message: "User data is required" });
  //check username and email
  const users = client.db(dbName).collection("users");
  const searchResult = await users.findOne({
    $or: [{ username: user.username }, { email: user.email }],
  });
  if (searchResult) {
    if (searchResult.username == user.username) {
      res.status(400).json({ message: "Username already exists" });
    } else {
      res.status(400).json({ message: "Email already exists" });
    }
    return;
  }
  //insert user to database, hash password
  user.password = await bcrypt.hash(user.password, 10);
  user.messages = [];
  const result = await users.insertOne(user);
  if (result.acknowledged) {
    res.status(200).json({ message: "User registered successfully" });
  } else {
    res.status(500).json({ message: "Unable to register user" });
  }
});

// LOGIN_USER
route.post("/login", async (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ message: "User data is required" });
  //check username and password
  const users = client.db(dbName).collection("users");
  const result = await users.findOne({ username: user.username });
  if (result) {
    const match = await bcrypt.compare(user.password, result.password);
    if (match) {
      await createLog(result._id, `User ${user.username} logged in`);
      const clearMessages = await users.updateOne(
        { _id: new ObjectId(result._id) },
        { $set: { messages: [] } }
      );
      if (!clearMessages.acknowledged)
        throw new Error("Unable to clear messages");
      res.status(200).json({ userId: result._id, messages: result.messages });
    } else {
      await createLog(result._id, `User ${user.username} attemped to log in`);
      res.status(400).json({ message: "Incorrect password" });
    }
  } else {
    res.status(400).json({ message: "Incorrect username" });
  }
});

//UPDATE_USER
route.patch("/:id", async (req, res) => {
  const params = req.body;

  if (!params)
    return res.status(400).json({ message: "User data is required" });
  const users = client.db(dbName).collection("users");

  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  const id = new ObjectId(req.params.id);

  const user = await users.findOne({ _id: id });
  if (!user) return res.status(400).json({ message: "User not found" });

  // can't modify username if it already exists
  if (params.username && user.username == params.username) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const result = await users.updateOne({ _id: id }, { $set: params });

  if (result.modifiedCount == 1) {
    const printUsername = params.username ? params.username : user.username;
    await createLog(
      user._id,
      `User ${printUsername} updated profile, changed ${Object.keys(params)}`
    );
    res.status(200).json({ message: "User updated successfully" });
  } else {
    res.status(500).json({ message: "Unable to update user" });
  }
});

export default route;
