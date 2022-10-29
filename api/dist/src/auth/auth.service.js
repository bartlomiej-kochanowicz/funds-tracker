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
const bcrypt = require("bcrypt");
const env_1 = require("../common/config/env");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../prisma/prisma.service");
const cookies_1 = require("../common/constants/cookies");
let AuthService = class AuthService {
    constructor(prisma, jwtService, httpService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async signupLocal(dto, res) {
        try {
            const { email, password, token } = dto;
            const isHuman = await this.validateHuman(token);
            if (!isHuman) {
                throw new common_1.ForbiddenException('You are a robot!');
            }
            const hashedPwd = await this.hashData(password);
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (user) {
                throw new common_1.ForbiddenException('Email already in use.');
            }
            const { uuid: newUserId, email: newUserEmail } = await this.prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPwd,
                },
            });
            const { accessToken, refreshToken } = await this.getTokens(newUserId, newUserEmail);
            await this.updateRtHash(newUserId, refreshToken);
            res.cookie(cookies_1.COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
                maxAge: cookies_1.EXPIRES['15MIN'],
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.cookie(cookies_1.COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
                maxAge: cookies_1.EXPIRES['30days'],
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.cookie(cookies_1.COOKIE_NAMES.IS_LOGGED_IN, true, {
                maxAge: cookies_1.EXPIRES['30days'],
            });
            return res.status(201).send();
        }
        catch (error) {
            delete error.response;
            return res.json(error);
        }
    }
    async signinLocal(dto, res) {
        var _a;
        try {
            const { email, password, token } = dto;
            const isHuman = await this.validateHuman(token);
            if (!isHuman) {
                throw new common_1.ForbiddenException('You are a robot!');
            }
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new common_1.ForbiddenException('No account for these email.');
            const isPasswordsMatches = await bcrypt.compare(password, user.password);
            if (!isPasswordsMatches)
                throw new common_1.ForbiddenException('Wrong password.');
            const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);
            await this.updateRtHash(user.uuid, refreshToken);
            res.cookie(cookies_1.COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
                maxAge: cookies_1.EXPIRES['15MIN'],
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.cookie(cookies_1.COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
                maxAge: cookies_1.EXPIRES['30days'],
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.cookie(cookies_1.COOKIE_NAMES.IS_LOGGED_IN, true, {
                maxAge: cookies_1.EXPIRES['30days'],
            });
            return res.status(200).send();
        }
        catch (error) {
            delete error.response;
            return res.status((_a = error.status) !== null && _a !== void 0 ? _a : 500).json(error);
        }
    }
    async checkEmail(dto) {
        const { email, token } = dto;
        const isHuman = await this.validateHuman(token);
        if (!isHuman) {
            throw new common_1.ForbiddenException('You are a robot!');
        }
        const user = await this.prisma.user.findUnique({ where: { email } });
        return {
            exist: Boolean(user),
        };
    }
    async getAccount(userId) {
        const { email, uuid, createdAt, name } = await this.prisma.user.findUnique({
            where: { uuid: userId },
        });
        return { email, uuid, createdAt, name };
    }
    async logout(userId, res) {
        try {
            await this.prisma.user.updateMany({
                where: {
                    uuid: userId,
                    rtHash: {
                        not: null,
                    },
                },
                data: {
                    rtHash: null,
                },
            });
            res.clearCookie(cookies_1.COOKIE_NAMES.ACCESS_TOKEN, {
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.clearCookie(cookies_1.COOKIE_NAMES.REFRESH_TOKEN, {
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.clearCookie(cookies_1.COOKIE_NAMES.IS_LOGGED_IN);
            return res.status(200).send();
        }
        catch (error) {
            return res.json(error);
        }
    }
    async refreshToken(userId, rt, res) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { uuid: userId },
            });
            if (!user || !user.rtHash)
                throw new common_1.ForbiddenException();
            const isRtMatches = await bcrypt.compare(rt, user.rtHash);
            if (!isRtMatches)
                throw new common_1.ForbiddenException();
            const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);
            await this.updateRtHash(user.uuid, refreshToken);
            res.cookie(cookies_1.COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
                maxAge: cookies_1.EXPIRES['15MIN'],
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.cookie(cookies_1.COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
                maxAge: cookies_1.EXPIRES['30days'],
                secure: !env_1.IS_DEVELOPMENT,
                httpOnly: true,
            });
            res.cookie(cookies_1.COOKIE_NAMES.IS_LOGGED_IN, true, {
                maxAge: cookies_1.EXPIRES['30days'],
            });
            return res.status(200).send();
        }
        catch (error) {
            delete error.response;
            return res.json(error);
        }
    }
    async updateRtHash(userId, rt) {
        const rtHash = await this.hashData(rt);
        await this.prisma.user.update({
            where: { uuid: userId },
            data: { rtHash },
        });
    }
    async hashData(pwd) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(pwd, salt);
    }
    async getTokens(userId, email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email }, { expiresIn: 60 * 15, secret: env_1.AT_SECRET }),
            this.jwtService.signAsync({ sub: userId, email }, { expiresIn: 60 * 60 * 24 * 7, secret: env_1.RT_SECRET }),
        ]);
        return {
            accessToken: at,
            refreshToken: rt,
        };
    }
    async validateHuman(token) {
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: env_1.RECAPTCHA_SECRET,
                response: token,
            },
        })
            .pipe((0, rxjs_1.catchError)(() => {
            throw Error('Google reCAPTCHA error.');
        })));
        return data.success;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map