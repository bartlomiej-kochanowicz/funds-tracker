import 'tsconfig-paths/register';
import { Test } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { AppModule } from 'app.module';
import { testUser } from 'test/stubs/testUser.stub';

export default async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  await app.init();

  const prismaService = moduleRef.get<PrismaService>(PrismaService);

  await prismaService.cleanDatabase();

  await prismaService.user.create({
    data: {
      email: testUser.email,
      name: testUser.name,
      password: testUser.password,
    },
  });

  await app.close();
};
