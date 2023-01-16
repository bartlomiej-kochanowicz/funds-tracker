import { InputType, Field } from '@nestjs/graphql';
import { StringLenFrom2To50Type } from 'common/scalars';

@InputType()
export class CreatePortfolioInput {
  @Field(() => StringLenFrom2To50Type, { description: 'Portfolio name.' })
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
