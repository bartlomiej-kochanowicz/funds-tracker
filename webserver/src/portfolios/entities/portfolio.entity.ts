import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Portfolio {
  @Field(() => ID, { description: 'Portfolio uuid.' })
  uuid: string;

  @Field(() => String, { description: 'Portfolio name.' }) // 2,50
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
