import express from "express";

import { MUser } from '../models/user';
import { MMember } from '../models/member';
import { MSetting } from "../models/setting";
import { MBadge } from "../models/badge";

export const getInterviewFormSettings = async (req: express.Request, res: express.Response) => {
    try {
        var formSettings : any = MSetting.find({name: "InterviewFormSettings"});
        if (!formSettings)
        {
            formSettings = await MSetting.create({name: "InterviewFormSettings", active: true, props: {}});
        }
        console.log(formSettings);
        formSettings.save();
        res.json({"message": "Succesfully saved your settings."});
    }
    catch (e: any) {
        console.log(e);
    }
}

export const editInterviewFormSettings = async (req: express.Request, res: express.Response) => {
    try {
        var formSettings : any = MSetting.find({name: "InterviewFormSettings"});
        if (!formSettings)
        {
            formSettings = await MSetting.create({name: "InterviewFormSettings", active: true, props: {}});
        }
        formSettings.save();
        res.json({"message": "Succesfully saved your settings."});
    }
    catch (e: any) {
        console.log(e);
    }
}

export const createBadge = (req: express.Request, res: express.Response) => {
    res.send("createBadge NOT IMPLEMENTED");
}

export const editBadge = (req: express.Request, res: express.Response) => {
    res.send("editBadge NOT IMPLEMENTED");
}

export const awardBadge = (req: express.Request, res: express.Response) => {
    res.send("awardBadge NOT IMPLEMENTED");
}

export const createEvent = (req: express.Request, res: express.Response) => {
    res.send("createEvent NOT IMPLEMENTED");
}

export const editEvent = (req: express.Request, res: express.Response) => {
    res.send("editEvent NOT IMPLEMENTED");
}