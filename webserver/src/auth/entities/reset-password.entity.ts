import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResetPassword {
  @Field(() => Boolean, { description: 'Send reset password successful.' })
  success: boolean;
}
