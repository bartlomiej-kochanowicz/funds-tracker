import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { IntroductionStep } from '@prisma/client';
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
}

registerEnumType(IntroductionStep, {
  name: 'IntroductionStep',
});
