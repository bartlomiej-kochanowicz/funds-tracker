import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { API_PORT } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(API_PORT);
};

bootstrap();
