import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import config, { mongodbUri, uploadsPath } from './config/configuration';
import { HttpErrorFilter } from './shared/http-error.filter';
import { MulterModule } from '@nestjs/platform-express';
import { PointsModule } from './points/points.module';
import { AdsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AnswersController } from './answers/answers.controller';
import { AnswersService } from './answers/answers.service';
import { AnswersModule } from './answers/answers.module';
@Module({
  imports: [
    MongooseModule.forRoot(mongodbUri),
    MulterModule.register({
      dest: uploadsPath,
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
    PointsModule,
    AdsModule,
    UsersModule,
    AuthModule,
    AdminModule,
    AnswersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    AnswersService,
  ],
  controllers: [AnswersController],
})

export class AppModule {}
