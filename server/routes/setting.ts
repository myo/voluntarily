import express from "express";
const router = express.Router();

import {getSetting, changeSetting} from "../controllers/setting"

router.route("/get/:name").get(getSetting);
router.route("/change").post(changeSetting);

export default router;