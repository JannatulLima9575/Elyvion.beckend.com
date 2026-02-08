import { Router } from "express";
import { getMenus, getMenuById } from "../controllers/menuController.js";

const router = Router();

router.get("/", getMenus);
router.get("/:id", getMenuById);

export default router;

