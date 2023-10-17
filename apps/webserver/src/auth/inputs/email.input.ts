import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class EmailInput {
  @IsEmail()
  @Field(() => EmailAddressResolver, { description: 'Email.' })
  email: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
