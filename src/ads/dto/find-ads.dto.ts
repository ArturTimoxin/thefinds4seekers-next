import { IsString, IsNumber, IsMongoId, IsOptional } from "class-validator"; 

export class FindAdsDto {
    @IsString()
    word: string;

    @IsOptional()
    @IsNumber()
    typeId?: number;

    @IsOptional()
    @IsMongoId()
    categoryId?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    noveltyOrder?: string;
}