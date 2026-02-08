import { Router } from "express";
import { 
  getAmbassadorLevels, 
  getAmbassadorLevelById,
  createAmbassadorLevel,
  updateAmbassadorLevel,
  deleteAmbassadorLevel,
} from "../controllers/ambassadorLevelController.js";

const router = Router();

router.get("/", getAmbassadorLevels);
router.post("/", createAmbassadorLevel);
router.get("/:id", getAmbassadorLevelById);
router.patch("/:id", updateAmbassadorLevel);
router.delete("/:id", deleteAmbassadorLevel);

export default router;

