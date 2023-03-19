import 'tsconfig-paths/register';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@app/prisma/prisma.service';
import { AppModule } from '@app/app.module';
import { testUser } from '@common/tests/stubs/testUser.stub';
import { AuthService } from '@app/auth/auth.service';
import { Response } from 'express';
import { ConfirmSignupInput } from '@app/auth/inputs';

export default async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  const prismaService = moduleRef.get<PrismaService>(PrismaService);
  const authService = moduleRef.get<AuthService>(AuthService);

  await prismaService.cleanDatabase();

  const res = {} as Response;

  res.req = {} as any;

  res.req.headers = {
    'user-agent': 'main-user-session',
  };

  res.req.ip = '::ffff:127.0.0.1';

  res.cookie = (): any => {};

  await authService.signupLocal(testUser);

  const confirmSignupInput: ConfirmSignupInput = {
    email: testUser.email,
    code: '123456',
    token: testUser.token,
  };

  await authService.confirmSignup(confirmSignupInput, res);

  await app.close();
};
