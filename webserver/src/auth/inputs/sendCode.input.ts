import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SendCodeInput {
  @Field(() => String, { description: 'Email.' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
