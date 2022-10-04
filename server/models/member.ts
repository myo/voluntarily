import {Schema, model} from 'mongoose'
import {IMember} from "../../common/user";

const SMember = new Schema<IMember>(
    {
        ownerId: {type: String, default: "", unique: true},
        ownerUserName: {type: String, default: ""},
        name: {type: String, default: "", maxlength: 32},
        familyName: {type: String, default: "", maxlength: 32},
        portrait: {type: String, default: ""},
        facebook: {type: String, default: "", maxlength: 72},
        instagram: {type: String, default: "", maxlength: 72},
        job: {type: String, default: undefined, maxlength: 72},
        highschool: {type: String, default: undefined, maxlength: 72},
        faculty: {type: String, default: undefined, maxlength: 72},
        isVerified: {type: Boolean, default: false},
        isActive: {type: Boolean, default: true},
        isAlumni: {type: Boolean, default: false},
        description: {type: String, default: "", maxlength: 500},
        previousVolunteering: {type: String, default: "", maxlength: 500},
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

export const MMember = model('Member', SMember);