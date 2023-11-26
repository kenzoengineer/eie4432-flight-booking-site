import express from "express";
import client from "../dbclient.js";
import { ObjectId } from "mongodb";

const route = express.Router();
const dbName = process.env.DB;
const collectionName = "seats";

/*
Seat Schema:
  {
    flight_id: Flight._id,
    index: Number,
    occupied: User._id,
    first_class: Boolean,
  }
*/

// UPDATE_FIRST_CLASS
route.patch("/", async (req, res, next) => {
  const updateSeats = req.body.seats;
  if (!updateSeats)
    return res.status(400).json({ message: "Seat data is required" });
  const seats = client.db(dbName).collection(collectionName);
  const seatIds = updateSeats.map((seat) => new ObjectId(seat));
  // update all seats in updateSeats by toggling first_class
  const result = await seats.updateMany({ _id: { $in: seatIds } }, [
    { $set: { first_class: { $not: "$first_class" } } },
  ]);
  
  if (!result.acknowledged) {
    next(new Error("Unable to update seats"));
    return;
  }

    res.status(200).json({ message: "Seat updated successfully" });
});

export default route;
