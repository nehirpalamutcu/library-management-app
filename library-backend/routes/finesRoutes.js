import express from "express";
import {
  getAllFines,
  getFineById,
  getFinesByAmount,
  createFine,
  updateFine,
  deleteFine,
} from "../controllers/finesController.js";

const router = express.Router();

// fine_amount'a göre filtreleme
router.get("/amount/:amount", getFinesByAmount);


// tüm kayıtları getir
router.get("/", getAllFines);

// belirli id'ye göre kayıt getir
router.get("/:id", getFineById);

// yeni ceza kaydı oluştur
router.post("/", createFine);

// ceza kaydını güncelle
router.patch("/update", updateFine);

// ceza kaydını sil
router.delete("/delete", deleteFine);

export default router;
