import express from "express";

import { MUser } from '../models/user';
import { MSetting } from "../models/setting";
import { ISetting } from "../../common/site";

export const getSetting = async (req: express.Request, res: express.Response) => {
    try {
        var formSettings : ISetting = await MSetting.findOne<ISetting>({name: req.params.name}) as ISetting;
        res.json(formSettings.toObject());
    }
    catch (e: any) {
        console.log(e);
    }
}

export const changeSetting = async (req: express.Request, res: express.Response) => {
}