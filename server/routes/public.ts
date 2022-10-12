import express from "express";
import {aggregateUsers} from "../controllers/member";
const router = express.Router();

/* PURPOSE: any api that doesn't require JWT auth
 * (as in is publicly accessible) goes here.
 * Careful to strip down as much data as possible!
 */

router.route("/members/get").get(aggregateUsers);

export default router;