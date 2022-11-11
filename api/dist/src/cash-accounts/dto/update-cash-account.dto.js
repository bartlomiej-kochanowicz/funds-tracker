"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCashAccountDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cash_account_dto_1 = require("./create-cash-account.dto");
class UpdateCashAccountDto extends (0, mapped_types_1.PartialType)(create_cash_account_dto_1.CreateCashAccountDto) {
}
exports.UpdateCashAccountDto = UpdateCashAccountDto;
//# sourceMappingURL=update-cash-account.dto.js.map