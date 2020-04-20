import { Schema } from 'mongoose';

export const LocationSchema = new Schema({
    address: String,
    lat: Number,
    lng: Number,
})