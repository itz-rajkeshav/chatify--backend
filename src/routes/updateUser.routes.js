import {Router} from "express";
import {updateUser} from "../controllers/updateUser.Controller.js"
const router=Router();
router.route("/").post(updateUser);
export default router;