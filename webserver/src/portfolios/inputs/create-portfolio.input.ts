import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioInput {
  @Field(() => String, { description: 'Portfolio name.' }) // 2,50
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
