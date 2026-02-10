import { Router } from "express";
import { getUsers, getUserById, loginUser, createUser } from "../controllers/userController.js";

const router = Router();
router.use(async (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
router.post("/register",createUser)
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
