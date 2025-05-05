const express = require("express");
const router = express.Router();
const { getDB } = require("../db/mongoClient");

// Example: Fetch all users
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
