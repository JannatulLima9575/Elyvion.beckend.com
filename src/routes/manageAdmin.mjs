import { Router } from "express";
import { changePassword,updateAdmin,loginAdmin,getAdmin } from "../controllers/AminController.mjs";

const router = Router();
router.post("/login", loginAdmin);
router.get("/", getAdmin);
router.put("/update", updateAdmin);
router.put("/change-password", changePassword);

export default router;
