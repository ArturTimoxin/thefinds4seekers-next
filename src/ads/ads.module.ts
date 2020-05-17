import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdSchema } from './schemas/ad.schema';
import { LocationSchema } from './schemas/location.schema'
import { CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

const AdModels = MongooseModule.forFeature([
  { name: 'Ad', schema: AdSchema },
  { name: 'Location', schema: LocationSchema },
  { name: 'Category', schema: CategorySchema },
]);

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdModels
  ],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService, AdModels],
})
export class AdsModule {}
