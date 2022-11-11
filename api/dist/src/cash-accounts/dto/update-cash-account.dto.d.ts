import { Currencies } from 'common/types/currencies.type';
import { CreateCashAccountDto } from './create-cash-account.dto';
declare const UpdateCashAccountDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCashAccountDto>>;
export declare class UpdateCashAccountDto extends UpdateCashAccountDto_base {
    balance: number;
    currency: Currencies;
}
export {};
