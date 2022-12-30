import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ConfirmSignupInput {
  @Field(() => String, { description: 'Email.' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Code.' })
  code: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
