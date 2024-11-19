import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "@services/prisma/prisma.service";
import supertokens from "supertokens-node";
import { AppModule } from "./app.module";
import { SupertokensExceptionFilter } from "./app/auth/auth.filter";

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	app.enableCors({
		origin: ["http://localhost:3000"],
		allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
		credentials: true,
	});

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new SupertokensExceptionFilter());

	await app.listen(process.env.PORT || 4000);
};

bootstrap();
