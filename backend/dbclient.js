// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.CONNECTION_STR) {
    console.error("CONNECTION_STR is not defined");
    process.exit(1);
}

const connect_uri = process.env.CONNECTION_STR;
const client = new MongoClient(connect_uri, {
    connectTimeoutMS: 2000,
    serverSelectionTimeoutMS: 2000,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connect() {
    const date = new Date();
    try {
        await client.connect();
        await client.db("flight-booking").command({ ping: 1 });
        console.log(
            date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString()
        );
        console.log("Successfully connected to the database!");
    } catch (err) {
        console.error("Unable to establish connection to the database!", err);
        process.exit(1);
    }
}
connect().catch(console.dir);
export default client;
