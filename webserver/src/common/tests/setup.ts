import 'tsconfig-paths/register';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from 'app.module';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { AuthService } from 'auth/auth.service';
import { Response } from 'express';
import * as sinon from 'sinon';

export default async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  const prismaService = moduleRef.get<PrismaService>(PrismaService);
  const authService = moduleRef.get<AuthService>(AuthService);

  await prismaService.cleanDatabase();

  const res = sinon.stub().returns({
    req: {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      },
    },
  });

  await authService.signupLocal(testUser, res());

  await app.close();
};
