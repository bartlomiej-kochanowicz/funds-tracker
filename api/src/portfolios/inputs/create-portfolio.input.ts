import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePortfolioInput {
  @Field(() => String, { description: 'Portfolio name.' })
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
