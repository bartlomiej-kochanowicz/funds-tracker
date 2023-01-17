import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ConfirmSignup {
  @Field(() => Boolean, { description: 'Confirmatiopn signup successful.' })
  success: boolean;
}
