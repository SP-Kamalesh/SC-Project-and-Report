const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(); // Defaults to thriveDB as defined in URI
    console.log("MongoDB connected (Native Driver)");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
