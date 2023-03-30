import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InstrumentHistory {
  @Field(() => String, { description: 'Date' })
  date: string;

  @Field(() => Number, { description: 'Open' })
  open: number;

  @Field(() => Number, { description: 'High' })
  high: number;

  @Field(() => Number, { description: 'Low' })
  low: number;

  @Field(() => Number, { description: 'Close' })
  close: number;
}
