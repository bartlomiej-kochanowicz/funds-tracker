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
exports.SignUpService = void 0;
const env_1 = require("../../../config/env");
const cookies_1 = require("../../../constants/cookies");
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const auth_service_1 = require("../auth.service");
let SignUpService = class SignUpService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async signUpLocal(signUpInput) {
        const { email, password, name, token } = signUpInput;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const hashedPwd = await this.authService.hashData(password);
        const existedUser = await this.prisma.user.findUnique({ where: { email } });
        if (existedUser) {
            throw new common_1.ForbiddenException("api.email-already-in-use");
        }
        const confirmationCode = this.authService.generateConfirmationCode();
        const hashedConfirmationCode = await this.authService.hashData(confirmationCode);
        const { uuid } = await this.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPwd,
                confirmationCodeHash: hashedConfirmationCode,
            },
        });
        if (!env_1.IS_TEST) {
            await this.authService.sendEmailWithConfirmCode(email, uuid, confirmationCode);
        }
        return {
            success: true,
        };
    }
    async confirmSignUp(confirmSignUpInput, res) {
        const { code, email, token } = confirmSignUpInput;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.ForbiddenException("api.account-not-found");
        }
        if (!user.confirmationCodeHash) {
            throw new common_1.ForbiddenException("api.email-already-confirmed");
        }
        const isConfirmationCodeMatches = env_1.IS_TEST || (await bcrypt.compare(code, user.confirmationCodeHash));
        if (!isConfirmationCodeMatches) {
            throw new common_1.ForbiddenException("api.wrong-confirmation-code");
        }
        await this.prisma.user.update({
            where: { uuid: user.uuid },
            data: { confirmationCodeHash: null },
        });
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
    async sendCode(sendCode) {
        const { email, token } = sendCode;
        const isHuman = await this.authService.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException("api.you-are-a-robot");
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.ForbiddenException("api.account-not-found");
        }
        if (!user.confirmationCodeHash) {
            throw new common_1.ForbiddenException("api.email-already-confirmed");
        }
        const confirmationCode = this.authService.generateConfirmationCode();
        const hashedConfirmationCode = await this.authService.hashData(confirmationCode);
        await this.prisma.user.update({
            where: { uuid: user.uuid },
            data: { confirmationCodeHash: hashedConfirmationCode },
        });
        if (!env_1.IS_TEST) {
            await this.authService.sendEmailWithConfirmCode(email, user.uuid, confirmationCode);
        }
        return {
            success: true,
        };
    }
};
exports.SignUpService = SignUpService;
exports.SignUpService = SignUpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], SignUpService);
//# sourceMappingURL=sign-up.service.js.map