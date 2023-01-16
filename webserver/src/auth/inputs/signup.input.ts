import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'common/scalars';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class SignupInput {
  @Field(() => EmailAddressResolver, { description: 'Email.' })
  email: string;

  @Field(() => Length(4, 50), { description: 'Name.' })
  name: string;

  @Field(() => Length(12, 50), { description: 'Password.' })
  password: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
