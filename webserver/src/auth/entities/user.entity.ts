import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User uuid.' })
  uuid: string;

  @Field(() => Date, { description: 'User date created.' })
  createdAt: Date;

  @Field(() => String, { description: 'User email.' })
  email: string;

  @Field(() => String, { description: 'User name.' })
  name: string;
}