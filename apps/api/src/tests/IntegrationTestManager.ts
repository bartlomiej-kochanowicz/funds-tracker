import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "@services/prisma/prisma.service";
import { testUser } from "@tests/stubs/testUser.stub";
import { AppModule } from "@src/app.module";
import { SigninService } from "@app/auth/services/signin.service";
import { SignupService } from "@app/auth/services/signup.service";

export class IntegrationTestManager {
	public httpServer: any;

	private app: INestApplication;

	private accessToken: string;

	private refreshToken: string;

	private prismaService: PrismaService;

	private signinService: SigninService;

	private signupService: SignupService;

	async beforeAll(): Promise<void> {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		this.app = moduleRef.createNestApplication();
		this.app.use(cookieParser());

		await this.app.init();
		this.httpServer = this.app.getHttpServer();

		this.prismaService = moduleRef.get<PrismaService>(PrismaService);
		this.signinService = moduleRef.get<SigninService>(SigninService);
		this.signupService = moduleRef.get<SignupService>(SignupService);

		const { email } = await this.prismaService.user.findUnique({
			where: {
				email: testUser.email,
			},
		});

		const { accessToken, refreshToken } = await this.signinService.signinLocalForTests(
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

	getSigninService(): SigninService {
		return this.signinService;
	}

	getSignupService(): SignupService {
		return this.signupService;
	}

	getAccessToken(): string {
		return this.accessToken;
	}

	getRefreshToken(): string {
		return this.refreshToken;
	}
}
