import { InputType } from '@nestjs/graphql';
import { IsNumber, IsDate, IsUUID, IsString, IsOptional } from 'class-validator';

@InputType()
export class BuyInstrumentInput {
  @IsNumber()
  comission: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsOptional()
  instrumentUuid?: string;

  @IsString()
  @IsOptional()
  instrumentCode?: string;

  @IsString()
  @IsOptional()
  instrumentcurrency?: string;

  @IsString()
  @IsOptional()
  instrumentISIN?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsUUID()
  portfolioUuid: string;
}
