import express from "express";
import {
  getAllBorrowings,
  getBorrowingById,
  createBorrowing,
  updateBorrowing,
  deleteBorrowing,
} from "../controllers/borrowingsController.js";

const router = express.Router();


router.get("/", getAllBorrowings);


router.get("/:id", getBorrowingById);


router.post("/", createBorrowing);


router.patch("/update", updateBorrowing);


router.delete("/delete", deleteBorrowing);

export default router;
