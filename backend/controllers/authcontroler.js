// /backend/controllers/authController.js
const connectDB = require('../db/connect');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ firstName, lastName, email, password: hashed, role });
    res.json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
