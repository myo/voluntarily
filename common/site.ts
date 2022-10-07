import { Document } from "mongoose"

export interface ISetting extends Document {
    name: string,
    active: boolean,
    props: object,
    children: any
}

export interface IFormElement {
    type: string,
    name: string,
    required: boolean,
}

export interface IFileUpload {
    userId: string,
    fieldname: string,
    originalname: string,
    mimetype: string,
    filename: string,
    path: string,
    size: number
}