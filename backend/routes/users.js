import express from "express";
import client from "../dbclient.js";
import bcrypt from "bcrypt";
import { createLog } from "../utils.js";
import { ObjectId } from "mongodb";
import multer from "multer";

const route = express.Router();
const form = multer();
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

route.get("/:id", async (req, res) => {
  const users = client.db(dbName).collection("users");
  const searchResult = await users.findOne({
    _id: new ObjectId(req.params.id),
  });
  if (searchResult) {
    return res.status(200).json(searchResult);
  }
  res.status(400).json({ message: "not found" });
});

// forgot password route (post), take username and password as input, check username, if correct, update password
route.post("/forgot", form.none(), async (req, res) => {
  const user = req.body;
  if (!user) return res.status(400).json({ message: "User data is required" });
  const users = client.db(dbName).collection("users");
  const result = await users.findOne({ username: user.username });
  if (result) {
    //update password
    user.password = await bcrypt.hash(user.password, 10);
    const updateResult = await users.updateOne(
      { username: user.username },
      { $set: { password: user.password } }
    );
    return res.status(200).json({ message: "Password updated successfully" });
  } else {
    res.status(400).json({ message: "No user with that username" });
  }
}
);

route.get("/admin/:id", async (req, res) => {
    const users = client.db(dbName).collection("users");
    const adminUser = await users.findOne({username: "admin"});
    res.json(adminUser._id.toString() === req.params.id);
})

// REGISTER_USER
route.post("/register", form.none(), async (req, res) => {
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
route.post("/login", form.none(), async (req, res) => {
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
route.patch("/:id", form.none(), async (req, res) => {
  const params = req.body;
    if (!params)
        return res.status(400).json({ message: "User data is required" });

  if (!params)
    return res.status(400).json({ message: "User data is required" });
  const users = client.db(dbName).collection("users");

    params.password = await bcrypt.hash(params.password, 10);

    const id = new ObjectId(req.params.id);

    const user = await users.findOne({ _id: id });
    if (!user) return res.status(400).json({ message: "User not found" });

    // if we have changed the username...
    if (user.username !== params.username) {
        // ...make sure it doesn't exist already
        if (await users.countDocuments({username: params.username})) {
            return res.status(400).json({ message: "Username already exists" });
        }
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
