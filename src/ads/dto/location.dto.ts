import { IsNumber, IsString } from "class-validator"; 
export class LocationDto {
    
    @IsString()
    readonly address: string;

    @IsString()
    readonly lat: string;

    @IsString()
    readonly lng: string;
}