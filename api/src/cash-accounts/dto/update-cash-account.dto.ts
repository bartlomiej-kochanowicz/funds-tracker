import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCashAccountDto } from './create-cash-account.dto';

export class UpdateCashAccountDto extends PartialType(CreateCashAccountDto) {
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
