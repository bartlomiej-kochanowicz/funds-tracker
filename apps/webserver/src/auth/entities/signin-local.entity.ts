import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SigninLocal {
  @Field(() => Boolean, { description: 'Signin local successful.' })
  success: boolean;
}
