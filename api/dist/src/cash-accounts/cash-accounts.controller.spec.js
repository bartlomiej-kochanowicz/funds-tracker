"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cash_accounts_controller_1 = require("./cash-accounts.controller");
const cash_accounts_service_1 = require("./cash-accounts.service");
describe('CashAccountsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [cash_accounts_controller_1.CashAccountsController],
            providers: [cash_accounts_service_1.CashAccountsService],
        }).compile();
        controller = module.get(cash_accounts_controller_1.CashAccountsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=cash-accounts.controller.spec.js.map