import express from "express";
const router = express.Router();

import {signIn, signUp} from "../controllers/auth"

router.route("/register").post(signUp);
router.route("/login").post(signIn);

export default router;