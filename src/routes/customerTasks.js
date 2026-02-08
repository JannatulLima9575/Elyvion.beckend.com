import { Router } from "express";
import {
  getCustomerTasks,
  getCustomerTaskById,
  getPresetCustomerTasklist,
} from "../controllers/customerTaskController.js";

const router = Router();

router.get("/", getCustomerTasks);
router.get("/preset", getPresetCustomerTasklist);
router.get("/:id", getCustomerTaskById);

export default router;

