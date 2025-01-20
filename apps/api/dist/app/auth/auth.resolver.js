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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const get_current_user_id_decorator_1 = require("../../decorators/get-current-user-id.decorator");
const get_current_user_decorator_1 = require("../../decorators/get-current-user.decorator");
const public_decorator_1 = require("../../decorators/public.decorator");
const rt_guard_1 = require("../../guards/rt.guard");
const entities_1 = require("./entities");
const send_code_entity_1 = require("./entities/send-code.entity");
const inputs_1 = require("./inputs");
const sign_up_service_1 = require("./services/sign-up.service");
const sign_in_service_1 = require("./services/sign-in.service");
const logout_service_1 = require("./services/logout.service");
const password_service_1 = require("./services/password.service");
const token_service_1 = require("./services/token.service");
let AuthResolver = class AuthResolver {
    constructor(signUpService, signInService, logoutService, passwordService, tokenService) {
        this.signUpService = signUpService;
        this.signInService = signInService;
        this.logoutService = logoutService;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    signUpLocal(signUpInput) {
        return this.signUpService.signUpLocal(signUpInput);
    }
    confirmSignUp(confirmSignUpInput, res) {
        return this.signUpService.confirmSignUp(confirmSignUpInput, res);
    }
    sendCode(sendCodeInput) {
        return this.signUpService.sendCode(sendCodeInput);
    }
    signInLocal(signInInput, res) {
        return this.signInService.signInLocal(signInInput, res);
    }
    emailExist(emailInput) {
        return this.signInService.checkEmail(emailInput);
    }
    logout(userId, res) {
        return this.logoutService.logout(userId, res);
    }
    resetPassword(resetPasswordInput) {
        return this.passwordService.resetPassword(resetPasswordInput);
    }
    setNewPassword(setNewPasswordInput) {
        return this.passwordService.setNewPassword(setNewPasswordInput);
    }
    refreshToken(userId, refreshToken, res) {
        return this.tokenService.refreshToken(userId, refreshToken, res);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => entities_1.SignUpLocal),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.SignUpInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "signUpLocal", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => entities_1.ConfirmSignUp),
    __param(0, (0, graphql_1.Args)("data")),
    __param(1, (0, graphql_1.Context)("res")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ConfirmSignUpInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "confirmSignUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => send_code_entity_1.SendCode),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.SendCodeInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "sendCode", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => entities_1.SignInLocal),
    __param(0, (0, graphql_1.Args)("data")),
    __param(1, (0, graphql_1.Context)("res")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.SignInInput, Object]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "signInLocal", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Query)(() => entities_1.Email),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.EmailInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "emailExist", null);
__decorate([
    (0, graphql_1.Mutation)(() => entities_1.Logout),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __param(1, (0, graphql_1.Context)("res")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => entities_1.ResetPassword),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.ResetPasswordInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "resetPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => entities_1.SetNewPassword),
    __param(0, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inputs_1.SetNewPasswordInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "setNewPassword", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(rt_guard_1.RtGuard),
    (0, graphql_1.Mutation)(() => entities_1.Refresh),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __param(1, (0, get_current_user_decorator_1.GetCurrentUser)("refreshToken")),
    __param(2, (0, graphql_1.Context)("res")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refreshToken", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [sign_up_service_1.SignUpService,
        sign_in_service_1.SignInService,
        logout_service_1.LogoutService,
        password_service_1.PasswordService,
        token_service_1.TokenService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map