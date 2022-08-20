import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { API_PORT, IS_DEVELOPMENT } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from './app.module';

const whitelist = ['https://funds-tracker.com'];

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || IS_DEVELOPMENT) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS ${origin}`));
      }
    },
  });

  await app.listen(API_PORT);
};

bootstrap();
