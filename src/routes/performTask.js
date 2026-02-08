import { Router } from "express";
import { getPerformTaskPage } from "../controllers/performTaskController.js";

const router = Router();

router.get("/", getPerformTaskPage);

export default router;

