import { InputType, Field } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class EmailInput {
  @Field(() => EmailAddressResolver, { description: 'Email.' })
  email: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
