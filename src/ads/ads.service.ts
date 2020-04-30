import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types }  from 'mongoose';
import { Ad } from './interfaces/ad.interface';
import { Location } from './interfaces/location.interface';
import { Category } from './interfaces/category.interface';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel('Ad') private adModel:Model<Ad>,
        @InjectModel('Location') private locationModel:Model<Location>,
        @InjectModel('Category') private categoryModel:Model<Category>,
    ) {}

    async createLocation(location: LocationDto): Promise<Location> {
        const newLocation = new this.locationModel(location);
        return await newLocation.save();
    }

    async createAd(ad: any): Promise<Ad> {
        const newAd = new this.adModel(ad);
        return await newAd.save();
    }

    async findOneAd(adId): Promise<Ad> {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const ad = await this.adModel.findOne({ _id: adId });
        if(!ad) {
            throw new NotFoundException('Ad does not exist');
        }
        return ad;
    }

    async getLocations(): Promise<Location[]> {
        return this.locationModel.find();
    }

    async getAdByLocationId(locationId): Promise<Ad> {

        if(!Types.ObjectId.isValid(locationId)) {
            throw new BadRequestException('Type error of location id');
        }
        const ad = await this.adModel.findOne({ locationId });
        if(!ad) {
            throw new NotFoundException('Ad does not exist');
        }
        return ad;
    }

    async getCategories(): Promise<Category[]> {
        return this.categoryModel.find();
    }
}
