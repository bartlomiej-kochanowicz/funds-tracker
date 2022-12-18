import 'tsconfig-paths/register';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from 'app.module';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { AuthService } from 'auth/auth.service';
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
        'user-agent': 'main-user-session',
      },
      ip: '::ffff:127.0.0.1',
    },
    cookie: sinon.stub(),
  });

  await authService.signupLocal(testUser, res());

  await app.close();
};
