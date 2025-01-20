"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const prisma_service_1 = require("./services/prisma/prisma.service");
const app_module_1 = require("./app.module");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.enableCors({
        credentials: true,
        exposedHeaders: ["Set-cookie"],
        origin: ["http://localhost:3000"],
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(process.env.PORT || 4000);
};
bootstrap();
//# sourceMappingURL=main.js.map