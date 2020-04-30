import { Document } from 'mongoose';

export interface Category extends Document {
    category: string,
}