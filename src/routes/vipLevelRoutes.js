// routes/vipLevelRoutes.js
import { Router } from "express";
import { getVipLevels, updateVipLevel } from "../controllers/VIPMangement.mjs";

const router = Router();

// Log each request (optional)
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Get all VIP levels
router.get("/all", getVipLevels);

// Update a VIP level by ID
router.patch("/:id", updateVipLevel);

export default router;
