import { Schema } from 'mongoose';

export const AnswerSchema  = new Schema({
    adId: { type: Schema.Types.ObjectId, ref: 'Ad' },
    answerAutorUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    answerText: String,
    createdAt: Date,
})