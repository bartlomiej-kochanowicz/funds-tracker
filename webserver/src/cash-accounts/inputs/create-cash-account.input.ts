import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCashAccountInput {
  @MinLength(2, {
    message: 'Name is short',
    context: 'name',
  })
  @MaxLength(50, {
    message: 'Name is too long',
  })
  @Field(() => String, { description: 'Cash account name.' })
  name: string;

  @Field(() => Currency, { description: 'Cash account currency.' })
  currency: Currency;
}

registerEnumType(Currency, {
  name: 'Currency',
});
