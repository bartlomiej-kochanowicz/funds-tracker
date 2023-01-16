import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StringLenFrom2To50Type } from 'common/scalars';

@ObjectType()
export class Portfolio {
  @Field(() => ID, { description: 'Portfolio uuid.' })
  uuid: string;

  @Field(() => StringLenFrom2To50Type, { description: 'Portfolio name.' })
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
