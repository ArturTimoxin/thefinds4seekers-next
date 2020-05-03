import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './shared/validation.pipe';
import express = require("express");
import { uploadsPath } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(express.static(uploadsPath));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
