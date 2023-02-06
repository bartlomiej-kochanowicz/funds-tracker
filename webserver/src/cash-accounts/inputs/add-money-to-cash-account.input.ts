import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class AddMoneyToCashAccountInput {
  @Field(() => ID, { description: 'Account uuid.' })
  uuid: string;

  @Field(() => Number, { description: 'Cash amount.' })
  @IsNumber()
  @IsPositive()
  amount: number;
}
