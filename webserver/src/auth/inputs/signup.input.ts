import { InputType, Field } from '@nestjs/graphql';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class SignupInput {
  @Field(() => EmailAddressResolver, { description: 'Email.' })
  email: string;

  @Field(() => String, { description: 'Name.' }) // 4,50
  name: string;

  @Field(() => String, { description: 'Password.' }) // 12,50
  password: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
