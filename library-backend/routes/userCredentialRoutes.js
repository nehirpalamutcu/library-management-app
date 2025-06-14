import express from "express";

import { getAllUserCredentials } from "../controllers/userCredentialController.js";

const router = express.Router();

router.get("/", getAllUserCredentials);

export default router;
