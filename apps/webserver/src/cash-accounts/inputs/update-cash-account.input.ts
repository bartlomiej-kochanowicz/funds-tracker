import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class UpdateCashAccountInput {
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters.' })
  @Field(() => String, { description: 'Cash account name.' })
  name: string;
}
