import { InputType, Field } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class ConfirmSignupInput {
  @Field(() => EmailAddressResolver, { description: 'Email.' })
  email: string;

  @Field(() => String, { description: 'Code.' })
  code: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
