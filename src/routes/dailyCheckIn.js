import { Router } from "express";
import {
  getDailyCheckInProgramDetails,
  getDailyCheckInProgramDetailById,
} from "../controllers/dailyCheckInController.js";

const router = Router();

router.get("/", getDailyCheckInProgramDetails);
router.get("/:id", getDailyCheckInProgramDetailById);

export default router;

