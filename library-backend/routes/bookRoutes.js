import express from "express";

import { getAllBooks, getBookByStock } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/stock", getBookByStock);

export default router;
