import { Schema } from 'mongoose';

export const AdSchema  = new Schema({
    title: String,
    description: String,
    photos: [String],
    typeId: Number,
    locationId: Schema.Types.ObjectId,
    categoryId: Number,
    createdAt: { type: Date, default: Date.now() },
    lostOrFoundAt: Date,
    userId: Schema.Types.ObjectId,
    secretQuestion: String,
    secretAnswer: String,
    isApproved: Boolean,
    actualTo: Date,
})