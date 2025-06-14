import express from "express";
import {
  getAllBooks,
  getBookByStock,
  getBookByTitle,
  getBooksByGenreDescription,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/details", getBookDetails);

router.get("/stock", getBookByStock);

router.get("/title", getBookByTitle);

router.get("/bygenre", getBooksByGenreDescription);

router.post("/", createBook);

router.patch("/updateBook", updateBook);

router.delete("/deleteBook", deleteBook);

export default router;
