import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePortfolioInput {
  @MinLength(2, {
    message: 'Name is short',
    context: 'name',
  })
  @MaxLength(50, {
    message: 'Name is too long',
  })
  @Field(() => String, { description: 'Portfolio name.' })
  name: string;

  @Field(() => Boolean, { description: 'Is portfolio rebalancing enabled.' })
  rebalancingEnabled: boolean;
}
