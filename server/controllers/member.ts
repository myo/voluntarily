import express from "express";

import { MUser } from '../models/user';
import { MMember } from '../models/member';
import { RequestWithUser } from "../types";
import { UnauthorizedError } from "../middleware/errors";
import { IMember, IUser, IUserWithProfile } from "../../common/user";
import { MFileUpload } from "../models/file";

export const getProfile = (req: express.Request, res: express.Response) => {
    res.send("getProfile NOT IMPLEMENTED");
}

export const createProfile = async (req: RequestWithUser, res: express.Response) => {
    const {name, familyName, job, highschool, faculty, facebook, instagram, description, previousVolunteering} = req.body;

    if (!name?.length || !familyName?.length) {
        res.json({message: "Please fill in your name."});
        return;
    }

    let newUserName = name + "-" + familyName;
    newUserName = newUserName.toLowerCase();

    const user = await MUser.findOne<IUser>({_id: req.user?.uid});

    if (!user) {
        throw new UnauthorizedError("You are not logged in.");
    }

    if (user.username?.length > 1) {
        res.json({message: "You have already created your profile."})
        return;
    }

    const userNameExists = await MUser.findOne<IUser>({username: newUserName});

    if (userNameExists)
    {
        const now = Date.now().toString().split("");
        newUserName += now[now.length - 3] + now[now.length - 2] + now[now.length - 1];
    }
    
    user.username = newUserName;
    user.save();
    const profile = await MMember.create({ownerId: req.user?.uid, ownerUserName: newUserName, name: name, familyName: familyName, job: job, highschool: highschool, faculty: faculty, facebook: facebook, instagram: instagram, description: description, previousVolunteering: previousVolunteering});
    profile.save();

    const userWithProfile = {...user, ...profile} as IUserWithProfile;

    res.json({user: userWithProfile});
}

export const editProfile = async(req: RequestWithUser, res: express.Response) => {
    let profile = await MMember.findOne<IMember>({ownerId: req.user?.uid});

    if (!profile) {
        throw new UnauthorizedError("INVALID_SESSION");
    }

    profile = {...profile, ...req.body.changes};

    res.json({user: {...req.body.changes}});

    try {
        profile?.save();
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