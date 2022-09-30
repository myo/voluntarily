import express from "express";
const router = express.Router();
import multer from 'multer';
import path from "path";

import {getProfile, createProfile, editProfile, signUpForEvent, uploadPortrait} from "../controllers/member";

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '../client/public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.route("/get/:id").get(getProfile);
router.route("/create").post(createProfile);
router.route("/edit").post(editProfile);
router.route("/signUpForEvent").post(signUpForEvent);
router.route("/uploadPortrait").post(upload.single("file"), uploadPortrait);

export default router;