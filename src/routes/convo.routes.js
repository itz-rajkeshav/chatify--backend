import { Router } from "express";
import { CreateConvo } from "../controllers/convo.controller.js";
const router = Router();
router.route("/").post(CreateConvo);
export default router;
