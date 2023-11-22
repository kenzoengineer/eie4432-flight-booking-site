import client from './dbclient.js';

const dbName = process.env.DB;

export async function createLog(user_id, message) {
  const logs = client.db(dbName).collection('logs');
  const result = await logs.insertOne({ user_id, message, date: new Date()});
  return result.acknowledged;
}