import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "@services/prisma/prisma.service";
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

	const port = process.env.PORT || 4000;

	await app.listen(port);

	console.log(`Funds Tracker Api listening on port ${port}`);
};

bootstrap();
