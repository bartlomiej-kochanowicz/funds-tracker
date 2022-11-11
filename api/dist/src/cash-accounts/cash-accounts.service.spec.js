"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cash_accounts_service_1 = require("./cash-accounts.service");
describe('CashAccountsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [cash_accounts_service_1.CashAccountsService],
        }).compile();
        service = module.get(cash_accounts_service_1.CashAccountsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=cash-accounts.service.spec.js.map