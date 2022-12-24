import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Signup {
  @Field(() => Boolean, { description: 'Signup successful.' })
  success: boolean;
}
