import express from "express";
const router = express.Router();

import {createBadge, editBadge, awardBadge, createEvent, editEvent, editInterviewFormSettings} from "../controllers/admin"

router.route("/interview/form/edit").post(editInterviewFormSettings);
router.route("/badge/create").post(createBadge);
router.route("/badge/edit").post(editBadge);
router.route("/badge/award").post(awardBadge);
router.route("/event/create").post(createEvent);
router.route("/event/edit").post(editEvent);

export default router;