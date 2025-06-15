import express from "express";
import {
  getAllBorrowings,
  getAllBorrowingss,
  getBorrowingById,
  getBorrowingsByUserId,
  createBorrowing,
  updateBorrowing,
  deleteBorrowing,
} from "../controllers/borrowingsController.js";

const router = express.Router();


router.get("/user/:user_id", getBorrowingsByUserId); 





router.get("/", getAllBorrowingss);


router.get("/:id", getBorrowingById); 


router.post("/", createBorrowing);


router.patch("/update", updateBorrowing);


router.delete("/delete", deleteBorrowing);

export default router;
