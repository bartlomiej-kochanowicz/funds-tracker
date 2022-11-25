import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCashAccountInput } from './create-cash-account.input';

@InputType()
export class UpdateAbcdInput extends PartialType(CreateCashAccountInput) {
  @Field(() => String, { description: 'Cash account uuid.' })
  uuid: string;
}
