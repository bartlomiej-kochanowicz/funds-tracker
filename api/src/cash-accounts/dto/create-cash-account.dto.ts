import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CURRENCIES_ARRAY } from 'common/constants/currencies';
import { Currencies } from 'common/types/currencies.type';

export class CreateCashAccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsIn(CURRENCIES_ARRAY)
  currency: Currencies;
}
