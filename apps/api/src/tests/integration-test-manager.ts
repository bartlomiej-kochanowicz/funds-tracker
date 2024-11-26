import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "@services/prisma/prisma.service";
import { testUser } from "@src/tests/stubs/test-user.stub";
import { AppModule } from "@src/app.module";
import { SignInService } from "@src/app/auth/services/sign-in.service";
import { SignUpService } from "@src/app/auth/services/sign-up.service";

export class IntegrationTestManager {
	public httpServer: any;

	private app: INestApplication;

	private accessToken: string;

	private refreshToken: string;

	private prismaService: PrismaService;

	private signInService: SignInService;

	private signUpService: SignUpService;

	async beforeAll(): Promise<void> {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		this.app = moduleRef.createNestApplication();
		this.app.use(cookieParser());

		await this.app.init();
		this.httpServer = this.app.getHttpServer();

		this.prismaService = moduleRef.get<PrismaService>(PrismaService);
		this.signInService = moduleRef.get<SignInService>(SignInService);
		this.signUpService = moduleRef.get<SignUpService>(SignUpService);

		const { email } = await this.prismaService.user.findUnique({
			where: {
				email: testUser.email,
			},
		});

		const { accessToken, refreshToken } = await this.signInService.signInLocalForTests(
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

	getSignInService(): SignInService {
		return this.signInService;
	}

	getSignUpService(): SignUpService {
		return this.signUpService;
	}

	getAccessToken(): string {
		return this.accessToken;
	}

	getRefreshToken(): string {
		return this.refreshToken;
	}
}
