import { Document } from 'mongoose';

export interface Answer extends Document {
    adId: string;
    answerAutorUserId: string;
    answerText: string;
    createdAt: Date;
}