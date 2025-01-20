"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
const testing_1 = require("@nestjs/testing");
const app_module_1 = require("../app.module");
const prisma_service_1 = require("../services/prisma/prisma.service");
exports.default = async () => {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    const prismaService = moduleRef.get(prisma_service_1.PrismaService);
    await prismaService.cleanDatabase();
    await app.close();
};
//# sourceMappingURL=teardown.js.map