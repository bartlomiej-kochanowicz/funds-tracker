"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const env_1 = require("common/config/env");
const prisma_service_1 = require("prisma/prisma.service");
const app_module_1 = require("./app.module");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.enableCors({
        credentials: true,
        origin: ['http://localhost:3000'],
        exposedHeaders: ['Set-cookie'],
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(env_1.API_PORT);
};
bootstrap();
//# sourceMappingURL=main.js.map