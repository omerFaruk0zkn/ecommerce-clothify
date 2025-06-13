import express from "express";
import {
  checkAuthUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../controllers/auth/auth.controller.js";
import { protectRoute } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth", protectRoute, checkAuthUser);

export default router;
