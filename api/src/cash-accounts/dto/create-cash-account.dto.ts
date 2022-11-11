import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
import { MAX_CASH_ACCOUNTS } from 'common/constants/common';
import { CashAccountDto } from './cash-account.dto';

export class CreateCashAccountDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_CASH_ACCOUNTS)
  cashAccounts: CashAccountDto[];
}
