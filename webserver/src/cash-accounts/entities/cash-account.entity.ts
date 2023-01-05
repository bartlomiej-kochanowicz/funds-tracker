import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';

@ObjectType()
export class CashAccount {
  @Field(() => String, { description: 'Cash account uuid.' })
  uuid: string;

  @Field(() => String, { description: 'Cash account name.' })
  name: string;

  @Field(() => Currency, { description: 'Cash account currency.' })
  currency: Currency;

  @Field(() => Number, { description: 'Account balance.' })
  balance: number;
}

registerEnumType(Currency, {
  name: 'Currency',
});
