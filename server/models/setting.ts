import { Schema, model } from 'mongoose'
import { ISetting } from '../../common/site';

const SSetting = new Schema<ISetting>({
    name: {type: String, required: true},
    active: {type: Boolean, default: true},
    props: {type: Object}
});
export const MSetting = model("Setting", SSetting);