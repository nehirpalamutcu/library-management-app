import express from "express";

import { getAllBorrowStatuses } from "../controllers/borrowStatusController.js";

const router = express.Router();

router.get("/", getAllBorrowStatuses);

export default router;
