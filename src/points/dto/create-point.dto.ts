import { Document } from 'mongoose';

export class CreatePointDto extends Document {
    readonly title: string;
    readonly description: string;
    readonly image: string;
    readonly lat: number;
    readonly lng: number;
}