import { Router } from "express";
import { getMessage } from "../controllers/getMessage.controller.js";
const router=Router();
router.post("/",getMessage);
export default router;