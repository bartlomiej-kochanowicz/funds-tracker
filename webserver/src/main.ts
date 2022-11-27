import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { API_PORT } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
    exposedHeaders: ['Set-cookie'],
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(API_PORT);
};

bootstrap();
