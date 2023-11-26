import express from 'express';
import client from '../dbclient.js'

const route = express.Router();
const dbName = process.env.DB;
const collectionName = 'seats';

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
route.patch('/', async (req, res) => {
  const updateSeats = req.body;
  if (!updateSeats) return res.status(400).json({ message: 'Seat data is required' });
  const seats = client.db(dbName).collection(collectionName);
  // update all seats in updateSeats by toggling first_class
  const result = await seats.updateMany({ index: { $in: updateSeats } }, { $set: { occupied: { $not: "$occupied" }} });
  if (!result.acknowledged) throw new Error('Unable to update seats');

  res.status(200).json({ message: 'Seat updated successfully' });
});

export default route;