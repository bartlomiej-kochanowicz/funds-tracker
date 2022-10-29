import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: 'Name is short',
    context: 'name',
  })
  @MaxLength(50, {
    message: 'Name is too long',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12, { message: 'Password is too short' })
  password: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
