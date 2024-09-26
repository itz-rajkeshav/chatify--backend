import { Router } from "express";
import { registerMessage } from "../controllers/message.controller.js";
const router = Router();
router.route("/messages").post(registerMessage);
export default router;
