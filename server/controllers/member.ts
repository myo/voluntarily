import express from "express";

import { MUser } from '../models/user';
import { RequestWithUser } from "../types";
import { UnauthorizedError } from "../middleware/errors";
import { IUser } from "../../common/user";
import { MFileUpload } from "../models/file";

export const getProfile = (req: express.Request, res: express.Response) => {
    res.send("getProfile NOT IMPLEMENTED");
}

export const createProfile = async (req: RequestWithUser, res: express.Response) => {
    const {name, familyName} = req.body;
    const interviewData = req.body;
    interviewData.name = undefined;
    interviewData.familyName = undefined;

    if (!name?.length || !familyName?.length) {
        res.json({message: "NAME_EMPTY"});
        return;
    }

    let newUserName = name + "-" + familyName;
    newUserName = newUserName.toLowerCase();

    const user = await MUser.findOne<IUser>({_id: req.user?.uid});

    if (!user) {
        throw new UnauthorizedError("NOT_LOGGED_IN");
    }

    if (user.username?.length > 1) {
        res.json({message: "PROFILE_EXISTS"})
        return;
    }

    const userNameExists = await MUser.findOne<IUser>({username: newUserName});

    if (userNameExists)
    {
        const now = Date.now().toString().split("");
        newUserName += now[now.length - 3] + now[now.length - 2] + now[now.length - 1];
    }
    
    user.username = newUserName;
    user.name = name;
    user.familyName = familyName;
    user.interviewData = interviewData;
    user.save();

    res.json({user: user});
}

export const editProfile = async(req: RequestWithUser, res: express.Response) => {
    let user = await MUser.findOne<IUser>({_id: req.user?.uid});

    if (!user) {
        throw new UnauthorizedError("INVALID_SESSION");
    }

    let changes = req.body.changes;
    changes._id = undefined;
    changes.isAdmin = undefined;
    changes.isMod = undefined;

    user = {...user, ...req.body.changes};

    res.json({user: {...req.body.changes}});

    try {
        user?.save();
    }
    catch(e: any) {
        res.status(500).json({message: "EDIT_PROFILE_FAILED"})
    }
}

export const signUpForEvent = (req: express.Request, res: express.Response) => {
    res.send("signUpForEvent NOT IMPLEMENTED.");
}

export const uploadFile = async(req: RequestWithUser, res: express.Response) => {
    if (req.file) {

        MFileUpload.create({
            userId: req.user?.uid,
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
        
        res.json({file: {
            filename: req.file.filename, 
            size: req.file.size
        }});
    }

    res.status(500).json({message: "FILE_UPLOAD_FAILED"});
}