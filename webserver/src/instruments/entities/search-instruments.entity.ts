import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchInstruments {
  @Field(() => String, { description: 'Code' })
  Code: string;

  @Field(() => String, { description: 'Exchange' })
  Exchange: string;

  @Field(() => String, { description: 'Name' })
  Name: string;

  @Field(() => String, { description: 'Type' })
  Type: string;

  @Field(() => String, { description: 'Country' })
  Country: string;

  @Field(() => String, { description: 'Currency' })
  Currency: string;

  @Field(() => String, { description: 'ISIN', nullable: true })
  ISIN?: string;

  @Field(() => Number, { description: 'previousClose' })
  previousClose: number;

  @Field(() => String, { description: 'previousCloseDate' })
  previousCloseDate: string;
}
