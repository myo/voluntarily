import express from "express";
const router = express.Router();

import {getProfile, createProfile, editProfile, signUpForEvent, uploadPicture} from "../controllers/member"

router.route("/get/:id").get(getProfile);
router.route("/create").post(createProfile);
router.route("/edit").post(editProfile);
router.route("/signUpForEvent").post(signUpForEvent);
router.route("/uploadPicture").post(uploadPicture);

export default router;