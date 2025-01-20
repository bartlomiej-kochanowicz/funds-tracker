import { PrismaService } from "@services/prisma/prisma.service";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { ResetPassword, SetNewPassword } from "../entities";
import { ResetPasswordInput, SetNewPasswordInput } from "../inputs";
export declare class PasswordService {
    private authService;
    private prisma;
    private readonly configService;
    private readonly redisService;
    private readonly redis;
    constructor(authService: AuthService, prisma: PrismaService, configService: ConfigService, redisService: RedisService);
    resetPassword(resetPasswordInput: ResetPasswordInput): Promise<ResetPassword>;
    setNewPassword(setNewPasswordInput: SetNewPasswordInput): Promise<SetNewPassword>;
}
