import 'tsconfig-paths/register';
import { CookieOptions, Response } from 'express';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from 'app.module';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { AuthService } from 'auth/auth.service';

export default async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  const prismaService = moduleRef.get<PrismaService>(PrismaService);
  const authService = moduleRef.get<AuthService>(AuthService);

  await prismaService.cleanDatabase();

  await authService.signupLocal(testUser);

  await app.close();
};
