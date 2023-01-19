import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import { EmailAddressResolver } from 'graphql-scalars';

@InputType()
export class SignupInput {
  @IsEmail()
  @Field(() => EmailAddressResolver, { description: 'Email.' })
  email: string;

  @Length(4, 50, { message: 'Name must be between 4 and 50 characters.' })
  @Field(() => String, { description: 'Name.' }) // 4,50
  name: string;

  @Length(12, 50, { message: 'Name must be between 4 and 50 characters.' })
  @Field(() => String, { description: 'Password.' }) // 12,50
  password: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
