// backend/db.js
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/thriveDB?directConnection=true"; // or your MongoDB URI
const client = new MongoClient(uri);
const dbName = "thriveDB";

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}
