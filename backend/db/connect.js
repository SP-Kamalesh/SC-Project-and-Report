// /backend/db/connect.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'yourdbname';

async function connectDB() {
  await client.connect();
  console.log('MongoDB Connected');
  return client.db(dbName);
}

module.exports = connectDB;
