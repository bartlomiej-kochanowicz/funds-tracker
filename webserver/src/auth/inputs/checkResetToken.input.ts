import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CheckResetTokenInput {
  @Field(() => String, { description: 'Reset token.' })
  @IsString()
  resetToken: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}
