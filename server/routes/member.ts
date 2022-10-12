import express from "express";
const router = express.Router();
import multer from 'multer';
import path from "path";
import {getProfile, createProfile, editProfile, signUpForEvent, uploadFile} from "../controllers/member";

/* anything member-related */

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '../client/public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

router.route("/get").get(getProfile);
router.route("/create").post(createProfile);
router.route("/edit").post(editProfile);
router.route("/signUpForEvent").post(signUpForEvent);
router.route("/uploadFile").post(upload.single("file"), uploadFile);

export default router;