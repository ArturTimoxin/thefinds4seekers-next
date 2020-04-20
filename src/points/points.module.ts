import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { PointSchema } from './schemas/point.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Point', schema: PointSchema }])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
