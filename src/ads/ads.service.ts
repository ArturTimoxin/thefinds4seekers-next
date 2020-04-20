import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }  from 'mongoose';
import { Ad } from './interfaces/ad.interface';
import { Location } from './interfaces/location.interface';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel('Ad') private adModel:Model<Ad>,
        @InjectModel('Location') private locationModel:Model<Location>,
    ) {}

    async createLocation(location: LocationDto): Promise<Location> {
        const newLocation = new this.locationModel(location);
        return await newLocation.save();
    }

    async createAd(ad: Ad): Promise<Ad> {
        const newAd = new this.adModel(ad);
        return await newAd.save();
    }
}
