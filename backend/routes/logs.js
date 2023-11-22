import express from 'express';
import client from '../dbclient.js';

const route = express.Router();
const dbName = process.env.DB;

route.get('/', async (req, res) => {
  const logs = client.db(dbName).collection('logs');
  const result = await logs.find().toArray();
  res.status(200).json(result);
});

export default route;