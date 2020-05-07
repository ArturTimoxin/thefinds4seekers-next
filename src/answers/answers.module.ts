import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AdsModule } from '../ads/ads.module';
import { AuthModule } from '../auth/auth.module';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswerSchema } from './schemas/answer.schema';

const AnswerModels = MongooseModule.forFeature([
  { name: 'Answer', schema: AnswerSchema },
]);

@Module({
  imports: [
    AdsModule,
    UsersModule,
    AnswerModels,
    AuthModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService, AnswerModels],
})
export class AnswersModule {}
