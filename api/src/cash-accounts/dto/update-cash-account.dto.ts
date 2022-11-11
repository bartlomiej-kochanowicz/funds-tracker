import { PartialType } from '@nestjs/mapped-types';
import { CreateCashAccountDto } from './create-cash-account.dto';

export class UpdateCashAccountDto extends PartialType(CreateCashAccountDto) {}
