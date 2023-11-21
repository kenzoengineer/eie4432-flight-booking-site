import express from 'express';
import session from 'express-session';
// import mongostore from 'connect-mongo';

const app = express();

app.use(
  session({
    secret: '23012962x_eie4432_lab5',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    // store: mongostore.create({ store, dbName: 'lab5db', collectionName: 'session' }),
  })
);

app.get('/', (req, res) => {
});

// import route from './login.js';
// app.use('/auth', route);

app.listen(8080, () => {
  const date = new Date();
  console.log(date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString());
  console.log('Server started at http://127.0.0.1:8080');
});
