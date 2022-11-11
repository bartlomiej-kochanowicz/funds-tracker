import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CURRENCIES_ARRAY } from 'common/constants/currencies';
import { Currencies } from 'common/types/currencies.type';
import { CashAccountDto } from './cash-account.dto';

export class UpdateCashAccountDto extends PartialType(CashAccountDto) {
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsOptional()
  @IsIn(CURRENCIES_ARRAY)
  currency: Currencies;
}
