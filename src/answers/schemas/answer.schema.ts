import { Schema } from 'mongoose';

export const AnswerSchema  = new Schema({
    adId: String,
    answerAutorUserId: String,
    answerText: String,
    createdAt: Date,
})