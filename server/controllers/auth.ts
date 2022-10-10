const crypto = require("crypto");
import express from "express";

import {IUser, MUser} from '../models/user';

import { bakeJWT } from "../middleware/jwt";
import { UnauthorizedError } from "../middleware/errors";

export const checkPassword = (existingUser: IUser, givenPassword: string) => {
    const hashedPassword = crypto.createHash('sha256').update(givenPassword + existingUser.salt).digest('hex');
    return hashedPassword == existingUser.password;
};

const sanitizeUserData = (data: any) => {
    data._id = undefined;
    data.password = undefined;
    data.salt = undefined;
    data.__v = undefined;
    return data;
}

const authorize = async(user: IUser, res: express.Response) => {
    const token = bakeJWT({uid: user._id});
    const sanitizedUserData = sanitizeUserData(user);
    res.status(200).json({token: token, user: sanitizedUserData});
}

export const signIn = async (req: express.Request, res: express.Response) => {
    const {email, password} = req.body;

    const existingUser = await MUser.findOne<IUser>({email: email});
    
    if (existingUser && checkPassword(existingUser, password)) {
        await authorize(existingUser, res);
    }
    throw new UnauthorizedError("Wrong email or password.");
}

export const signUp = async (req: express.Request, res: express.Response) => {
    const {email, phone, password} = req.body;

    const salt = crypto.randomBytes(11).toString('hex');
    const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');
    const newUser = await MUser.create({email: email, phone: phone, password: hashedPassword, salt: salt});
    await newUser.save();

    await authorize(newUser, res);
}
