import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupLocal {
  @Field(() => Boolean, { description: 'Signup local successful.' })
  success: boolean;
}
