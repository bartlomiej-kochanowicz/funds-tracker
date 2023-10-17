import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SetNewPassword {
  @Field(() => Boolean, { description: 'Name of the user.' })
  success: boolean;
}
