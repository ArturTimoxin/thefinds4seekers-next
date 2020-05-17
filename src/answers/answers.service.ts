import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types }  from 'mongoose';
import { Answer } from './interfaces/answer.interface';
import { Ad } from '../ads/interfaces/ad.interface';

@Injectable()
export class AnswersService {
    constructor(
        @InjectModel('Answer') private answerModel:Model<Answer>,
        @InjectModel('Ad') private adModel:Model<Ad>,
    ) {}

    async saveAnswer(answer): Promise<Answer> {
        const newAnswer = new this.answerModel(answer);
        return await newAnswer.save();
    }

    async getSecretAnswer(adId) {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of ad id');
        }
        const ad = await this.adModel.findById(adId, { secretAnswer: 1 });
        return ad.secretAnswer;
    }

    async removeAdAnswers(adId) {
        if(!Types.ObjectId.isValid(adId)) {
            throw new BadRequestException('Type error of answerId id');
        }
        return await this.answerModel.deleteMany({ adId });
    }
}
