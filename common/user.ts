import { Document } from "mongoose"

export interface IUser extends Document {
    username: string,
    name: string,
    familyName: string,
    email: string,
    portrait: string,
    phone: string,
    password: string,
    salt: string,
    isAdmin: boolean,
    isMod: boolean,
    isVerified: boolean,
    isActive: boolean,
    isAlumni: boolean,
    isBanned: boolean,
    rank: string,
    previousRanks: string[],
    memberSince: Date,
    memberUntil: Date,
    badges: object[],
    warnings: number,
    interviewData: object
}