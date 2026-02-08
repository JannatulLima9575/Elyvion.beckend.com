import { Router } from "express";
import { getCurrencies, getCurrencyById } from "../controllers/currencyController.js";

const router = Router();

router.get("/", getCurrencies);
router.get("/:id", getCurrencyById);

export default router;

