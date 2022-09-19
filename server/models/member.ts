import {Schema, model} from 'mongoose'

interface IMember {
    ownerId: number;
    name: string,
    slug: string,
    isVerified: boolean,
    isActive: boolean,
    isAlumni: boolean,
    description: string,
    image: string,
    rank: string,
    previousRanks: Array<string>,
    memberSince: Date,
    memberUntil: Date,
    badges: Array<Object>,
    warnings: Number
}

const SMember = new Schema<IMember>(
    {
        ownerId: {type: Number, default: -1, unique: true},
        name: {type: String, default: "", maxlength: 60},
        slug: {type: String, default: ""},
        isVerified: {type: Boolean, default: false},
        isActive: {type: Boolean, default: true},
        isAlumni: {type: Boolean, default: false},
        description: {type: String, default: "", maxlength: 500},
        image: {type: String, default: ""},
        rank: {type: String, default: "Voluntar"},
        previousRanks: [{type: String, default: ""}],
        memberSince: {type: Date, default: Date.now},
        memberUntil: {type: Date, default: 7258122061000},
        badges: [{
            name: {type: String, default: ""},
            slug: {type: String, default: ""},
            description: {type: String, default: ""},
            image: {type: String, default: ""}
        }],
        warnings: {type: Number, default: 0},
    }
);

const MMeber = model<IMember>('Member', SMember);

export default model;