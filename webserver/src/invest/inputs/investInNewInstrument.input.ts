import { Instrument } from '@app/common/inputs/Instrument.input';
import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class InvestInNewInstrumentInput {
  @IsUUID()
  @Field(() => String)
  portfolioUuid: string;

  @IsUUID()
  @Field(() => String)
  cashAccountUuid: string;

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

  @IsNumber()
  @Field(() => Number)
  comission: number;
}
