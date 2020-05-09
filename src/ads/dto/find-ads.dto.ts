import { IsString, IsNumber, IsMongoId, IsOptional } from "class-validator"; 

export class FindAdsDto {
    @IsString()
    word: string;

    @IsString()
    page: number;

    @IsOptional()
    @IsString()
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