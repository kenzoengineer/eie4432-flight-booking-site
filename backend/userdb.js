import fs from 'fs/promises';
import client from './dbclient.js';
async function init_db() {
  try {
    const users = client.db('lab5db').collection('users');
    const data = await fs.readFile('./users.json');
    const result = await users.insertMany(JSON.parse(data));
    console.log(`Added ${result.insertedCount} users`);
  } catch (err) {
    console.log('Unable to initialize database', err);
  }
}

async function validate_user(username, password) {
  if (!username || !password) {
    return false;
  }
  try {
    const users = client.db('lab5db').collection('users');
    const user = await users.findOne({ username, password });
    if (!user) {
      return false;
    }
    return user;
  } catch (err) {
    console.log('Unable to fetch from database!', err);
    return false;
  }
}

async function update_user(username, password, role, enabled) {
  try {
    const users = client.db('lab5db').collection('users');
    const result = await users.updateOne({ username }, { $set: { password, role, enabled } }, { upsert: true });
    if (result.matchedCount === 1) {
      console.log('Added 0 users');
    } else {
      console.log(`Added 1 users`);
    }
    return true;
  } catch (err) {
    console.log('Unable to update the database!', err);
    return false;
  }
}

async function fetch_user(username) {
  try {
    const users = client.db('lab5db').collection('users');
    const user = await users.findOne({ username });
    return user;
  } catch (err) {
    console.log('Unable to fetch from database!', err);
  }
}

async function username_exist(username) {
  try {
    if (await fetch_user(username)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Unable to fetch from database!');
  }
}
export { validate_user, update_user, fetch_user, username_exist };
