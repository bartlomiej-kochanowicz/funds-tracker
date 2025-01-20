"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const bcrypt = require("bcrypt");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const redis_1 = require("../../../constants/redis");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("../auth.service");
let PasswordService = class PasswordService {
    constructor(authService, prisma, configService, redisService) {
        this.authService = authService;
        this.prisma = prisma;
        this.configService = configService;
        this.redisService = redisService;
        this.redis = this.redisService.getOrThrow();
    }
    async resetPassword(resetPasswordInput) {
        const { email, token } = resetPasswordInput;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error("api.account-not-found");
        }
        const { uuid, name } = user;
        this.redis.set(resetPasswordToken, uuid, "EX", redis_1.ttl24h);
        const resetPasswordLink = `${this.configService.get("WEBAPP_URL")}/reset-password?token=${resetPasswordToken}`;
        await this.authService.sendEmailWithResetPasswordLink(email, name, resetPasswordLink);
        return {
            success: true,
        };
    }
    async setNewPassword(setNewPasswordInput) {
        const { resetToken, token, password: newPassword } = setNewPasswordInput;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const uuid = await this.redis.get(resetToken);
        if (!uuid) {
            throw new common_1.ForbiddenException("api.reset-password-token-expired");
        }
        const { password: currentPassword } = await this.prisma.user.findUnique({
            where: {
                uuid,
            },
        });
        const isPasswordsMatches = await bcrypt.compare(newPassword, currentPassword);
        if (isPasswordsMatches)
            throw new common_1.ForbiddenException("api.new-password-must-be-different-from-the-old-one");
        await this.redis.del(resetToken);
        await this.prisma.user.update({
            where: {
                uuid,
            },
            data: {
                password: await this.authService.hashData(newPassword),
            },
        });
        return {
            success: true,
        };
    }
};
exports.PasswordService = PasswordService;
exports.PasswordService = PasswordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService,
        config_1.ConfigService,
        nestjs_redis_1.RedisService])
], PasswordService);
//# sourceMappingURL=password.service.js.map