import { Schema } from 'mongoose';

export const AdSchema  = new Schema({
    title: String,
    description: String,
    photos: [String],
    typeId: Number,
    locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    createdAt: { type: Date, default: Date.now() },
    lostOrFoundAt: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    secretQuestion: String,
    secretAnswer: String,
    isApproved: Boolean,
    actualTo: Date,
})