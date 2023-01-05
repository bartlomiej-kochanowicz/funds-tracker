import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateCashAccountInput } from './create-cash-account.input';

@InputType()
export class UpdateCashAccountInput extends PartialType(CreateCashAccountInput) {
  @Field(() => Number, { description: 'Account balance.', nullable: true })
  balance?: number;
}
