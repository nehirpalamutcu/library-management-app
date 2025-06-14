import express from "express";

import { getAllFineCoefficients } from "../controllers/fineCoefficientController.js";

const router = express.Router();

router.get("/", getAllFineCoefficients);

export default router;
