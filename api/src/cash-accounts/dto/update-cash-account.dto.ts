import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Currency } from '@prisma/client';
import { CashAccountDto } from './cash-account.dto';

export class UpdateCashAccountDto extends PartialType(CashAccountDto) {
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @IsOptional()
  @IsEnum(Currency)
  currency: Currency;
}
