import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "@app/prisma/prisma.service";
import { AppModule } from "./app.module";

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	app.enableCors({
		credentials: true,
		exposedHeaders: ["Set-cookie"],
		origin: ["http://localhost:3000"],
	});

	app.use(cookieParser());

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(process.env.PORT || 4000);
};

bootstrap();
