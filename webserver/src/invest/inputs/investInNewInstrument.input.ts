import { Instrument } from '@app/common/inputs/Instrument.input';
import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class InvestInNewInstrumentInput {
  @IsString()
  @Field(() => String)
  portfolioUuid: string;

  @Field(() => Instrument)
  instrument: Instrument;

  @IsString()
  @Field(() => String)
  date: string;

  @IsNumber()
  @Field(() => Number)
  quantity: number;

  @IsNumber()
  @Field(() => Number)
  price: number;
}
