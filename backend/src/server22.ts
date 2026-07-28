import express from "express";
import cors from "cors";


import  app  from "./app.js"

import pool from "./config/db.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("API backend is running 🚀");
});

// Exemple API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});