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
exports.CashAccountsController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const cash_accounts_service_1 = require("./cash-accounts.service");
const create_cash_account_dto_1 = require("./dto/create-cash-account.dto");
const update_cash_account_dto_1 = require("./dto/update-cash-account.dto");
let CashAccountsController = class CashAccountsController {
    constructor(cashAccountsService) {
        this.cashAccountsService = cashAccountsService;
    }
    create(userId, createCashAccountDto) {
        return this.cashAccountsService.create(userId, createCashAccountDto);
    }
    findAll(userId) {
        return this.cashAccountsService.findAll(userId);
    }
    findOne(userId, uuid) {
        return this.cashAccountsService.findOne(userId, uuid);
    }
    update(id, updateCashAccountDto) {
        return this.cashAccountsService.update(+id, updateCashAccountDto);
    }
    remove(id) {
        return this.cashAccountsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cash_account_dto_1.CreateCashAccountDto]),
    __metadata("design:returntype", void 0)
], CashAccountsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashAccountsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CashAccountsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cash_account_dto_1.UpdateCashAccountDto]),
    __metadata("design:returntype", void 0)
], CashAccountsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashAccountsController.prototype, "remove", null);
CashAccountsController = __decorate([
    (0, common_1.Controller)('cash-accounts'),
    __metadata("design:paramtypes", [cash_accounts_service_1.CashAccountsService])
], CashAccountsController);
exports.CashAccountsController = CashAccountsController;
//# sourceMappingURL=cash-accounts.controller.js.map