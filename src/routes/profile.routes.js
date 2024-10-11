import { Router } from "express";
import profileController from "../controllers/profiile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/get", verifyJWT, profileController);
export default router;
