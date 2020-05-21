import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types }  from 'mongoose';
import { Answer } from './interfaces/answer.interface';
import { Ad } from '../ads/interfaces/ad.interface';
import { AD_FOUND_TYPE_ID } from '../shared/constants';
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

    async getAnswers(userId) {
        if(!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Type error of user id');
        }
        const adsFoundData = await this.adModel.find(
                                            { 
                                                userId, 
                                                typeId: AD_FOUND_TYPE_ID, 
                                                secretQuestion: { $ne: null }  
                                            },
                                            { _id: 1, title: 1, secretQuestion: 1 }
                                        )
                                        .sort({ createdAt: 'desc' });
        const adsInfoWithAnswers = [];
        for(let i = 0; i < adsFoundData.length; i++) {
            const answers = await this.answerModel
                                        .find({ adId: adsFoundData[i]._id }, { _id: 1, answerText: 1, createdAt: 1 })
                                        .sort({ createdAt: 'desc' })
                                        .populate('answerAutorUserId', 'firstname lastname phone email');
            const transformedAnswer = answers.map(answer => { 
                const { answerAutorUserId, _id, answerText, createdAt } = answer;
                return {
                    _id, answerText, createdAt,
                    answerAutorUserData: answerAutorUserId
                }
            })
            const { _id, title, secretQuestion } = adsFoundData[i];
            adsInfoWithAnswers.push({ adId: _id, titleAd: title, secretQuestion, answers: transformedAnswer })
        }

        return adsInfoWithAnswers
    }

    async deleteAnswer(answerId) {
        if(!Types.ObjectId.isValid(answerId)) {
            throw new BadRequestException('Type error of answer id');
        }

        return await this.answerModel.findByIdAndRemove(answerId);
    }

    async getAnswerData(answerId) {
        const answer = await this.answerModel.findById(answerId)
                                             .populate('answerAutorUserId', 'firstname lastname phone email')
                                             .populate('adId', 'title');
        if(!answer) {
            throw new NotFoundException('Answer not found');
        }

        return answer;
    }
}
