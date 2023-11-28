// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(
    session({
        secret: "23012962x_eie4432_lab5",
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true },
    })
);

const PREAUTH_KEY = 'ZrMAEWqzzxjSQAYj';
app.use((req, res, next) => {
    console.log("used")
    if (!req.session?.allow_access) {
        if (req.query?.authkey === PREAUTH_KEY) {
            req.session.allow_access = true;
        } else {
            res.status(401).json({
                status: 'failed',
                message: 'Unauthorized'
            });
            return;
        }
    }
    next();
});

app.get("/", (req,res) => {
    if (!req.session?.allow_access) {
        if (req.query?.authkey === PREAUTH_KEY) {
            req.session.allow_access = true;
        } else {
            res.status(401).json({
                status: 'failed',
                message: 'Unauthorized'
            });
            return;
        }
    }
    return res.status(200);
});

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
