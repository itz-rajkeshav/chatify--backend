// user.router.js

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  loggedOutUser,
  loginUser,
  registerUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(upload, registerUser);  // Corrected usage
router.route("/login").post(loginUser);

// secured route
router.route("/logout").post(verifyJWT, loggedOutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
