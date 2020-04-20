import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdPhotosConfig } from '../shared/uploads.constants';
import { RegisterAdDto } from './dto/register-ad.dto';
import { AdsService } from './ads.service';

import { Location } from './interfaces/location.interface';

const MAX_COUNT_UPLOAD_PHOTOS = 3;

@Controller('ads')
export class AdsController {

    constructor(private readonly adsService: AdsService) {}

    @Get()
    getAllPoints(): string {
        return 'all ads points'
    }

    @Get(':id')
    getAdById(@Param('id') id): string {
        return `ad id = ${id}`;
    }

    @Post()
    @UseInterceptors(FilesInterceptor('photos', MAX_COUNT_UPLOAD_PHOTOS, AdPhotosConfig))
    async createAd(@Body() registerAdDto: RegisterAdDto, @UploadedFiles() photos): Promise<string> {
        
        const newLocation = await this.adsService.createLocation(registerAdDto.location);

        
        // if(photos && !photos.length) {
        //     return 'null photos';
        // }

        return `location ${newLocation._id} was created`;

    }
}
