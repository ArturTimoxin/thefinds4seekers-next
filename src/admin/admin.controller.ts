import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdsService } from '../ads/ads.service';
import { AdInfo } from '../ads/interfaces/ad-info.interface';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../shared/admin.guard';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adsService: AdsService,
    ) {}
    
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Get('ads')
    async getNotApprovedAds(): Promise<AdInfo[]> {
        return await this.adsService.getNotApprovedAds();
    }
}