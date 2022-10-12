import express from "express";

import { MUser } from "../models/user";
import { CustomRequest } from "../types";
import { UnauthorizedError } from "../middleware/errors";
import { IUser } from "../../common/user";
import { MFileUpload } from "../models/file";

export const getProfile = async (req: CustomRequest, res: express.Response) => {
  const requester = await MUser.findOne<IUser>({ _id: req.user?.uid });

  let selectQuery = "-_id -__v";

  if (requester && (requester.isAdmin || requester.isMod)) {
    selectQuery += " +email +phone +interviewData";
  }

  const username = req.params.username;
  if (!username) {
    let users = await MUser.find<IUser>().select(selectQuery);
    res.json(users);
  }
};

export const aggregateUsers = async (
  req: CustomRequest,
  res: express.Response
) => {
  let users = await MUser.aggregate([
    { $sample: { size: 10 } },
    {
      $unset: [
        "password",
        "salt",
        "_id",
        "__v",
        "email",
        "phone",
        "interviewData",
      ],
    },
  ]);
  res.json(users);
};

export const createProfile = async (
  req: CustomRequest,
  res: express.Response
) => {
  const { name, familyName } = req.body;
  const interviewData = req.body;
  interviewData.name = undefined;
  interviewData.familyName = undefined;

  if (!name?.length || !familyName?.length) {
    res.json({ message: "NAME_EMPTY" });
    return;
  }

  let newUserName = name + "-" + familyName;
  newUserName = newUserName.toLowerCase();

  const user = await MUser.findOne<IUser>({ _id: req.user?.uid });

  if (!user) {
    throw new UnauthorizedError("NOT_LOGGED_IN");
  }

  if (user.username?.length > 1) {
    res.json({ message: "PROFILE_EXISTS" });
    return;
  }

  const userNameExists = await MUser.findOne<IUser>({ username: newUserName });

  if (userNameExists) {
    const now = Date.now().toString().split("");
    newUserName +=
      now[now.length - 3] + now[now.length - 2] + now[now.length - 1];
  }

  user.username = newUserName;
  user.name = name;
  user.familyName = familyName;
  user.interviewData = interviewData;
  user.save();

  res.json({ user: user });
};

export const editProfile = async (
  req: CustomRequest,
  res: express.Response
) => {
  const user = await MUser.findOne<IUser>({ _id: req.user?.uid });

  if (!user) {
    throw new UnauthorizedError("INVALID_SESSION");
  }

  // at this point an allowlist
  // might be better
  let changes = req.body.changes;
  changes._id = undefined;
  changes.__v = undefined;
  changes.isAdmin = undefined;
  changes.isMod = undefined;
  changes.isVerified = undefined;
  changes.isActive = undefined;
  changes.isAlumni = undefined;
  changes.isBanned = undefined;
  changes.rank = undefined;

  for (const key in changes) {
    if (changes[key]) {
      user[key] = changes[key];
    }
  }

  try {
    await user?.save();
  } catch (e: any) {
    console.log(e);
  }

  res.json({ user: { ...changes } });
};

export const signUpForEvent = (req: CustomRequest, res: express.Response) => {
  res.send("signUpForEvent NOT IMPLEMENTED.");
};

export const uploadFile = async (req: CustomRequest, res: express.Response) => {
  if (req.file) {
    MFileUpload.create({
      userId: req.user?.uid,
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    res.json({
      file: {
        filename: req.file.filename,
        size: req.file.size,
      },
    });
  }

  res.status(500).json({ message: "FILE_UPLOAD_FAILED" });
};
