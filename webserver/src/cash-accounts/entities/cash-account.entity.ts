import { ObjectType, Field, registerEnumType, ID, Float } from '@nestjs/graphql';
import { Currency } from '@prisma/client';
import { CashAccountHistory } from './cash-account-history.entity';

@ObjectType()
export class CashAccount {
  @Field(() => ID, { description: 'Cash account uuid.' })
  uuid: string;

  @Field(() => String, { description: 'Cash account name.' }) // 2,50
  name: string;

  @Field(() => Currency, { description: 'Cash account currency.' })
  currency: Currency;

  @Field(() => Float, { description: 'Account balance.' })
  balance: number;

  @Field(() => [CashAccountHistory], { description: 'Account balance history.' })
  history: CashAccountHistory[];
}

registerEnumType(Currency, {
  name: 'Currency',
});
