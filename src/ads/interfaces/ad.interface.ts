import { Document } from 'mongoose';

export interface Ad extends Document {
    title: string,
    description: string,
    photos: string[],
    type_id: number,
    location_id: string,
    category_id: number,
    created_at: Date,
    lost_or_found_at?: Date,
    user_id: string,
    secret_qestion?: string,
    secret_answer?: string,
    is_approved: boolean,
    actual_to: Date,
}
