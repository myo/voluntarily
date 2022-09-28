
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import express from "express";
import { UnauthorizedError } from "./errors";
import { RequestWithUser, PayloadWithBakedContents } from "../types";

export const verifyJWT = (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization?.split(" ");

    if (!authHeader || authHeader[0] != "Bearer") {
        throw new UnauthorizedError("You are not authorized to perform this action.");
    }
    try {
        const payload : PayloadWithBakedContents = 
            jwt.verify(authHeader[1], process.env.JWT_SECRET || "") as PayloadWithBakedContents;
        req.user = {userId: payload.userId};
        next();
    }
    catch (e: any) {
        throw new UnauthorizedError("You are not authorized to perform this action.");
    }
}

export const bakeJWT = (secret: Object): string => {
    return jwt.sign(secret, process.env.JWT_SECRET || "", {expiresIn: process.env.JWT_LIFE})
};