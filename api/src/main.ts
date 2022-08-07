import { NestFactory } from '@nestjs/core';
import { SERVER_PORT } from 'config/env';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  console.log('SERVER_PORT', SERVER_PORT);
  await app.listen(3001);
};

bootstrap();
