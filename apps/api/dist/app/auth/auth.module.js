"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("@nestjs/axios");
const send_grid_module_1 = require("../../services/send-grid/send-grid.module");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const strategies_1 = require("./strategies");
const sign_up_service_1 = require("./services/sign-up.service");
const sign_in_service_1 = require("./services/sign-in.service");
const logout_service_1 = require("./services/logout.service");
const password_service_1 = require("./services/password.service");
const token_service_1 = require("./services/token.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), axios_1.HttpModule, send_grid_module_1.SendGridModule],
        providers: [
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
            sign_up_service_1.SignUpService,
            sign_in_service_1.SignInService,
            logout_service_1.LogoutService,
            password_service_1.PasswordService,
            token_service_1.TokenService,
            strategies_1.AtStrategy,
            strategies_1.RtStrategy,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map