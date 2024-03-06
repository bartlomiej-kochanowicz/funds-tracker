import "tsconfig-paths/register";
import { Test } from "@nestjs/testing";
import { AppModule } from "@src/app.module";
import { PrismaService } from "@services/prisma/prisma.service";

export default async () => {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	const app = moduleRef.createNestApplication();

	await app.init();

	const prismaService = moduleRef.get<PrismaService>(PrismaService);

	await prismaService.cleanDatabase();

	await app.close();
};
