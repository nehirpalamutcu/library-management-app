import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  getAuthorByLastName,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

const router = express.Router();

router.get("/", getAllAuthors);

router.get("/getAuthorByLastName", getAuthorByLastName);

router.get("/:id", getAuthorById);

router.post("/", createAuthor);

router.patch("/updateAuthor", updateAuthor);

router.delete("/deleteAuthor", deleteAuthor);

export default router;
