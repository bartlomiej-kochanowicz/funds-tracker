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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const get_current_user_id_decorator_1 = require("../../decorators/get-current-user-id.decorator");
const entities_1 = require("./entities");
const inputs_1 = require("./inputs");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    user(userId) {
        return this.userService.getUser(userId);
    }
    updateUser(userId, updateUserInput) {
        return this.userService.updateUser(userId, updateUserInput);
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)(() => entities_1.User),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)(() => entities_1.User),
    __param(0, (0, get_current_user_id_decorator_1.GetCurrentUserId)()),
    __param(1, (0, graphql_1.Args)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inputs_1.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUser", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => entities_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map