import { IsString, IsDefined, ValidateNested, IsMongoId } from "class-validator"; 
import { Type } from 'class-transformer';
import { UserInfoDto } from '../../users/dto/user-info.dto'; 

export class AnswerDto {
    
    @IsDefined()
    @IsMongoId()
    readonly adId!: string;

    @IsDefined()
    @IsString()
    readonly answerText!: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => UserInfoDto)
    readonly user!: UserInfoDto;
}