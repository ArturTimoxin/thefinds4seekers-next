import { IsString, IsNumber, IsDateString, ValidateNested, IsOptional, IsDefined, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';
import { UserInfoDto } from '../../users/dto/user-info.dto'; 
import { Document } from 'mongoose';
export class RegisterAdDto {
    @IsString()
    readonly title!: string;

    @IsString()
    readonly description!: string;

    readonly photos?: string[];

    @IsNumber()
    readonly typeId!: number;

    @IsNumber()
    readonly categoryId!: number;

    @IsDefined()
    @ValidateNested()
    @Type(() => LocationDto)
    readonly location!: LocationDto;

    @IsDefined()
    @ValidateNested()
    @Type(() => UserInfoDto)
    readonly user!: UserInfoDto;

    @IsOptional()
    @IsDateString()
    readonly lostOrFoundAt?: Date;

    @IsOptional()
    @IsString()
    readonly secretQuestion?: string;

    // validate answer if req has secret_question
    @ValidateIf(regAd => regAd.secret_question)
    @IsString()
    readonly secretAnswer?: string;
}