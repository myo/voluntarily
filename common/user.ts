export interface IUser {
    username: string,
    email: string,
    phone: string,
    password: string,
    salt: string,
    isAdmin: boolean,
    isMod: boolean,
    isVerified: boolean,
    isBanned: boolean
}

export interface IMember {
    ownerId: string,
    ownerUserName: string,
    name: string,
    familyName: string,
    portrait: string,
    facebook: string,
    instagram: string,
    job: string | undefined,
    highschool: string | undefined,
    faculty: string | undefined,
    isVerified: boolean,
    isActive: boolean,
    isAlumni: boolean,
    description: string,
    previousVolunteering: string,
    rank: string,
    previousRanks: Array<string>,
    memberSince: Date,
    memberUntil: Date,
    badges: Array<Object>,
    warnings: Number
}

export interface IUserWithProfile extends IUser, IMember { }