// backend/routes/register.ts
import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { connectDB } from "../db/db";

// Request body type
interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: string;
}

const router = Router();

router.post("/register", async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const db = await connectDB();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
