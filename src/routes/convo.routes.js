import { Router } from "express";
import { ConvoMember } from "../controllers/convo.controller.js";
const router = Router();
router.route("/").post(ConvoMember);
export default router;
