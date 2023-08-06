import { Field, InputType } from '@nestjs/graphql';
import { InstrumentType } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class Instrument {
  @IsString()
  @Field(() => String)
  name: string;

  @Field(() => InstrumentType)
  type: InstrumentType;

  @IsString()
  @Field(() => String)
  code: string;

  @IsString()
  @Field(() => String)
  currency: string;

  @IsString()
  @Field(() => String)
  country: string;

  @IsString()
  @Field(() => String)
  exchange: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ISIN?: string;
}
