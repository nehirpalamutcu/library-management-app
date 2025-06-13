// server.js
// Main entry point of the backend application

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authorRoutes from "./routes/authorRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Author routes
app.use("/authors", authorRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
