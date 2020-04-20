
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Point } from './interfaces/point.interface';
import { Model, Types }  from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PointsService {

    constructor(@InjectModel('Point') private readonly pointModel:Model<Point>) {}

    async findAll(): Promise<Point[]> {
        return await this.pointModel.find();
    }

    async findOne(pointId): Promise<Point> {
        if(!Types.ObjectId.isValid(pointId)) {
            throw new BadRequestException('Type error of point id');
        }
        const point = await this.pointModel.findOne({ _id: pointId });
        if(!point) {
            throw new NotFoundException('Point does not exist');
        }
        return point;
    }   

    async create(point: Point): Promise<Point> {
        const newPoint = new this.pointModel(point);
        return await newPoint.save();
    }

    async delete(pointId: string): Promise<Point> {
        if(!Types.ObjectId.isValid(pointId)) {
            throw new BadRequestException('Type error of point id');
        }
        return await this.pointModel.findByIdAndRemove(pointId);
    }

    async update(pointId: string, point: Point): Promise<Point> {
        if(!Types.ObjectId.isValid(pointId)) {
            throw new BadRequestException('Type error of point id');
        }
        return await this.pointModel.findByIdAndUpdate(pointId, point, { new: true });
    }
}
