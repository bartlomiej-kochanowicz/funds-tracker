import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String, { description: 'Email.' })
  @IsEmail({
    message: 'Email is not valid.',
  })
  email: string;

  @MinLength(4, {
    message: 'Name is short',
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

  @Field(() => String, { description: 'Device name.' })
  refreshTokenName: string;
}
