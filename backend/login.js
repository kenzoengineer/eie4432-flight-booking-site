import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { validate_user, update_user, username_exist } from './userdb';

// const users = new Map();

// async function init_userdb() {
//   try {
//     const db = await fs.readFile('users.json');
//     if (users.size !== 0) {
//       return;
//     }
//     const db_users = JSON.parse(db);
//     db_users.forEach((user) => {
//       users.set(user.username, user);
//     });
//   } catch (e) {
//     console.log('Error', e);
//   }
// }

// async function validate_user(username, password) {
//   const user = users.get(username);
//   if (user === undefined || user.password !== password) {
//     return false;
//   }

//   return user;
// }

// async function update_user(username, password, role) {
//   users.set(username, { username, password, role, enabled: true });

//   const userjson = [];
//   users.forEach((user) => {
//     userjson.push(user);
//   });
//   await fs.writeFile('users.json', JSON.stringify(userjson)).catch((e) => {
//     return false;
//   });
//   return true;
// }

const route = express.Router();
const form = multer();

route.post('/login', form.none(), async (req, res, next) => {
  if (req.session.logged) {
    req.session.logged = false;
  }
  const user = await validate_user(req.body.username, req.body.password);
  if (user) {
    if (!user.enabled) {
      res.status(401).json({ status: 'failed', message: 'User `' + user.username + '` is disabled' });
    } else {
      req.session.logged = true;
      req.session.username = user.username;
      req.session.role = user.role;
      req.session.time = new Date().toLocaleTimeString('en-GB');
      res.status(200).json({ status: 'success', user: { username: user.username, role: user.role } });
    }
  } else {
    res.status(401).json({ status: 'failed', message: 'Incorrect username or password' });
  }
});

route.post('/logout', (req, res) => {
  if (req.session.logged) {
    req.session.destroy();
    res.end();
  } else {
    res.json({ status: 'failed', message: 'Unauthorized' });
  }
});

route.get('/me', (req, res) => {
  if (req.session.logged) {
    res.json({ status: 'success', user: { username: req.session.username, role: req.session.role } });
  } else {
    res.json({ status: 'failed', message: 'Unauthorized' });
  }
});

route.post('/register', form.none(), async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ status: 'failed', message: 'Missing fields' });
    return;
  }
  if (req.body.username.length < 3) {
    res.status(400).json({ status: 'failed', message: 'Username must be at least 3 characters' });
    return;
  }
  if (username_exist(req.body.username)) {
    res.status(400).json({ status: 'failed', message: `Username ${req.body.username} already exists` });
    return;
  }
  if (req.body.password.length < 8) {
    res.status(400).json({ status: 'failed', message: 'Password must be at least 8 characters' });
    return;
  }
  if (req.body.role !== 'student' && req.body.role !== 'user') {
    res.status(400).json({ status: 'failed', message: 'Role can only be `student` or `user`' });
    return;
  }
  const result = await update_user(req.body.username, req.body.password, req.body.role);
  if (result) {
    res.status(200).json({ status: 'success', user: { username: req.body.username, role: req.body.role } });
  } else {
    res.status(500).json({ status: 'failed', message: 'Account created but unable to save into the database' });
  }
});

export default route;
