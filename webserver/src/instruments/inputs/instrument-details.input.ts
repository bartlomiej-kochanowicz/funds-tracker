import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class InstrumentDetailsInput {
  @IsString()
  @Field(() => String, { description: 'Symbol' })
  symbol: string;
}
