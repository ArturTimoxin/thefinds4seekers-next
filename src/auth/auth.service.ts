import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { UsersService } from '../users/users.service';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });
  }

  async validateUser(payload: Payload) {
    return await this.usersService.findByPayload(payload);
  }
}