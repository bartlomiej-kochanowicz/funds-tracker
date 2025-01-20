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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const UAParser = require("ua-parser-js");
const env_1 = require("../../config/env");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../../services/prisma/prisma.service");
const cookies_1 = require("../../constants/cookies");
const send_grid_service_1 = require("../../services/send-grid/send-grid.service");
const email_confirmation_hbs_1 = require("../../handlebars/email-confirmation.hbs");
const reset_password_hbs_1 = require("../../handlebars/reset-password.hbs");
let AuthService = class AuthService {
    constructor(prisma, jwtService, httpService, config, sendgridService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.httpService = httpService;
        this.config = config;
        this.sendgridService = sendgridService;
    }
    async sendEmailWithConfirmCode(email, uuid, code) {
        const mail = {
            to: email,
            subject: "Your Funds Tracker confirmation code",
            from: "noreply@funds-tracker.com",
            html: this.sendgridService.getHtml(email_confirmation_hbs_1.default, {
                email,
                code,
                uuid,
            }),
        };
        await this.sendgridService.send(mail);
    }
    async sendEmailWithResetPasswordLink(email, name, resetPasswordLink) {
        const mail = {
            to: email,
            subject: "Funds Tracker - reset password",
            from: "noreply@funds-tracker.com",
            html: this.sendgridService.getHtml(reset_password_hbs_1.default, {
                name,
                email,
                resetPasswordLink,
            }),
        };
        await this.sendgridService.send(mail);
    }
    async addSession(userId, newRt, name) {
        const sessionsLength = await this.prisma.session.count({ where: { userUuid: userId } });
        if (sessionsLength >= 10) {
            const oldestSession = await this.prisma.session.findFirst({
                where: { userUuid: userId },
                orderBy: { updatedAt: "asc" },
            });
            await this.prisma.session.deleteMany({
                where: { rtHash: oldestSession.rtHash },
            });
        }
        const isSessionExist = await this.prisma.session.findFirst({
            where: { name, userUuid: userId },
        });
        if (isSessionExist) {
            await this.updateSession(userId, newRt, isSessionExist.rtHash);
            return;
        }
        const rtHash = await this.hashData(newRt);
        await this.prisma.session.create({
            data: {
                user: {
                    connect: {
                        uuid: userId,
                    },
                },
                name,
                rtHash,
            },
        });
    }
    async updateSession(userId, newRt, oldRtHash) {
        const rtHash = await this.hashData(newRt);
        await this.prisma.session.updateMany({
            where: { rtHash: oldRtHash },
            data: {
                rtHash,
            },
        });
    }
    genereteIpName(res) {
        const userAgent = res.req.headers["user-agent"];
        const parser = new UAParser(userAgent);
        const parserResults = parser.getResult();
        const { ip } = res.req;
        const userAgentPropertiesExist = parserResults.os.name && parserResults.browser.name;
        const name = `${parserResults.os.name}-${parserResults.browser.name}`;
        return `${ip}-${userAgentPropertiesExist ? name : parserResults.ua || "unknown"}`;
    }
    async hashData(data) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(data, salt);
    }
    async getTokens(userId, email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email }, { expiresIn: cookies_1.EXPIRES["15MIN"] / 1000, secret: this.config.get("AT_SECRET") }),
            this.jwtService.signAsync({ sub: userId, email }, { expiresIn: cookies_1.EXPIRES["15DAYS"] / 1000, secret: this.config.get("RT_SECRET") }),
        ]);
        return {
            accessToken: at,
            refreshToken: rt,
        };
    }
    generateConfirmationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async validateHuman(token) {
        if (env_1.IS_TEST || env_1.IS_DEVELOPMENT) {
            return true;
        }
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post("https://www.google.com/recaptcha/api/siteverify", null, {
            params: {
                secret: this.config.get("RECAPTCHA_SECRET"),
                response: token,
            },
        })
            .pipe((0, rxjs_1.catchError)(() => {
            throw Error("Google reCAPTCHA error.");
        })));
        return data.success;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        axios_1.HttpService,
        config_1.ConfigService,
        send_grid_service_1.SendGridService])
], AuthService);
//# sourceMappingURL=auth.service.js.map