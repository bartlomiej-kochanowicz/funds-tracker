import { NestFactory } from '@nestjs/core';
import { API_PORT } from 'config/env';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(API_PORT);
};

bootstrap();
