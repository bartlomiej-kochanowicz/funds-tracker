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
exports.TokenService = void 0;
const env_1 = require("../../../config/env");
const cookies_1 = require("../../../constants/cookies");
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../auth.service");
let TokenService = class TokenService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async refreshToken(userId, rt, res) {
        const user = await this.prisma.user.findUnique({
            where: { uuid: userId },
            select: {
                sessions: true,
                uuid: true,
                email: true,
                confirmationCodeHash: true,
            },
        });
        if (!user || !user.sessions.length)
            throw new common_1.ForbiddenException();
        if (user.confirmationCodeHash) {
            throw new common_1.ForbiddenException("api.account-not-confirmed");
        }
        const rtMatch = user.sessions.find(async ({ rtHash }) => await bcrypt.compare(rt, rtHash));
        if (!rtMatch)
            throw new common_1.ForbiddenException();
        const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email);
        await this.authService.updateSession(user.uuid, refreshToken, rtMatch.rtHash);
        res.cookie(cookies_1.COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
            maxAge: cookies_1.EXPIRES["15MIN"],
            secure: !env_1.IS_DEVELOPMENT,
            httpOnly: true,
        });
        res.cookie(cookies_1.COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
            maxAge: cookies_1.EXPIRES["15DAYS"],
            secure: !env_1.IS_DEVELOPMENT,
            httpOnly: true,
        });
        res.cookie(cookies_1.COOKIE_NAMES.IS_LOGGED_IN, true, {
            maxAge: cookies_1.EXPIRES["15DAYS"],
        });
        return {
            success: true,
        };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], TokenService);
//# sourceMappingURL=token.service.js.map