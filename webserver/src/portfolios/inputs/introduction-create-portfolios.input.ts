import { Field, InputType } from '@nestjs/graphql';
import { ArrayMaxSize } from 'class-validator';
import { CreatePortfolioInput } from './create-portfolio.input';

@InputType()
export class IntroductionCreatePortfoliosInput {
  @ArrayMaxSize(10, { message: 'You can create up to 10 portfolios.' })
  @Field(() => [CreatePortfolioInput], { description: 'Portfolios array.' })
  portfolios: CreatePortfolioInput[];
}
