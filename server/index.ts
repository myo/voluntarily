import express from "express";
import "express-async-errors"
const app = express();
import cors from "cors";
const {notFoundHandler, errorHandler} = require("./middleware/errors");
import adminRouter from "./routes/admin";
import authRouter from "./routes/auth";
import memberRouter from "./routes/member";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {verifyJWT} from "./middleware/jwt"

dotenv.config();

try {
    mongoose.connect(process.env.ATLAS_URL || "");
}
catch(e: any) {
    console.log(e);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/admin", verifyJWT, adminRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/member", verifyJWT, memberRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT || 3000);