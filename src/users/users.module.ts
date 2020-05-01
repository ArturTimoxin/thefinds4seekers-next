import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

const UserModel = MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]);
@Module({
  imports: [UserModel],
  providers: [UsersService],
  exports: [UsersService, UserModel],
})

export class UsersModule {}
