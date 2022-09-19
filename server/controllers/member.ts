import express from "express";

import {MUser} from '../models/user';
import Member from '../models/member';

export const getProfile = (req: express.Request, res: express.Response) => {
    res.send("getProfile NOT IMPLEMENTED");
}

export const createProfile = (req: express.Request, res: express.Response) => {
    res.send("createProfile NOT IMPLEMENTED.");
}

export const editProfile = (req: express.Request, res: express.Response) => {
    res.send("editProfile NOT IMPLEMENTED.");
}

export const signUpForEvent = (req: express.Request, res: express.Response) => {
    res.send("signUpForEvent NOT IMPLEMENTED.");
}

export const uploadPicture = (req: express.Request, res: express.Response) => {
    res.send("uploadPicture NOT IMPLEMENTED.");
}