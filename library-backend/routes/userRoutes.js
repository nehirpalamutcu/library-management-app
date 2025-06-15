import express from "express";

import { getAllUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/login", loginUser);

export default router;
