import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';

@ObjectType()
export class CashAccount {
  @Field(() => String, { description: 'Cash account uuid.' })
  uuid: string;

  @Field(() => String, { description: 'Cash account uuid.' })
  name: string;

  @Field(() => Currency, { description: 'Cash account currency.' })
  currency: Currency;
}

registerEnumType(Currency, {
  name: 'Currency',
});
