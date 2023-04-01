import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchInstruments {
  @Field(() => String, { description: 'quoteType' })
  quoteType: string;

  @Field(() => String, { description: 'symbol' })
  symbol: string;

  @Field(() => String, { description: 'longname' })
  longname: string;

  @Field(() => String, { description: 'exchange' })
  exchange: string;
}
