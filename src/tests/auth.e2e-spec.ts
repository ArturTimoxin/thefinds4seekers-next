import { HttpStatus } from '@nestjs/common';

import 'dotenv/config';
import { mongodbUri } from '../config/configuration';

import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { UserSchema } from '../users/schemas/user.schema';
import { LoginDto } from '../auth/dto/login.dto';
import { RegisterDto } from '../auth/dto/register.dto';

let registeredUserId: string;
const userSchema = new mongoose.Schema(UserSchema);

beforeAll(async () => {
  await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

describe('AUTH', () => {

  const user: RegisterDto = {
    email: 'test2@mail.com',
    password: '123456',
    firstname: 'TEST',
    lastname: 'USER',
    phone: '+380964532792'
  };

  const login: LoginDto = {
    email: 'test2@mail.com',
    password: '123456',
  };

  const adminLogin: LoginDto = {
    email: 'test_admin_user@mail.com',
    password: '123456',
  }

  it('should register user', () => {
    return request(process.env.APP_URL)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        registeredUserId = body.user._id;

        expect(body.token).toBeDefined();
        expect(body.user.email).toEqual(user.email);
        expect(body.user.password).toBeUndefined();
        expect(body.user.isAdmin).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should reject duplicate registration', () => {
    return request(process.env.APP_URL)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual('User already exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login user', () => {
    return request(process.env.APP_URL)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(login)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.email).toEqual(login.email);
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should login admin', () => {
    return request(process.env.APP_URL)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(adminLogin)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.email).toEqual(adminLogin.email);
        expect(body.user.password).toBeUndefined();
        expect(body.user.isAdmin).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });
});


afterAll(async done => {
    // delete test user record after test
    const createdUserSchema = await mongoose.model('User', userSchema);
    await createdUserSchema.findByIdAndRemove(registeredUserId);
    await mongoose.disconnect(done);
});