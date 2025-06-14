// server.js
// Main entry point of the backend application

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authorRoutes from "./routes/authorRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowingsRoutes from "./routes/borrowingsRoutes.js";
import borrowStatusRoutes from "./routes/borrowStatusRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Author routes
app.use("/authors", authorRoutes);

// Book routes
app.use("/books", bookRoutes);

// Borrowing routes
app.use("/borrowings", borrowingsRoutes);

//borrowStatuses routes
app.use("/borrow-status", borrowStatusRoutes);

//Genre routes
app.use("/genres", genreRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
