import { Module } from '@nestjs/common';
import { AdsModule } from '../ads/ads.module';
import { UsersModule } from '../users/users.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [AdsModule, UsersModule],
    controllers: [AdminController],
    providers: [AdminService],
    
})
export class AdminModule {}
