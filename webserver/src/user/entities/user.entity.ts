import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Currency, IntroductionStep } from '@prisma/client';
import { DateResolver, EmailAddressResolver } from 'graphql-scalars';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User uuid.' })
  uuid: string;

  @Field(() => DateResolver, { description: 'User date created.' })
  createdAt: Date;

  @Field(() => EmailAddressResolver, { description: 'User email.' })
  email: string;

  @Field(() => String, { description: 'User name.' })
  name: string;

  @Field(() => IntroductionStep, { description: 'Introduction step.' })
  introductionStep: IntroductionStep;

  @Field(() => Currency, { description: 'Default currency.' })
  defaultCurrency: Currency;
}

registerEnumType(IntroductionStep, {
  name: 'IntroductionStep',
});

registerEnumType(Currency, {
  name: 'Currency',
});
