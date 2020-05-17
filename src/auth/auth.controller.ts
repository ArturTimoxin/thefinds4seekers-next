import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Payload } from './interfaces/payload.interface';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() userDTO: LoginDto) {
    const user = await this.usersService.findByLogin(userDTO);
    const payload: Payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDto) {
    const user = await this.usersService.create(userDTO);
    const payload: Payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
