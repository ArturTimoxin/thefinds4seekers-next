import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types }  from 'mongoose';
import { Ad } from './interfaces/ad.interface';
import { LocationDto } from './dto/location.dto';
import { Location } from './interfaces/location.interface';
import { Category } from './interfaces/category.interface';
import { User } from '../users/interfaces/user.interface';
import { AdInfo } from './interfaces/ad-info.interface';
import { AdMiniInfo } from './interfaces/ad-mini-info.interface';
import { ApproveAd } from './interfaces/approve-ad.interface';
import { Point } from './interfaces/point.interface';
import { NewAd } from './interfaces/new-ad.interface';
import { FindAds } from './interfaces/find-ads.interface';
import { AD_LOST_TYPE_ID } from '../shared/constants';
import { FindAdsDto } from './dto/find-ads.dto';
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
    
    async getAdById(adId: string): Promise<AdInfo> {
        const ad = await this.findOneAd(adId, true);
        const { secretQuestion, secretAnswer, user, ...adProperies } = ad;
        if(ad.typeId === AD_LOST_TYPE_ID) { 
            return { user, ...adProperies };
        }
        return { ...adProperies, secretQuestion };
    }

    async findOneAd(adId: string, needFormatPhotos: boolean): Promise<AdInfo> {
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
        let photosUrls = ad.photos;
        if(needFormatPhotos) {
            photosUrls = ad.photos.map(photoName => `${process.env.APP_URL}/uploads/photos/${photoName}`);
        }
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

    async getPoints(): Promise<Point[]> {
        const locationsData = await this.adModel.find({ isApproved: true }, { _id: 1, locationId: 1, typeId: 1 });
        const locations = [];

        for(let i = 0; i < locationsData.length; i++) {
            const locationData = await this.locationModel.findById(locationsData[i].locationId);
            locations.push({ 
                typeId: locationsData[i].typeId,
                lat: locationData.lat,
                lng: locationData.lng,
                adId: locationsData[i]._id,
            })
        }

        return locations;
    }

    async getLocationById(locationId): Promise<Location> {
        return await this.locationModel.findById(locationId);
    }

    async getAdMiniInfo(adId): Promise<AdMiniInfo> {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const adMiniInfo = await this.adModel.findById(adId, { title: 1, photos: 1, locationId: 1, categoryId: 1 });
        if(!adMiniInfo) {
            throw new NotFoundException('Ad does not exists');
        }
        const categoryObj = await this.getCategoryNameById(adMiniInfo.categoryId);
        const locationObj = await this.getLocationById(adMiniInfo.locationId);
        
        const adMiniInfoData: AdMiniInfo = {
            title: adMiniInfo.title,
            address: locationObj.address,
            categoryName: categoryObj.category,
        }

        if(adMiniInfo.photos[0]) {
            adMiniInfoData.photo = `${process.env.APP_URL}/uploads/photos/${adMiniInfo.photos[0]}`;
        }

        return adMiniInfoData;
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryModel.find();
    }

    async getCategoryNameById(categoryId): Promise<Category> {
        return this.categoryModel.findById(categoryId);
    }

    async getNotApprovedAds(): Promise<AdInfo[]> {
        const adsId = await this.adModel.find({ isApproved: false }, { _id: 1 });
        if(!adsId.length) {
            throw new NotFoundException('Ads does not exists');
        }
        const notAprovedAdsInfo = [];
        for(let i = 0; i < adsId.length; i++) {
            const adInfo = await this.findOneAd(adsId[i]._id, true);
            notAprovedAdsInfo.push(adInfo);
        }

        return notAprovedAdsInfo;
    }

    async deleteAd(adId) {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const adData = await this.findOneAd(adId, false);
        await this.locationModel.findByIdAndRemove(adData.location._id);
        await this.adModel.findByIdAndRemove(adData._id);
        return adData;
    }

    async approveAd(approveAdData: ApproveAd) {
        if(!Types.ObjectId.isValid(approveAdData.id)) {
            throw new BadRequestException('Type error of ad id');
        }
        const updatedAdData = await this.findOneAd(approveAdData.id, false);
        updatedAdData.title = approveAdData.title;
        updatedAdData.description = approveAdData.description;
        updatedAdData.typeId = approveAdData.typeId;
        updatedAdData.location.address = approveAdData.address;
        updatedAdData.categoryId = approveAdData.categoryId;
        updatedAdData.isApproved = true;
        await this.adModel.findByIdAndUpdate(approveAdData.id, updatedAdData, { new: true });
        return;
    }

    async getNewAds(): Promise<NewAd[]> {
        const newAds = await this.adModel.find({ isApproved: true })
                                         .sort({ createdAt: 'desc' })
                                         .limit(32)
                                         .select({ title: 1, photos: 1, locationId: 1, categoryId: 1, createdAt: 1, typeId: 1 });
        
        const newAdsData = [];

        for(let i = 0; i < newAds.length; i++) {
            const categoryObj = await this.getCategoryNameById(newAds[i].categoryId);
            const locationObj = await this.getLocationById(newAds[i].locationId);
            const { _id, title, typeId, createdAt, photos } = newAds[i];
            const newAdObj: NewAd = {
                _id,
                title,
                address: locationObj.address,
                categoryName: categoryObj.category,
                typeId,
                createdAt,
            };

            if(photos.length && photos[0]) {
                newAdObj.photo = `${process.env.APP_URL}/uploads/photos/${photos[0]}`;
            }

            newAdsData.push(newAdObj);
        }

        return newAdsData;
    }

    async findAds({ word, typeId, categoryId, address, noveltyOrder } : FindAdsDto) {

        const requestFindObj: FindAds = {
            $or: [
                { title: { $regex: word, $options: "i" } },
                { description: { $regex: word, $options: "i" } },
            ],
            isApproved: true,
        }
        
        if(typeId) {
            requestFindObj.typeId = typeId;
        }

        if(categoryId) {
            requestFindObj.categoryId = categoryId;
        }

        if(address) {
            const locationIdsObjs = await this.locationModel.find({ address: { $regex: address, $options: "i" }}, { _id: 1 });
            const locationIds = locationIdsObjs.map(locationObj => Types.ObjectId(locationObj._id));
            requestFindObj.locationId = {
                $in: locationIds
            }
        }

        const orderCreatedAt = noveltyOrder ? noveltyOrder : 'desc';

        return await this.adModel
                        .find(requestFindObj, { _id: 1, title: 1, typeId: 1, createdAt: 1 })
                        .sort({ createdAt: orderCreatedAt });
    }
}
