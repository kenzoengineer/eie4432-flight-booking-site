// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import express from "express";
import client from "../dbclient.js";
import { ObjectId } from "mongodb";

const route = express.Router();
const dbName = process.env.DB;
const collectionName = "transactions";

/*
Transaction Schema:
  {
    user: User._id,
    flight: Flight._id,
    seat: Number,
    price: Number,
    date: Date,
  }
*/

// GET_ALL_TRANSACTIONS
route.get("/", async (req, res) => {
    const transactions = client.db(dbName).collection(collectionName);
    // return all transactions, but include the user name and flight destination
    const result = await transactions
        .aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $lookup: {
                    from: "flights",
                    localField: "flight",
                    foreignField: "_id",
                    as: "flight",
                },
            },
            {
                $unwind: "$user",
            },
            {
                $unwind: "$flight",
            },
            {
                $project: {
                    user: "$user.username",
                    flight: {
                        dest: 1,
                        date: 1,
                        duration: 1,
                        stops: 1,
                        price: 1,
                        first_class_price: 1,
                    },
                    seat_name: 1,
                    price: 1,
                    date: 1,
                },
            },
        ])
        .toArray();
    res.status(200).json(result);
});

// GET_USER_TRANSACTIONS
route.get("/:id", async (req, res) => {
    const transactions = client.db(dbName).collection(collectionName);
    const result = await transactions
        .aggregate([
            {
                $match: { user: new ObjectId(req.params.id) },
            },
            {
                $lookup: {
                    from: "flights",
                    localField: "flight",
                    foreignField: "_id",
                    as: "flight",
                },
            },
            {
                $unwind: "$flight",
            },
            {
                $project: {
                    flight: {
                        dest: 1,
                        date: 1,
                        duration: 1,
                        stops: 1,
                        price: 1,
                        first_class_price: 1,
                    },
                    seat_name: 1,
                    price: 1,
                    date: 1,
                },
            },
        ])
        .toArray();
    res.status(200).json(result);
});

// CREATE_TRANSACTION
route.post("/", async (req, res) => {
    const transactions = client.db(dbName).collection(collectionName);
    if (!req.body)
        return res
            .status(400)
            .json({ message: "Transaction data is required" });
    const newTransaction = req.body;
    newTransaction.date = new Date();
    newTransaction.user = new ObjectId(newTransaction.user);
    newTransaction.flight = new ObjectId(newTransaction.flight);
    const result = await transactions.insertOne(newTransaction);
    if (!result.acknowledged) throw new Error("Unable to create transaction");

    //update sold count
    const flights = client.db(dbName).collection("flights");
    const updateFlight = await flights.updateOne(
        { _id: newTransaction.flight },
        { $inc: { sold: 1 } }
    );
    if (!updateFlight.acknowledged) throw new Error("Unable to update flight");
    //update occupied seat
    const seats = client.db(dbName).collection("seats");
    const updateSeat = await seats.updateOne(
        { _id: new ObjectId(newTransaction.seat) },
        { $set: { occupied: newTransaction.user } }
    );
    if (!updateSeat.acknowledged) throw new Error("Unable to update seat");

    res.status(200).json(newTransaction);
});

export default route;
