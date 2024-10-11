import { Router } from "express";
import searchController from "../controllers/search.Controller.js";
const router = Router();
router.get("/", searchController);
export default router;
