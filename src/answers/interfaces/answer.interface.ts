import { Document } from 'mongoose';

export interface Answer extends Document {
    adId: any;
    answerAutorUserId: any;
    answerText: string;
    createdAt: Date;
}