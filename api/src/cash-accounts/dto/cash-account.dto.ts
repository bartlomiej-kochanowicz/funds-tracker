import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Currency } from '@prisma/client';

export class CashAccountDto {
  @IsString()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Currency)
  currency: Currency;

  @IsOptional()
  @IsNumber()
  balance: number;
}
