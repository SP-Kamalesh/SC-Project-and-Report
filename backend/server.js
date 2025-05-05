// /backend/server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import registerRoute from "./routes/register.js";

const app = express();
app.use(express.json()); 
app.use(cors());
app.use(bodyParser.json());

app.use("/api", registerRoute);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
