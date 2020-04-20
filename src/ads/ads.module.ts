import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdSchema } from './schemas/ad.schema';
import { LocationSchema } from './schemas/location.schema'
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ad', schema: AdSchema },
      { name: 'Location', schema: LocationSchema },
    ]),
  ],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
