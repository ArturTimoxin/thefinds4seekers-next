import { Document } from 'mongoose';
export interface Ad extends Document {
    title: string,
    description: string,
    photos: string[],
    typeId: number,
    locationId: any, // any beacuse can be populate with collection and give obj
    categoryId: any,
    createdAt: Date,
    lostOrFoundAt?: Date,
    userId: any,
    secretQuestion?: string,
    secretAnswer?: string,
    isApproved: boolean,
    actualTo: Date,
}
