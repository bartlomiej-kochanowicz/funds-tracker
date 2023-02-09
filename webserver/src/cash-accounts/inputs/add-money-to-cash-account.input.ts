import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsPositive, Max, Min } from 'class-validator';

@InputType()
export class AddFundsToCashAccountInput {
  @Field(() => ID, { description: 'Account uuid.' })
  uuid: string;

  @Field(() => Number, { description: 'Cash amount.' })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(1000000000)
  amount: number;
}
