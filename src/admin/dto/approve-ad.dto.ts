import { IsString, IsNumber, IsMongoId } from "class-validator"; 
export class ApproveAdDto {
    @IsMongoId()
    readonly id: string;

    @IsNumber()
    readonly typeId: number;

    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly address: string;

    @IsMongoId()
    readonly categoryId: string;
}