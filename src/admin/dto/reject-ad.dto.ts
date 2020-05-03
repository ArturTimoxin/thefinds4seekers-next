import { IsString } from "class-validator"; 
export class RejectAdDto {
    @IsString()
    readonly message: string;
}