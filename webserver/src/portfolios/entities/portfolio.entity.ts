import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Portfolio {
  @Field(() => String, { description: 'Portfolio uuid.' })
  uuid: string;

  @Field(() => String, { description: 'Portfolio name.' })
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
