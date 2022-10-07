import { Schema, model } from 'mongoose'
import validator from 'validator'
import { IUser } from "../../common/user";

const SUser = new Schema<IUser>(
    {
        username: {type: String, required: false, default: ""},
        email: {type: String, required: [true, "Please enter an e-mail."], validate:{validator:validator.isEmail,message:"Please enter a valid e-mail."}, unique: true, minlength: 5, maxlength: 90},
        phone: {type: String, required: [true, "Please enter a valid phone number"], unique: true, minlength: 4, maxlength: 18},
        password: {type: String, required: [true, "Please enter a password"], minlength: 3, maxlength: 64},
        salt: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
        isMod: {type: Boolean, default: false},
        isVerified: {type: Boolean, default: false},
        isBanned: {type: Boolean, default: false}
    }
);

export { IUser };

export const MUser = model<IUser>('User', SUser);