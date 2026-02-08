import { Router } from "express";
import { getTransactionRecords, getTransactionRecordById } from "../controllers/transactionRecordController.js";

const router = Router();

router.get("/", getTransactionRecords);
router.get("/:id", getTransactionRecordById);

export default router;

