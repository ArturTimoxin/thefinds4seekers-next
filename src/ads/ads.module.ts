import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdSchema } from './schemas/ad.schema';
import { LocationSchema } from './schemas/location.schema'
import { CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Ad', schema: AdSchema },
      { name: 'Location', schema: LocationSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService],
})
export class AdsModule {}
