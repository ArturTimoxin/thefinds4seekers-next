import { Controller, Post, Body } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { UsersService } from '../users/users.service';
import { AnswerDto } from './dto/answer.dto';
import { generatePassword } from '../shared/generate-password.util';
import { sendMessageToEmail } from '../shared/mail-transporter';
import { getSuccessfulSaveAnswerText, getSuccessfulSaveAnswerAndRegisterText, sendAnswerToAdAutor } from '../shared/email-texts.util';
import { AdsService } from '../ads/ads.service';
import isSameStrings from '../shared/is-same-strings.util';
import { AD_LOST_TYPE_ID } from '../shared/constants';
import { Payload } from '../auth/interfaces/payload.interface';
import { AuthService } from 'src/auth/auth.service';

@Controller('answers')
export class AnswersController {
    constructor(
        private readonly answersService: AnswersService,
        private readonly usersService: UsersService,
        private readonly adsService: AdsService,
        private readonly authService: AuthService,
    ) {}

    @Post()
    async saveAnswer(@Body() answerDto: AnswerDto) {

        const { adId, answerText, user: { email, phone, firstname, lastname } } = answerDto;
        const adInfo = await this.adsService.findOneAd(adId, false);

        let user = await this.usersService.findByPayload({ email, isAdmin: false });

        const resp = { user: null, token: null, newAnswer: null, autorAdContactData: null };
        if(!user) {
            const generatedPassword = generatePassword();
            user = await this.usersService.create({ email, password: generatedPassword, phone, firstname, lastname });
            sendMessageToEmail({
                email,
                message: getSuccessfulSaveAnswerAndRegisterText(adInfo.title, email, generatedPassword),
            });
            const payload: Payload = {
                email: user.email,
                isAdmin: user.isAdmin,
            }
            resp.user = user;
            resp.token = await this.authService.signPayload(payload);
        } else {
            sendMessageToEmail({
                email,
                message: getSuccessfulSaveAnswerText(adInfo.title),
            });
        }

        resp.newAnswer = await this.answersService.saveAnswer({ adId, answerAutorUserId: user._id, answerText, createdAt: new Date() });

        if(adInfo.typeId === AD_LOST_TYPE_ID) return resp;

        const secretAnswer = await this.answersService.getSecretAnswer(adId);

        const isCorrectAnswer = isSameStrings(answerText, secretAnswer);
        if(isCorrectAnswer) {
            resp.autorAdContactData = adInfo.user;
        }

        sendMessageToEmail({
            email: adInfo.user.email,
            message: sendAnswerToAdAutor(adInfo.title, adInfo.secretQuestion, answerText, user, isCorrectAnswer),
        });

        return resp;
    }
}
