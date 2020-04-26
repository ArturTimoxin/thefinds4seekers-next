import { IsNumber, IsString } from "class-validator"; 
import { Document } from 'mongoose';
export class LocationDto {
    
    @IsString()
    readonly address: string;

    @IsNumber()
    readonly lat: number;

    @IsNumber()
    readonly lng: number;
}