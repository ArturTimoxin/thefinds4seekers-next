import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types }  from 'mongoose';
import { Ad } from './interfaces/ad.interface';
import { Location } from './interfaces/location.interface';
import { Category } from './interfaces/category.interface';
import { User } from '../users/interfaces/user.interface';
import { LocationDto } from './dto/location.dto';
import { AdInfo } from './interfaces/ad-info.interface';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel('Ad') private adModel:Model<Ad>,
        @InjectModel('Location') private locationModel:Model<Location>,
        @InjectModel('Category') private categoryModel:Model<Category>,
        @InjectModel('User') private userModel: Model<User>,
    ) {}

    async createLocation(location: LocationDto): Promise<Location> {
        const newLocation = new this.locationModel(location);
        return await newLocation.save();
    }

    async createAd(ad: any): Promise<Ad> {
        const newAd = new this.adModel(ad);
        return await newAd.save();
    }

    async findOneAd(adId): Promise<AdInfo> {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const ad = await this.adModel.findOne({ _id: adId });
        if(!ad) {
            throw new NotFoundException('Ad does not exist');
        }
        const { 
            _id, title, description, locationId, userId, typeId, categoryId, 
            createdAt, lostOrFoundAt, secretQuestion, secretAnswer, isApproved, actualTo 
        } = ad;
        const photosUrls = ad.photos.map(photoName => `${process.env.APP_URL}/uploads/ads/${photoName}`);
        const location = await this.getLocationById(locationId);
        const autor = await this.userModel.findById(userId);
        return { 
            _id,
            title,
            description,
            photos: photosUrls,
            typeId,
            location,
            categoryId,
            lostOrFoundAt,
            user: autor,
            createdAt,
            secretQuestion, 
            secretAnswer, 
            isApproved,
            actualTo,
        };
    }

    async getLocations(): Promise<Location[]> {
        return await this.locationModel.find();
    }

    async getLocationById(locationId): Promise<Location> {
        return await this.locationModel.findById(locationId);
    }

    async getAdByLocationId(locationId): Promise<Ad> {

        if(!Types.ObjectId.isValid(locationId)) {
            throw new BadRequestException('Type error of location id');
        }
        const ad = await this.adModel.findOne({ locationId });
        if(!ad) {
            throw new NotFoundException('Ad does not exist');
        }
        ad.photos = ad.photos.map(photoName => `${process.env.APP_URL}/uploads/ads/${photoName}`);

        return ad;
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryModel.find();
    }

    async getNotApprovedAds(): Promise<AdInfo[]> {
        const adsId = await this.adModel.find({ isApproved: false }, { _id: 1 });
        if(!adsId.length) {
            throw new NotFoundException('Ads does not exists');
        }
        const notAprovedAdsInfo = [];
        for(let i = 0; i < adsId.length; i++) {
            const adInfo = await this.findOneAd(adsId[i]._id);
            notAprovedAdsInfo.push(adInfo);
        }

        return notAprovedAdsInfo;
    }
}
