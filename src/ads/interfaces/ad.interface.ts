import { Document } from 'mongoose';

export interface Ad extends Document {
    title: string,
    description: string,
    photos: string[],
    typeId: number,
    locationId: string,
    categoryId: number,
    createdAt: Date,
    lostOrFoundAt?: Date,
    userId: string,
    secretQuestion?: string,
    secretAnswer?: string,
    isApproved: boolean,
    actualTo: Date,
}
