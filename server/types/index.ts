
import jwt from "jsonwebtoken";
import express from "express";

export interface CustomRequest extends express.Request {
    user?: {uid: string},
    options?: object,
}

export interface PayloadWithBakedContents extends jwt.JwtPayload {
    uid: string;
}