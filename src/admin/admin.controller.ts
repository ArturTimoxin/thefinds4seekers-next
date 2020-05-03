import { Controller, Get, UseGuards, Param, Delete, Body, Put } from '@nestjs/common';
import { AdsService } from '../ads/ads.service';
import { AdInfo } from '../ads/interfaces/ad-info.interface';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../shared/admin.guard';
import { sendMessageToEmail } from '../shared/mail-transporter';
import { getRejectAdMessageText } from '../shared/email-texts.util';
import { RejectAdDto } from './dto/reject-ad.dto';
import { ApproveAdDto } from './dto/approve-ad.dto';
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

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Delete('reject-ad/:id')
    async rejectAd(@Body() rejectAdDto: RejectAdDto, @Param('id') id) {
        const removedAd = await this.adsService.deleteAd(id);
        sendMessageToEmail({ 
            email: removedAd.user.email,
            message: getRejectAdMessageText(rejectAdDto.message),
        })
        return removedAd;
    }   

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Put('/approve-ad')
    async approveAd(@Body() approveAdDto: ApproveAdDto) {
        return await this.adsService.approveAd(approveAdDto);
    }

}