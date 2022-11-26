import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String, { description: 'Email.' })
  email: string;

  @MinLength(4, {
    message: 'Name is short',
    context: 'name',
  })
  @MaxLength(50, {
    message: 'Name is too long',
  })
  @Field(() => String, { description: 'Name.' })
  name: string;

  @MinLength(12, { message: 'Password is too short' })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  @Field(() => String, { description: 'Password.' })
  password: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
