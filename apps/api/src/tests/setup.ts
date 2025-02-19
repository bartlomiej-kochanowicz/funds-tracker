import "tsconfig-paths/register";
import { Test } from "@nestjs/testing";
import { PrismaService } from "@services/prisma/prisma.service";
import { AppModule } from "@src/app.module";
import { testUser } from "@src/tests/stubs/test-user.stub";
import { Response } from "express";
import { ConfirmSignUpInput } from "@src/app/auth/dto";
import { SignUpService } from "@src/app/auth/services/sign-up.service";

export default async () => {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	const app = moduleRef.createNestApplication();

	await app.init();

	const prismaService = moduleRef.get<PrismaService>(PrismaService);
	const signUpService = moduleRef.get<SignUpService>(SignUpService);

	await prismaService.cleanDatabase();

	const res = {
		req: {
			ip: "::ffff:127.0.0.1",
			headers: {
				"user-agent": "main-user-session",
			},
		},
	} as Response;

	res.cookie = (): any => {};

	await signUpService.signUpLocal(testUser);

	const confirmSignUpInput: ConfirmSignUpInput = {
		email: testUser.email,
		code: "123456",
		token: testUser.token,
	};

	await signUpService.confirmSignUp(confirmSignUpInput, res);

	await app.close();
};
