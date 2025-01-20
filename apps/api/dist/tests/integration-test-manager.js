"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTestManager = void 0;
const testing_1 = require("@nestjs/testing");
const cookieParser = require("cookie-parser");
const prisma_service_1 = require("../services/prisma/prisma.service");
const test_user_stub_1 = require("./stubs/test-user.stub");
const app_module_1 = require("../app.module");
const sign_in_service_1 = require("../app/auth/services/sign-in.service");
const sign_up_service_1 = require("../app/auth/services/sign-up.service");
class IntegrationTestManager {
    async beforeAll() {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        this.app = moduleRef.createNestApplication();
        this.app.use(cookieParser());
        await this.app.init();
        this.httpServer = this.app.getHttpServer();
        this.prismaService = moduleRef.get(prisma_service_1.PrismaService);
        this.signInService = moduleRef.get(sign_in_service_1.SignInService);
        this.signUpService = moduleRef.get(sign_up_service_1.SignUpService);
        const { email } = await this.prismaService.user.findUnique({
            where: {
                email: test_user_stub_1.testUser.email,
            },
        });
        const { accessToken, refreshToken } = await this.signInService.signInLocalForTests(email, "::ffff:127.0.0.1-main-user-session");
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    async afterAll() {
        await this.app.close();
    }
    getPrismaService() {
        return this.prismaService;
    }
    getSignInService() {
        return this.signInService;
    }
    getSignUpService() {
        return this.signUpService;
    }
    getAccessToken() {
        return this.accessToken;
    }
    getRefreshToken() {
        return this.refreshToken;
    }
}
exports.IntegrationTestManager = IntegrationTestManager;
//# sourceMappingURL=integration-test-manager.js.map