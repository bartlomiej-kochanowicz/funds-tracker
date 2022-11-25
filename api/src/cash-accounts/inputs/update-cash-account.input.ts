import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCashAccountInput } from './create-cash-account.input';

@InputType()
export class UpdateCashAccountInput extends PartialType(
  CreateCashAccountInput,
) {}
