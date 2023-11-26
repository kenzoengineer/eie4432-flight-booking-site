import express from "express";
import client from "../dbclient.js";
import { ObjectId } from "mongodb";

const route = express.Router();
const dbName = process.env.DB;
const collectionName = "flights";

/*
Flight Schema:
  {
    id: Number,             // e.g. 1
    dest: String,           // e.g. YYZ, NRT, etc.
    date: DateTime,         // e.g. 10-29-2023 3:35AM *SHOULD BE IN UTC!!!!
    duration: Number,       // e.g. 600 *THIS IS IN MINUTES
    stops: String,          // e.g. Non-stop, One Stop
    sold: Number,           // To determine seats sold in O(1),

  },
*/

// GET_ALL_FLIGHT_DATA
route.get("/", async (req, res) => {
  const flights = client.db(dbName).collection(collectionName);
  const result = await flights.find().toArray();
  res.status(200).json(result);
});

// GET_FLIGHT_DATA
route.get("/:id", async (req, res, next) => {
  const flights = client.db(dbName).collection(collectionName);
  const result = await flights.findOne({ _id: new ObjectId(req.params.id) });
  if (!result) {
    next(new Error("Flight not found"));
    return;
  }
  const seats = client.db(dbName).collection("seats");
  const seatResults = await seats
    .aggregate([
      {
        $match: {
          flight_id: result._id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "occupied",
          foreignField: "_id",
          as: "occupied",
        },
      },
      {
        $unwind: {
          path: "$occupied",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          index: 1,
          occupied: "$occupied.username",
          first_class: 1,
        },
      },
    ])
    .toArray();
  console.log(seatResults);

  res.status(200).json({
    flight: result,
    seats: seatResults,
  });
});

// CREATE_FLIGHT
route.post("/", async (req, res, next) => {
  const flights = client.db(dbName).collection(collectionName);
  if (!req.body)
    return res.status(400).json({ message: "Flight data is required" });
  const newFlight = req.body;
  newFlight.sold = 0;

  const result = await flights.insertOne(newFlight);
  if (!result.acknowledged) next(new Error("Unable to create flight"));

  const flightId = new ObjectId(result.insertedId);

  const seats = client.db(dbName).collection("seats");
  const totalSeats =
    newFlight.rows * newFlight.columns_per_section * newFlight.sections;
  const flightSeats = [];
  for (let i = 0; i < totalSeats; i++) {
    const seat = {
      flight_id: flightId,
      index: i,
      occupied: null,
      first_class: false,
    };
    flightSeats.push(seat);
  }
  const seatResult = await seats.insertMany(flightSeats);
  if (!seatResult.acknowledged) next(new Error("Unable to create seats"));
  res.status(200).json(newFlight);
});

// UPDATE_FLIGHT
route.patch("/:id", async (req, res, next) => {
  const flights = client.db(dbName).collection(collectionName);
  if (!req.body)
    return res.status(400).json({ message: "Flight data is required" });
  const newFlight = req.body;
  //update flight
  const result = await flights.findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: newFlight },
    { returnDocument: "after" }
  );
  if (!result) {
    next(new Error("Unable to update flight"));
    return;
  }

  //notify users of flight change
  const seats = client.db(dbName).collection("seats");
  const seatOwners = await seats
    .find(
      { flight_id: new ObjectId(req.params.id), occupied: { $ne: null } },
      { projection: { occupied: 1 } }
    )
    .toArray();
  const seatOwnerId = seatOwners.map((seat) => seat.occupied);

  const users = client.db(dbName).collection("users");
  const flightDate = new Date(result.date).toDateString();
  const userResult = await users.updateMany(
    { _id: { $in: seatOwnerId } },
    {
      $push: {
        messages: `Flight to ${result.dest} on ${flightDate} has been modified`,
      },
    }
  );

  if (!userResult.acknowledged) {
    next(new Error("Unable to notify users"));
    return;
  }
  res.status(200).json(result);
});

// DELETE_FLIGHT
route.delete("/:id", async (req, res, next) => {
  const flights = client.db(dbName).collection(collectionName);
  const newFlight = await flights.findOne({ _id: new ObjectId(req.params.id) });

  const seats = client.db(dbName).collection("seats");
  const seatOwners = await seats
    .find(
      { flight_id: newFlight._id, occupied: { $ne: null } },
      { projection: { occupied: 1 } }
    )
    .toArray();
  const seatOwnerId = seatOwners.map((seat) => seat.occupied);

  const users = client.db(dbName).collection("users");
  const flightDate = new Date(newFlight.date).toDateString();

  const userResult = await users.updateMany(
    { _id: { $in: seatOwnerId } },
    {
      $push: {
        messages: `Flight to ${newFlight.dest} on ${flightDate} has been cancelled`,
      },
    }
  );
  if (!userResult.acknowledged) {
    next(new Error("Unable to notify users"));
    return;
  }

  const seatResult = await seats.deleteMany({ flight_id: newFlight._id });
  const result = await flights.deleteOne({ _id: newFlight._id });
  if (!result.deletedCount) {
    next(new Error("Unable to delete flight"));
    return;
  }
  res.status(200).json({ message: "Flight deleted successfully" });
});

export default route;
