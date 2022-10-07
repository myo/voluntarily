import { Schema, model } from 'mongoose'
import { ISetting, IFormElement } from '../../common/site';



const SSetting = new Schema<ISetting>({
    name: {type: String, required: true, unique: true},
    active: {type: Boolean, default: true},
    props: {type: Object},
    children: {type: Array<IFormElement>}
});

export const MSetting = model("Setting", SSetting);