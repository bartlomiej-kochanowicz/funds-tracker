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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const user_service_1 = require("../user/user.service");
const jwtFromRequest = (req) => { var _a, _b; return req && req.cookies ? (_b = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt) !== null && _b !== void 0 ? _b : null : null; };
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            jwtFromRequest,
            ignoreExpiration: false,
            secretOrKey: 'secret-test-test-TODO',
        });
        this.userService = userService;
    }
    async validate(payload, done) {
        if (!(payload === null || payload === void 0 ? void 0 : payload.id)) {
            return done(new common_1.UnauthorizedException(), null);
        }
        const user = await this.userService.findById(payload === null || payload === void 0 ? void 0 : payload.id);
        if (!user) {
            return done(new common_1.UnauthorizedException(), null);
        }
        return done(null, user);
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map