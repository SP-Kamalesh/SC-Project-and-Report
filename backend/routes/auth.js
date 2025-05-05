// routes/auth.js
const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "yourDB";

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    await client.connect();
    const db = client.db(dbName);
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertedId,
        name: `${firstName} ${lastName}`,
        email,
        role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
