import { Router } from "express";
import { getTasklists, getTasklistById, createTasklist, updateTasklist, deleteTasklist } from "../controllers/tasklistController.js";

const router = Router();

router.get("/", getTasklists);
router.post("/", createTasklist);
router.get("/:id", getTasklistById);
router.patch("/:id", updateTasklist);
router.delete("/:id", deleteTasklist);

export default router;

