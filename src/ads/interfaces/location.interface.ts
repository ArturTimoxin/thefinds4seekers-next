import { Document } from 'mongoose';
export interface Location extends Document {
    address: string,
    lat: number,
    lng: number,
}