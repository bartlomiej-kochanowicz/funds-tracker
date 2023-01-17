import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UpdateUser {
  @Field(() => Boolean, { description: 'Update user successful.' })
  success: boolean;
}
