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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
let RtStrategy = class RtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt-refresh") {
    constructor(config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    const data = request?.cookies.refreshToken;
                    if (!data) {
                        return null;
                    }
                    return data;
                },
            ]),
            secretOrKey: config.get("RT_SECRET"),
            passReqToCallback: true,
        });
    }
    validate(req, payload) {
        return { ...payload, refreshToken: req.cookies.refreshToken };
    }
};
exports.RtStrategy = RtStrategy;
exports.RtStrategy = RtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.ConfigService)),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RtStrategy);
//# sourceMappingURL=rt.strategy.js.map