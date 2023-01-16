import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';

@InputType()
export class CreateCashAccountInput {
  @Field(() => String, { description: 'Cash account name.' }) // 2,50
  name: string;

  @Field(() => Currency, { description: 'Cash account currency.' })
  currency: Currency;
}

registerEnumType(Currency, {
  name: 'Currency',
});
