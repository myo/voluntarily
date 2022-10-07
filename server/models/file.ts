import { Schema, model } from 'mongoose'
import { IFileUpload } from '../../common/site';



const SFileUpload = new Schema<IFileUpload>({
    userId: {type: String},
    fieldname: {type: String},
    originalname: {type: String},
    mimetype: {type:String},
    filename: {type: String, required: true, unique: true},
    path: {type: String},
    size: {type: Number}
});

export { IFileUpload };

export const MFileUpload = model<IFileUpload>("FileUpload", SFileUpload);