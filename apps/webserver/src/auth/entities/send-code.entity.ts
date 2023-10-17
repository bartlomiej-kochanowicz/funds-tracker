import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SendCode {
  @Field(() => Boolean, { description: 'Send code successful.' })
  success: boolean;
}
