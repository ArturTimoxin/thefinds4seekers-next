import { IsString, IsEmail, IsPhoneNumber, IsMongoId, IsOptional } from 'class-validator';

export class UserInfoDto {

    @IsOptional()
    @IsMongoId()
    readonly userId?: string;

    @IsString()
    readonly firstname: string;

    @IsString()
    readonly lastname: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly phone: string;
}
