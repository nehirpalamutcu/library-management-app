import express from "express";
import {
  getAllBooks,
  getBookByStock,
  getBookByTitle,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/stock", getBookByStock);

router.get("/title", getBookByTitle);

export default router;
