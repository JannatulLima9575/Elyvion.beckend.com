import { Router } from "express";
import { getDepositRecords, getDepositRecordById } from "../controllers/depositRecordController.js";

const router = Router();

router.get("/", getDepositRecords);
router.get("/:id", getDepositRecordById);

export default router;

