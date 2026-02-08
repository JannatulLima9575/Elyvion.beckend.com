import { Router } from "express";
import { getWithdrawals, getWithdrawalById, updateWithdrawalStatus } from "../controllers/withdrawalController.js";

const router = Router();

router.get("/", getWithdrawals);
router.get("/:id", getWithdrawalById);
router.patch("/:id/status", updateWithdrawalStatus);

export default router;

