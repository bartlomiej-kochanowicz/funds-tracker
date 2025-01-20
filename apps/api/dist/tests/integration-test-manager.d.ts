import { PrismaService } from "@services/prisma/prisma.service";
import { SignInService } from "@src/app/auth/services/sign-in.service";
import { SignUpService } from "@src/app/auth/services/sign-up.service";
export declare class IntegrationTestManager {
    httpServer: any;
    private app;
    private accessToken;
    private refreshToken;
    private prismaService;
    private signInService;
    private signUpService;
    beforeAll(): Promise<void>;
    afterAll(): Promise<void>;
    getPrismaService(): PrismaService;
    getSignInService(): SignInService;
    getSignUpService(): SignUpService;
    getAccessToken(): string;
    getRefreshToken(): string;
}
