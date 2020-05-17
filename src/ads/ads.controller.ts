import { 
    HttpException, HttpStatus, Controller, Get, Post, Body, Param, 
    UseInterceptors, UploadedFiles, Delete, Query, UseGuards, 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generatePassword } from '../shared/generate-password.util';
import { RegisterAdDto } from './dto/register-ad.dto';
import { FindAdsDto } from './dto/find-ads.dto';
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
import { addMounths } from '../shared/add-months.util';
import { AuthGuard } from '@nestjs/passport';
import { User as UserDocument } from '../users/interfaces/user.interface';
import { User } from '../shared/user.decorator';

const MAX_COUNT_UPLOAD_PHOTOS = 3;
@Controller('ads')
export class AdsController {

    constructor(
        private readonly adsService: AdsService,
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Get('find')
    async findAds(@Query() findAdsDto: FindAdsDto) {
        return await this.adsService.findAds(findAdsDto);
    }

    @Get('new')
    getNewAds(): Promise<NewAd[]> {
        return this.adsService.getNewAds();
    }

    @Get('points')
    getAllPoints(): Promise<Point[]>  {
        return this.adsService.getPoints();
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    getUserAds(@User() user: UserDocument) {
        return this.adsService.getUserAds(user._id);
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
        return this.adsService.getAdById(id);
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
            actualTo: addMounths(new Date(), 2)
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

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteAdById(@Param('id') id, @User() user: UserDocument) {
        const isOwner = await this.adsService.isUserOwner(id, user._id);
        if(!isOwner) {
            throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
        }
        return this.adsService.deleteAd(id);
    }
}   