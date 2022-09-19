import {Schema, model} from 'mongoose'

interface IBadge {
    name: string,
    slug: string,
    description: string,
    image: string,
    recipients: Array<number>
    creatorId: number
    createdAt: Date
}

const SUser = new Schema<IBadge>(
    {
        name: {type: String, required: true},
        slug: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        recipients: {type: [{id: Number}], default: []},
        creatorId: Number,
        createdAt: { type: Date, default: Date.now },
    }
);

const MUser = model<IBadge>('Badge', SUser);

export default model;