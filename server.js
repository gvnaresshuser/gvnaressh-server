import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import pool from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gvnaressh.onrender.com",
      "https://gvnaressh-portfolio.onrender.com",
    ],
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

// Test Database Connection
const startServer = async () => {
  try {
    const client = await pool.connect();

    console.log("✅ PostgreSQL Connected Successfully");

    const result = await client.query("SELECT NOW()");

    console.log("🕒 Database Time:", result.rows[0].now);

    client.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
