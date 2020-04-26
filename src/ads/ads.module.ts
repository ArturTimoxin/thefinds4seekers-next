import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdSchema } from './schemas/ad.schema';
import { LocationSchema } from './schemas/location.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ad', schema: AdSchema },
      { name: 'Location', schema: LocationSchema },
    ]),
    UsersModule,
  ],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
