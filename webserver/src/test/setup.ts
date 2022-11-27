import 'tsconfig-paths/register';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from 'app.module';
import { testUser } from 'auth/tests/stubs/signin.stub';

export default async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  const prismaService = moduleRef.get<PrismaService>(PrismaService);

  await prismaService.user.create({
    data: testUser,
  });

  await app.close();
};
