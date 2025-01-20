"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
const testing_1 = require("@nestjs/testing");
const prisma_service_1 = require("../services/prisma/prisma.service");
const app_module_1 = require("../app.module");
const test_user_stub_1 = require("./stubs/test-user.stub");
const sign_up_service_1 = require("../app/auth/services/sign-up.service");
exports.default = async () => {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    const prismaService = moduleRef.get(prisma_service_1.PrismaService);
    const signUpService = moduleRef.get(sign_up_service_1.SignUpService);
    await prismaService.cleanDatabase();
    const res = {
        req: {
            ip: "::ffff:127.0.0.1",
            headers: {
                "user-agent": "main-user-session",
            },
        },
    };
    res.cookie = () => { };
    await signUpService.signUpLocal(test_user_stub_1.testUser);
    const confirmSignUpInput = {
        email: test_user_stub_1.testUser.email,
        code: "123456",
        token: test_user_stub_1.testUser.token,
    };
    await signUpService.confirmSignUp(confirmSignUpInput, res);
    await app.close();
};
//# sourceMappingURL=setup.js.map