
import jwt from "jsonwebtoken";
import express from "express";
import { UnauthorizedError } from "./errors";
import { RequestWithUser, PayloadWithBakedContents } from "../types";

const UnauthorizedErrorMessage = "You are not authorized to perform this action.";

export const verifyJWT = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization?.split(" ");

    if (!authHeader || authHeader[0] != "Bearer") {
        throw new UnauthorizedError(UnauthorizedErrorMessage);
    }
    try {
        const payload : PayloadWithBakedContents = 
            jwt.verify(authHeader[1], process.env.JWT_SECRET || "") as PayloadWithBakedContents;
        req.user = {uid: payload.uid};
        next();
    }
    catch (e: any) {
        throw new UnauthorizedError(UnauthorizedErrorMessage);
    }
}