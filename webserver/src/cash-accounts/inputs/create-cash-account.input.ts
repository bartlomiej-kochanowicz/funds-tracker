import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';
import { StringLenFrom2To50Type } from 'common/scalars';

@InputType()
export class CreateCashAccountInput {
  @Field(() => StringLenFrom2To50Type, { description: 'Cash account name.' })
  name: string;

  @Field(() => Currency, { description: 'Cash account currency.' })
  currency: Currency;
}

registerEnumType(Currency, {
  name: 'Currency',
});
