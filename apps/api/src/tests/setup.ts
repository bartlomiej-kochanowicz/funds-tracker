import "tsconfig-paths/register";
import { Test } from "@nestjs/testing";
import { PrismaService } from "@services/prisma/prisma.service";
import { AppModule } from "@src/app.module";
import { testUser } from "@tests/stubs/testUser.stub";
import { Response } from "express";
import { RegisterConfirmInput } from "@app/auth/inputs";
import { RegisterService } from "@src/app/auth/services/register.service";

export default async () => {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	const app = moduleRef.createNestApplication();

	await app.init();

	const prismaService = moduleRef.get<PrismaService>(PrismaService);
	const registerService = moduleRef.get<RegisterService>(RegisterService);

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

	await registerService.registerLocal(testUser);

	const registerConfirmInput: RegisterConfirmInput = {
		email: testUser.email,
		code: "123456",
		token: testUser.token,
	};

	await registerService.confirmRegister(registerConfirmInput, res);

	await app.close();
};
