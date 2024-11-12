import { Router } from "express";
import { AllConvo } from "../controllers/allConversations.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
// router.route("/").get(AllConvo, verifyJWT);
router.get("/", verifyJWT, AllConvo);

export default router;
