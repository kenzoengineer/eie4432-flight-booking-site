import express from 'express';
import session from 'express-session';
import cors from 'cors';
// import mongostore from 'connect-mongo';

const app = express();
app.use(express.json());

app.use(cors());

app.use(
  session({
    secret: "23012962x_eie4432_lab5",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
    // store: mongostore.create({ store, dbName: 'lab5db', collectionName: 'session' }),
  })
);

import usersRoute from "./routes/users.js";
app.use("/users", usersRoute);

import logsRoute from "./routes/logs.js";
app.use("/logs", logsRoute);

import flightsRoute from "./routes/flights.js";
app.use("/flights", flightsRoute);

import seatsRoute from "./routes/seats.js";
app.use("/seats", seatsRoute);

import transactionsRoute from "./routes/transactions.js";
app.use("/transactions", transactionsRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "An error occurred: " + err.message });
});

app.listen(8080, () => {
  const date = new Date();
  console.log(
    date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString()
  );
  console.log("Server started at http://127.0.0.1:8080");
});
