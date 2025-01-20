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
exports.LogoutService = void 0;
const prisma_service_1 = require("../../../services/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const cookies_1 = require("../../../constants/cookies");
const env_1 = require("../../../config/env");
let LogoutService = class LogoutService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logout(userId, res) {
        try {
            const userSessions = await this.prisma.session.findMany({
                where: { userUuid: userId },
            });
            const session = userSessions.find(async ({ rtHash }) => await bcrypt.compare(res.req.cookies.refreshToken, rtHash));
            await this.prisma.session.deleteMany({
                where: { rtHash: session.rtHash },
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
            return {
                success: true,
            };
        }
        catch {
            return {
                success: false,
            };
        }
    }
};
exports.LogoutService = LogoutService;
exports.LogoutService = LogoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogoutService);
//# sourceMappingURL=logout.service.js.map