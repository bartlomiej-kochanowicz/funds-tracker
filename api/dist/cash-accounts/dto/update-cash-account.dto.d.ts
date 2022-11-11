import { Currencies } from 'common/types/currencies.type';
import { CashAccountDto } from './cash-account.dto';
declare const UpdateCashAccountDto_base: import("@nestjs/mapped-types").MappedType<Partial<CashAccountDto>>;
export declare class UpdateCashAccountDto extends UpdateCashAccountDto_base {
    balance: number;
    currency: Currencies;
}
export {};
