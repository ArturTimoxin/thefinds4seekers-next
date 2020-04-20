import { IsString, IsNumber, IsDateString, ValidateNested, IsOptional, IsDefined, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';
import { UserInfoDto } from './user-info.dto'; 

export class RegisterAdDto {
    @IsString()
    readonly title!: string;

    @IsString()
    readonly description!: string;

    readonly photos?: any[];

    @IsNumber()
    readonly type_id!: number;

    @IsNumber()
    readonly category_id!: number;

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
    readonly lost_or_found_at?: Date;

    @IsOptional()
    @IsString()
    readonly secret_question?: string;

    // validate answer if req has secret_question
    @ValidateIf(regAd => regAd.secret_question)
    @IsString()
    readonly secret_answer?: string;
}