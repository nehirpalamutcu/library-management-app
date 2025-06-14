import express from "express";
import {
  getAllBooks,
  getBookByStock,
  getBookByTitle,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/stock", getBookByStock);

router.get("/title", getBookByTitle);

router.post("/", createBook);

router.patch("/updateBook", updateBook);

router.delete("/deleteBook", deleteBook);

export default router;
