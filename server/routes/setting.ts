import express from "express";
import {getSetting, changeSetting} from "../controllers/setting"
const router = express.Router();

/* site-wide settings, translations
 * and loadable forms
 */

router.route("/get/:name").get(getSetting);
router.route("/change").post(changeSetting);

export default router;