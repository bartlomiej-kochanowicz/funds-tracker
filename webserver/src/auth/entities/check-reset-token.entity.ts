import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CheckResetToken {
  @Field(() => String, { description: 'Name of the user.' })
  name: string;
}
