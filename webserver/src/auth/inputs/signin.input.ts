import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SigninInput {
  @Field(() => String, { description: 'Email.' })
  email: string;

  @Field(() => String, { description: 'Password.' })
  password: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
