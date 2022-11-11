import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CURRENCIES_ARRAY } from 'common/constants/currencies';
import { Currencies } from 'common/types/currencies.type';
import { CreateCashAccountDto } from './create-cash-account.dto';

export class UpdateCashAccountDto extends PartialType(CreateCashAccountDto) {
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsOptional()
  @IsIn(CURRENCIES_ARRAY)
  currency: Currencies;
}
