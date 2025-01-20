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
exports.SignInService = void 0;
const env_1 = require("../../../config/env");
const cookies_1 = require("../../../constants/cookies");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const auth_service_1 = require("../auth.service");
let SignInService = class SignInService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async signInLocal(signInInput, res) {
        const { email, password, token } = signInInput;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.ForbiddenException("api.account-not-found");
        const isPasswordsMatches = await bcrypt.compare(password, user.password);
        if (!isPasswordsMatches)
            throw new common_1.ForbiddenException("api.wrong-password");
        if (user.confirmationCodeHash) {
            throw new common_1.ForbiddenException("api.account-not-confirmed");
        }
        const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email);
        await this.authService.addSession(user.uuid, refreshToken, this.authService.genereteIpName(res));
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
    async signInLocalForTests(email, sessionName) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email);
        await this.authService.addSession(user.uuid, refreshToken, sessionName);
        return {
            accessToken,
            refreshToken,
        };
    }
    async checkEmail(emailInput) {
        const { email, token } = emailInput;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        return {
            exist: Boolean(user),
        };
    }
};
exports.SignInService = SignInService;
exports.SignInService = SignInService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], SignInService);
//# sourceMappingURL=sign-in.service.js.map