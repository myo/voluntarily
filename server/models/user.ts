import { Schema, model } from 'mongoose'
import validator from 'validator'
import { IUser } from "../../common/user";

const SUser = new Schema<IUser>(
    {
        username: {type: String, required: false, default: ""},
        name: {type: String, default: "", maxlength: 32},
        familyName: {type: String, default: "", maxlength: 32},
        email: {type: String, required: [true, "Please enter an e-mail."], validate:{validator:validator.isEmail,message:"Please enter a valid e-mail."}, unique: true, minlength: 5, maxlength: 90},
        portrait: {type: String, default: ""},
        phone: {type: String, required: [true, "Please enter a valid phone number"], unique: true, minlength: 4, maxlength: 18},
        password: {type: String, required: [true, "Please enter a password"], minlength: 3, maxlength: 64},
        salt: {type: String, required: true},
        isVerified: {type: Boolean, default: false},
        isActive: {type: Boolean, default: false},
        isAlumni: {type: Boolean, default: false},
        isAdmin: {type: Boolean, default: false},
        isMod: {type: Boolean, default: false},
        isBanned: {type: Boolean, default: false},
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
        interviewData: {type: Object, default: {}},
    }
);

export { IUser };

export const MUser = model<IUser>('User', SUser);