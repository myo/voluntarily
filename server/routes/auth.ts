import express from "express";
import {signIn, signUp} from "../controllers/auth"
const router = express.Router();

/* routes serving authentication go here */

router.route("/register").post(signUp);
router.route("/login").post(signIn);

export default router;