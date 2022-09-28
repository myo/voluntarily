const crypto = require("crypto");
import express from "express";

import {IUser, MUser} from '../models/user';

import { bakeJWT } from "../middleware/jwt";
import { UnauthorizedError } from "../middleware/errors";

export const checkPassword = (existingUser: any, givenPassword: string) => {
    const hashedPassword = crypto.createHash('sha256').update(givenPassword + existingUser.salt).digest('hex');
    return hashedPassword == existingUser.password;
};

export const signIn = async(req: express.Request, res: express.Response) => {
    const {email, password} = req.body;

    const existingUser = await MUser.findOne({email: email});
    
    if (existingUser && checkPassword(existingUser, password)) {
        const token = bakeJWT({uid: existingUser._id});
        res.status(200).json({token: token});
    }
    throw new UnauthorizedError("Wrong email or password.");
}

export const signUp = async (req: express.Request, res: express.Response) => {
    const {email, phone, password} = req.body;

    const salt = crypto.randomBytes(11).toString('hex');
    const hashedPassword = crypto.createHash('sha256').update(password + salt).digest('hex');

    const newUser = await MUser.create({email: email, phone: phone, password: hashedPassword, salt: salt});
    const token = bakeJWT({uid: newUser._id});
    newUser.save();
    res.status(200).json({token: token});

}
