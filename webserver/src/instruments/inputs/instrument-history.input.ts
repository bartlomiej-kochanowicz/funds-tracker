import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class InstrumentHistoryInput {
  @IsString()
  @Field(() => String, { description: 'Symbol' })
  symbol: string;

  @IsString()
  @Field(() => String, { description: 'Interval' })
  interval: '1d' | '1wk' | '1mo';

  @IsString()
  @Field(() => String, { description: 'From' })
  from: `${string}-${string}-${string}`;
}
