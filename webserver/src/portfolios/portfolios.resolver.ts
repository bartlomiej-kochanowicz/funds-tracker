import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from '@common/decorators';
import { IntroductionPortfolios, Portfolio } from './entities';
import {
  CreatePortfolioInput,
  UpdatePortfolioInput,
  IntroductionCreatePortfoliosInput,
} from './inputs';
import { PortfoliosService } from './portfolios.service';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Mutation(() => Portfolio)
  createPortfolio(
    @GetCurrentUserId() userId: string,
    @Args('data')
    createPortfolioInput: CreatePortfolioInput,
  ) {
    return this.portfoliosService.create(userId, createPortfolioInput);
  }

  @Mutation(() => IntroductionPortfolios)
  introductionCreatePortfolios(
    @GetCurrentUserId() userId: string,
    @Args('data')
    introductionCreatePortfoliosInput: IntroductionCreatePortfoliosInput,
  ) {
    return this.portfoliosService.introductionCreatePortfolios(
      userId,
      introductionCreatePortfoliosInput,
    );
  }

  @Query(() => [Portfolio])
  portfolios(@GetCurrentUserId() userId: string) {
    return this.portfoliosService.findAll(userId);
  }

  @Query(() => Portfolio)
  portfolio(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
  ) {
    return this.portfoliosService.findOne(userId, uuid);
  }

  @Mutation(() => Portfolio)
  updatePortfolio(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('data')
    updatePortfolioInput: UpdatePortfolioInput,
  ) {
    return this.portfoliosService.update(userId, uuid, updatePortfolioInput);
  }

  @Mutation(() => Portfolio)
  deletePortfolio(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
  ) {
    return this.portfoliosService.delete(userId, uuid);
  }
}
