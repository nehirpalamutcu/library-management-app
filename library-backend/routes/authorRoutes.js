import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  getAuthorByFullName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

const router = express.Router();

router.get("/", getAllAuthors);

router.get("/getAuthorByFullName", getAuthorByFullName);

router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.patch("/updateAuthor", updateAuthor);

router.delete("/deleteAuthor/:id", deleteAuthor);

export default router;
