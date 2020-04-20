import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    lat: Number,
    lng: Number,
})