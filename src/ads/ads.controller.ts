import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generatePassword } from '../shared/generate-password.util';
import { RegisterAdDto } from './dto/register-ad.dto';
import { AdsService } from './ads.service';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { AdInfo } from './interfaces/ad-info.interface';
import { AdMiniInfo } from './interfaces/ad-mini-info.interface';
import { Category } from './interfaces/category.interface';
import { Payload } from '../auth/interfaces/payload.interface';
import { Point } from './interfaces/point.interface';
import { NewAd } from './interfaces/new-ad.interface';
import { sendMessageToEmail } from '../shared/mail-transporter';
import { getRegisterAdAndUserText } from '../shared/email-texts.util';
import { AdPhotosConfig } from '../config/uploads.constants';
import { addMonth } from '../shared/add-month.util';

const MAX_COUNT_UPLOAD_PHOTOS = 3;
@Controller('ads')
export class AdsController {

    constructor(
        private readonly adsService: AdsService,
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    
    @Get('new')
    getNewAds(): Promise<NewAd[]> {
        return this.adsService.getNewAds();
    }

    @Get('points')
    getAllPoints(): Promise<Point[]>  {
        return this.adsService.getPoints();
    }

    @Get('mini-info/:id')
    getAdMiniInfo(@Param('id') id): Promise<AdMiniInfo> {
        return this.adsService.getAdMiniInfo(id);
    }

    @Get('categories')
    getCategories(): Promise<Category[]> {
        return this.adsService.getCategories();
    }

    @Get(':id')
    getAdById(@Param('id') id): Promise<AdInfo> {
        return this.adsService.findOneAd(id, true);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('photos', MAX_COUNT_UPLOAD_PHOTOS, AdPhotosConfig))
    async createAd(@Body() registerAdDto: RegisterAdDto, @UploadedFiles() photos) {

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
            typeId: +typeId,
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

        if(photos && photos.length) {
            adInfo.photos = photos.map(photo => photo.filename);
        }

        await this.adsService.createAd(adInfo);
        
        const payload: Payload = {
            email: user.email,
            isAdmin: false,
        }
        const token = await this.authService.signPayload(payload);

        return { user, token };
    }
}