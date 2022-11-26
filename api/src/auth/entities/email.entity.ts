import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Email {
  @Field(() => Boolean, { description: 'Email existence.' })
  exist: boolean;
}
