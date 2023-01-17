import { Field, InputType } from '@nestjs/graphql';
import { CreateCashAccountInput } from './create-cash-account.input';

@InputType()
export class IntroductionCreateCashAccountsInput {
  @Field(() => [CreateCashAccountInput])
  cashAccounts: CreateCashAccountInput[];
}
