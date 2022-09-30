
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import express from "express";

export interface RequestWithUser extends express.Request {
    user?: {uid: string}
}

export interface PayloadWithBakedContents extends jwt.JwtPayload {
    uid: string;
}