import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class UpdateUserInput {
  @Field(() => EmailAddressResolver, { description: 'New user email.' })
  email: string;

  @Field(() => String, { description: 'New user name.' })
  name: string;

  @Field(() => Currency, { description: 'New user default currency.' })
  defaultCurrency: Currency;
}

registerEnumType(Currency, {
  name: 'Currency',
});
