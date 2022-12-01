import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from 'prisma/prisma.service';
import { testUser } from 'common/tests/stubs/testUser.stub';
import { AuthService } from 'auth/auth.service';
import { AppModule } from 'app.module';

export class IntegrationTestManager {
  public httpServer: any;

  private app: INestApplication;

  private accessToken: string;

  private prismaService: PrismaService;

  async beforeAll(): Promise<void> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleRef.createNestApplication();
    this.app.use(cookieParser());

    await this.app.init();
    this.httpServer = this.app.getHttpServer();

    this.prismaService = moduleRef.get<PrismaService>(PrismaService);
    const authService = moduleRef.get<AuthService>(AuthService);

    const { uuid: userUuid } = await this.prismaService.user.findUnique({
      where: {
        email: testUser.email,
      },
    });

    const { accessToken } = await authService.signinLocalForTests(userUuid);
    this.accessToken = accessToken;
  }

  async afterAll(): Promise<void> {
    await this.app.close();
  }

  getPrismaService(): PrismaService {
    return this.prismaService;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
}
