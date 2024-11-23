import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "@services/prisma/prisma.service";
import { testUser } from "@tests/stubs/testUser.stub";
import { AppModule } from "@src/app.module";
import { LoginService } from "@src/app/auth/services/login.service";
import { RegisterService } from "@src/app/auth/services/register.service";

export class IntegrationTestManager {
	public httpServer: any;

	private app: INestApplication;

	private accessToken: string;

	private refreshToken: string;

	private prismaService: PrismaService;

	private loginService: LoginService;

	private registerService: RegisterService;

	async beforeAll(): Promise<void> {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		this.app = moduleRef.createNestApplication();
		this.app.use(cookieParser());

		await this.app.init();
		this.httpServer = this.app.getHttpServer();

		this.prismaService = moduleRef.get<PrismaService>(PrismaService);
		this.loginService = moduleRef.get<LoginService>(LoginService);
		this.registerService = moduleRef.get<RegisterService>(RegisterService);

		const { email } = await this.prismaService.user.findUnique({
			where: {
				email: testUser.email,
			},
		});

		const { accessToken, refreshToken } = await this.loginService.loginLocalForTests(
			email,
			"::ffff:127.0.0.1-main-user-session",
		);
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	async afterAll(): Promise<void> {
		await this.app.close();
	}

	getPrismaService(): PrismaService {
		return this.prismaService;
	}

	getLoginService(): LoginService {
		return this.loginService;
	}

	getRegisterService(): RegisterService {
		return this.registerService;
	}

	getAccessToken(): string {
		return this.accessToken;
	}

	getRefreshToken(): string {
		return this.refreshToken;
	}
}
