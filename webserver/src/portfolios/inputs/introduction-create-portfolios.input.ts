import { Field, InputType } from '@nestjs/graphql';
import { CreatePortfolioInput } from './create-portfolio.input';

@InputType()
export class IntroductionCreatePortfoliosInput {
  @Field(() => [CreatePortfolioInput], { description: 'Portfolios array.' })
  portfolios: CreatePortfolioInput[];
}
