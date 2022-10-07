import express from "express";

import { MUser } from '../models/user';
import { MMember } from '../models/member';
import { RequestWithUser } from "../types";
import { UnauthorizedError } from "../middleware/errors";
import { IMember, IUser, IUserWithProfile } from "../../common/user";

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

export const editProfile = (req: express.Request, res: express.Response) => {
    res.send("editProfile NOT IMPLEMENTED.");
}

export const signUpForEvent = (req: express.Request, res: express.Response) => {
    res.send("signUpForEvent NOT IMPLEMENTED.");
}

export const uploadPortrait = async(req: RequestWithUser, res: express.Response) => {
    console.log(req.file, req.body);

    if (req.file) {
        const profile = await MMember.findOne<IMember>({ownerId: req.user?.uid});
        if (!profile) {
            throw new UnauthorizedError("INVALID SESSION.");
        }
        profile.portrait = req.file?.filename;
        profile.save();
        res.json({user: {portrait: req.file?.filename}});
    }
}