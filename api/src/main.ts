import { NestFactory } from '@nestjs/core';
import { API_PORT } from 'common/config/env';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(API_PORT);
};

bootstrap();
