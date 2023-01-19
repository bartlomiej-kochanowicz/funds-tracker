import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { CreateCashAccountInput } from './create-cash-account.input';

@InputType()
export class UpdateCashAccountInput extends PartialType(CreateCashAccountInput) {
  @Field(() => Float, { description: 'Account balance.', nullable: true })
  balance?: number;
}
