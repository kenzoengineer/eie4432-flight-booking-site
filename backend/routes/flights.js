import express from 'express';
import client from '../dbclient.js';
import { ObjectId } from 'mongodb';

const route = express.Router();
const dbName = process.env.DB;
const collectionName = 'flights';

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
route.get('/', async (req, res) => {
  const flights = client.db(dbName).collection(collectionName);
  const result = await flights.find().toArray();
  res.status(200).json(result);
});

// GET_FLIGHT_DATA
route.get('/:id', async (req, res) => {
  const flights = client.db(dbName).collection(collectionName);
  const result = await flights.findOne({ id: new ObjectId(parseInt(req.params.id)) });
  if (!result) throw new Error('Flight not found');
  const seats = client.db(dbName).collection('seats').find({ flight_id: result._id }).sort({ index: 1 }).toArray();
  
  //needs to include owner of seat
  res.status(200).json({
    flight: result,
    seats: seats,
  });
});

// CREATE_FLIGHT
route.post('/', async (req, res) => {
  const flights = client.db(dbName).collection(collectionName);
  if (!req.body) return res.status(400).json({ message: 'Flight data is required' });
  const newFlight = req.body
  newFlight.sold = 0;

  const result = await flights.insertOne(newFlight);
  if (!result.acknowledged) throw new Error('Unable to create flight'); 

  const flightId = new ObjectId(result.insertedId);

  const seats = client.db(dbName).collection('seats');
  const totalSeats = newFlight.rows * newFlight.columns_per_section * newFlight.sections;
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
  if (!seatResult.acknowledged) throw new Error('Unable to create seats');
  res.status(200).json(newFlight); 
});

// UPDATE_FLIGHT
route.patch('/:id', async (req, res) => {
  const flights = client.db(dbName).collection(collectionName);
  if (!req.body) return res.status(400).json({ message: 'Flight data is required' });
  const newFlight = req.body;
  //update flight
  const result = await flights.updateOne({ id: new ObjectId(parseInt(req.params.id)) }, { $set: newFlight });
  if (!result.acknowledged) throw new Error('Unable to update flight');
  
  //notify users of flight change
  const seats = client.db(dbName).collection('seats');
  const seatOwners = await seats.find({ flight_id: new ObjectId(newFlight._id), occupied: { $ne: null } }, { occupied: 1 }).toArray();
  const users = client.db(dbName).collection('users');
  const userResult = users.updateMany({ _id: { $in: seatOwners } }, { $push: { messages: `Flight to ${newFlight.dest} on ${newFlight.date} has been modified` } });
  if (!userResult.acknowledged) throw new Error('Unable to notify users');
  res.status(200).json(newFlight);
});

// DELETE_FLIGHT
route.delete('/:id', async (req, res) => {
  const flights = client.db(dbName).collection(collectionName);
  const seats = client.db(dbName).collection('seats');
  const seatOwners = await seats.find({ flight_id: newFlight._id, occupied: { $ne: null } }, { occupied: 1 }).toArray();
  const users = client.db(dbName).collection('users');

  const userResult = users.updateMany({ _id: { $in: seatOwners } }, { $push: { messages: `Flight to ${newFlight.dest} on ${newFlight.date} has been cancelled` } });
  if (!userResult.acknowledged) throw new Error('Unable to notify users');

  const seatResult = await seats.deleteMany({ flight_id: new ObjectId(parseInt(req.params.id)) });
  const result = await flights.deleteOne({ id: new ObjectId(parseInt(req.params.id)) });

  if (!result.acknowledged) throw new Error('Unable to delete flight');
  res.status(200).json({ message: 'Flight deleted successfully' });
});

export default route

