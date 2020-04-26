import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { generatePassword } from '../shared/generate-password.util';
import { RegisterAdDto } from './dto/register-ad.dto';
import { AdsService } from './ads.service';
import { UsersService } from 'src/users/users.service';
import { Ad } from './interfaces/ad.interface';
import { Location } from './interfaces/location.interface';
import { sendMessageToEmail } from '../shared/mail-transporter';
import { getRegisterAdAndUserText } from '../shared/email-texts.util';
import { addMonth } from '../shared/add-month.util';

const MAX_COUNT_UPLOAD_PHOTOS = 3;
@Controller('ads')
export class AdsController {

    constructor(
        private readonly adsService: AdsService,
        private readonly usersService: UsersService,
    ) {}

    @Get('locations')
    getAllLocations(): Promise<Location[]>  {
        return this.adsService.getLocations();
    }

    @Get(':id')
    getAdById(@Param('id') id): Promise<Ad> {
        return this.adsService.findOneAd(id);
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'photos', maxCount: MAX_COUNT_UPLOAD_PHOTOS },
    ]))
    async createAd(@Body() registerAdDto: RegisterAdDto, @UploadedFiles() photos): Promise<Ad> {

        const newLocation = await this.adsService.createLocation(registerAdDto.location);
        const { email, phone, firstname, lastname } = registerAdDto.user;

        let user = await this.usersService.findByPayload({ email, isAdmin: false });
        if(!user) {
            const generatedPassword = generatePassword();
            user = await this.usersService.create({ email, password: generatedPassword, phone, firstname, lastname });
            sendMessageToEmail({
                email,
                message: getRegisterAdAndUserText(email, generatedPassword),
            });
        }

        const { title, description, typeId, categoryId, lostOrFoundAt, secretQuestion, secretAnswer } = registerAdDto;

        const adInfo = {
            title,
            description,
            photos: [],
            typeId,
            locationId: newLocation._id,
            categoryId,
            createdAt: new Date(),
            lostOrFoundAt,
            userId: user._id,
            secretQuestion,
            secretAnswer,
            isApproved: false,
            actualTo: addMonth(new Date(), 2)
        };

        if(photos && !photos.length) {
            adInfo.photos = photos.map(photo => photo.originalname);
        }

        return this.adsService.createAd(adInfo);
    }

    @Get('locations/:id')
    getAdByLocationId(@Param('id') id): Promise<Ad>  {
        return this.adsService.getAdByLocationId(id);
    }
}

