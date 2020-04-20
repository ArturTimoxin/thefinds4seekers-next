import { Document } from 'mongoose';

export interface Point extends Document {
    title: string,
    description: string,
    image: string,
    lat: number,
    lng: number,
}