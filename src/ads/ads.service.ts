import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types }  from 'mongoose';
import { Ad } from './interfaces/ad.interface';
import { LocationDto } from './dto/location.dto';
import { Location } from './interfaces/location.interface';
import { Category } from './interfaces/category.interface';
import { AdInfo } from './interfaces/ad-info.interface';
import { AdMiniInfo } from './interfaces/ad-mini-info.interface';
import { ApproveAd } from './interfaces/approve-ad.interface';
import { Point } from './interfaces/point.interface';
import { NewAd } from './interfaces/new-ad.interface';
import { FindAds } from './interfaces/find-ads.interface';
import { AD_LOST_TYPE_ID, FIND_LIMIT } from '../shared/constants';
import { FindAdsDto } from './dto/find-ads.dto';
import { AnswersService } from '../answers/answers.service';
import fs = require('fs');
@Injectable()
export class AdsService {

    private answersService: AnswersService;

    constructor(
        @InjectModel('Ad') private adModel:Model<Ad>,
        @InjectModel('Location') private locationModel:Model<Location>,
        @InjectModel('Category') private categoryModel:Model<Category>,
        private moduleRef: ModuleRef,
    ) {}

    onModuleInit() {
        this.answersService = this.moduleRef.get(AnswersService, { strict: false });
    }

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
        const ad = await this.adModel
                              .findById(adId)
                              .populate('locationId')
                              .populate('userId');
        if(!ad) {
            throw new NotFoundException('Ad does not exist');
        }
        const adObj = ad.toObject();
        const { locationId, userId, photos, ...properiesAd } = adObj;

        let photosNames = photos;
        if(needFormatPhotos) {
            photosNames = ad.photos.map(photoName => `${process.env.APP_URL}/uploads/photos/${photoName}`);
        }
        
        return { 
            ...properiesAd,
            photos: photosNames,
            location: locationId, // populated
            user: userId, // populated
        };
    }

    async getPoints(): Promise<Point[]> {
        const locationsData = await this.adModel
                                        .find({ isApproved: true }, { _id: 1, typeId: 1 })
                                        .populate('locationId');

        return locationsData.map(locationData => ({
            typeId: locationData.typeId,
            lat: locationData.locationId.lat,
            lng: locationData.locationId.lng,
            adId: locationData._id,
        }));
    }

    async getLocationById(locationId): Promise<Location> {
        return await this.locationModel.findById(locationId);
    }

    async getAdMiniInfo(adId): Promise<AdMiniInfo> {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const adMiniInfo = await this.adModel
                                      .findById(adId, { title: 1, photos: 1})
                                      .populate('locationId categoryId');
        if(!adMiniInfo) {
            throw new NotFoundException('Ad does not exists');
        }

        const adMiniInfoData: AdMiniInfo = {
            title: adMiniInfo.title,
            address: adMiniInfo.locationId.address,
            categoryName: adMiniInfo.categoryId.category,
        }

        if(adMiniInfo.photos[0]) {
            adMiniInfoData.photo = `${process.env.APP_URL}/uploads/photos/${adMiniInfo.photos[0]}`;
        }

        return adMiniInfoData;
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryModel.find();
    }

    async getNotApprovedAds(): Promise<AdInfo[]> {

        const notAprovedAds = await this.adModel
                                        .find({ isApproved: false })
                                        .populate('locationId userId');
        if(!notAprovedAds.length) {
            throw new NotFoundException('Ads does not exists');
        }

        return notAprovedAds.map(notApprovedAd => {
            const notApprovedAdObj = notApprovedAd.toObject();
            const { locationId, userId, ...notApprovedAdProperties } = notApprovedAdObj;
            return {                
                ...notApprovedAdProperties,
                location: locationId,
                user: userId,
                photos: notApprovedAd.photos.map(photoName => `${process.env.APP_URL}/uploads/photos/${photoName}`),
            }
        })
    }

    async deleteAd(adId) {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const adData = await this.adModel.findById(adId).populate('userId');
        if(!adData) {
            throw new NotFoundException('Ad does not exist');
        }
        await this.locationModel.findByIdAndRemove(adData.locationId);
        await this.answersService.removeAdAnswers(adData._id);
        await this.adModel.findByIdAndRemove(adData._id);
        if(adData.photos.length) {
            adData.photos.forEach(photoName => {
                fs.unlinkSync(`../${process.env.UPLOADS_DIRRECTORY}/uploads/photos/${photoName}`);
            })
        }
        return { 
            ...adData.toObject(),
            user: adData.userId,
        };
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
                                         .select({ title: 1, photos: 1, createdAt: 1, typeId: 1 })
                                         .populate('locationId', 'address')
                                         .populate('categoryId', 'category');
        
        return newAds.map(newAd => {
            const { _id, title, typeId, createdAt, photos, locationId, categoryId } = newAd;
            const newAdObj: NewAd = {
                _id,
                title,
                address: locationId.address,
                categoryName: categoryId.category,
                typeId,
                createdAt,
            };
            if(photos.length && photos[0]) {
                newAdObj.photo = `${process.env.APP_URL}/uploads/photos/${photos[0]}`;
            }
            return newAdObj;
        });
    }

    async findAds({ word, typeId, categoryId, address, noveltyOrder, page } : FindAdsDto) {

        const requestFindObj: FindAds = {
            $or: [
                { title: { $regex: word, $options: "i" } },
                { description: { $regex: word, $options: "i" } },
            ],
            isApproved: true,
        }
        
        if(typeId) {
            requestFindObj.typeId = +typeId;
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

        const totalFindedDocuments = await this.adModel
                                           .find(requestFindObj, { _id: 1, title: 1, typeId: 1, createdAt: 1, photos: 1 })
                                           .count();

        const foundAdsResp = await this.adModel
                        .find(requestFindObj, { _id: 1, title: 1, typeId: 1, createdAt: 1, photos: 1 })
                        .populate('locationId', 'address')
                        .populate('categoryId', 'category')
                        .sort({ createdAt: orderCreatedAt })
                        .skip((page - 1) * FIND_LIMIT).limit(FIND_LIMIT);

        const foundAds = foundAdsResp.map(foundAd => ({
            _id: foundAd._id, 
            title: foundAd.title, 
            photo: foundAd.photos.length ? `${process.env.APP_URL}/uploads/photos/${foundAd.photos[0]}` : null,
            typeId: foundAd.typeId, 
            createdAt: foundAd.createdAt, 
            categoryName: foundAd.categoryId.category,
            address: foundAd.locationId.address,
        }));
        
        const totalPages = Math.ceil(totalFindedDocuments / FIND_LIMIT);

        return { foundAds, totalPages }
    }

    async getUserAds(userId) {
        if(!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Type error of ad id');
        }
        
        const userAds = await this.adModel
                                    .find({ userId }, { _id: 1, title: 1, isApproved: 1, typeId: 1, createdAt: 1, photos: 1, actualTo: 1 })
                                    .sort({ createdAt: 'desc' })
                                    .populate('locationId', 'address');

        return userAds.map(ad => ({
            id: ad._id,
            title: ad.title,
            photo: ad.photos.length ? `${process.env.APP_URL}/uploads/photos/${ad.photos[0]}` : null,
            typeId: ad.typeId,
            address: ad.locationId.address,
            createdAt: ad.createdAt,
            actualTo: ad.actualTo,
            isApproved: ad.isApproved,
        }));
    }

    async isUserOwner(adId, userId) {
        if(!Types.ObjectId.isValid(adId) || !Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Type error of id');
        }

        const adInfo = await this.adModel.findById(adId, { userId });
        return adInfo.userId.equals(userId);
    }
}
