import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InstrumentDetails {
  @Field(() => String, { description: 'language' })
  language: string;

  @Field(() => String, { description: 'region' })
  region: string;

  @Field(() => String, { description: 'currency' })
  currency: string;

  @Field(() => String, { description: 'exchangeTimezoneName' })
  exchangeTimezoneName: string;

  @Field(() => String, { description: 'longName' })
  longName: string;

  @Field(() => String, { description: 'symbol' })
  symbol: string;

  @Field(() => String, { description: 'quoteType' })
  quoteType: string;

  @Field(() => Number, { description: 'regularMarketPrice' })
  regularMarketPrice: number;

  @Field(() => String, { description: 'regularMarketDayRange' })
  regularMarketDayRange: string;

  @Field(() => String, { description: 'exchange' })
  exchange: string;

  @Field(() => String, { description: 'fiftyTwoWeekRange' })
  fiftyTwoWeekRange: string;

  @Field(() => Number, { description: 'ytdReturn' })
  ytdReturn: number;

  @Field(() => String, { description: 'quoteSourceName' })
  quoteSourceName: string;

  @Field(() => Number, { description: 'regularMarketPreviousClose' })
  regularMarketPreviousClose: number;
}
