import { Field, InputType } from '@nestjs/graphql';
import { CreateCashAccountInput } from './create-cash-account.input';

@InputType()
export class CreateCashAccountsInput {
  @Field(() => [CreateCashAccountInput], { description: 'Cash accounts array.' })
  cashAccounts: CreateCashAccountInput[];
}
