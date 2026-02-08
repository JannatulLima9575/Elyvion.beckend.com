import { Router } from "express";
import { getWithdrawalRecords, getWithdrawalRecordById } from "../controllers/withdrawalRecordController.js";

const router = Router();

router.get("/", getWithdrawalRecords);
router.get("/:id", getWithdrawalRecordById);

export default router;

