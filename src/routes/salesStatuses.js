import { Router } from "express";
import { getSalesStatuses, getSalesStatusById } from "../controllers/salesStatusController.js";

const router = Router();

router.get("/", getSalesStatuses);
router.get("/:id", getSalesStatusById);

export default router;

