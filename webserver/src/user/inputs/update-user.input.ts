import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency } from '@prisma/client';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class UpdateUserInput {
  @Field(() => EmailAddressResolver, { description: 'New user email.', nullable: true })
  email?: string;

  @Field(() => String, { description: 'New user name.', nullable: true })
  name?: string;

  @Field(() => Currency, { description: 'New user default currency.', nullable: true })
  defaultCurrency?: Currency;
}

registerEnumType(Currency, {
  name: 'Currency',
});
