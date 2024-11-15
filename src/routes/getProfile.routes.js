import {Router} from "express";
import { getProfile } from "../controllers/getProfile.controller.js";
const router=Router();
router.post("/",getProfile);
export default router;
