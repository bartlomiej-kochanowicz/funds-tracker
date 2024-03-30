import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { IntroductionPortfolios, Portfolio, PortfolioDelete, PortfolioSummary } from "./entities";
import {
	PortfolioCreateInput,
	PortfolioUpdateInput,
	IntroductionPortfolioCreatesInput,
	PortfolioSummaryInput,
} from "./inputs";
import { PortfoliosService } from "./portfolios.service";

@Resolver(() => Portfolio)
export class PortfoliosResolver {
	constructor(private readonly portfoliosService: PortfoliosService) {}

	@Mutation(() => Portfolio)
	portfolioCreate(
		@GetCurrentUserId() userId: string,
		@Args("data")
		portfolioCreateInput: PortfolioCreateInput,
	) {
		return this.portfoliosService.create(userId, portfolioCreateInput);
	}

	@Mutation(() => IntroductionPortfolios)
	introductionPortfolioCreates(
		@GetCurrentUserId() userId: string,
		@Args("data")
		introductionPortfolioCreatesInput: IntroductionPortfolioCreatesInput,
	) {
		return this.portfoliosService.introductionPortfolioCreates(
			userId,
			introductionPortfolioCreatesInput,
		);
	}

	@Query(() => [Portfolio])
	portfolios(@GetCurrentUserId() userId: string) {
		return this.portfoliosService.findAll(userId);
	}

	@Query(() => Portfolio)
	portfolio(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => String }) uuid: string,
	) {
		return this.portfoliosService.findOne(userId, uuid);
	}

	@Mutation(() => Portfolio)
	portfolioUpdate(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => String }) uuid: string,
		@Args("data")
		portfolioUpdateInput: PortfolioUpdateInput,
	) {
		return this.portfoliosService.update(userId, uuid, portfolioUpdateInput);
	}

	@Mutation(() => PortfolioDelete)
	portfolioDelete(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => String }) uuid: string,
	) {
		return this.portfoliosService.delete(userId, uuid);
	}

	@Query(() => PortfolioSummary, { description: "Get portfolio summary data." })
	portfolioSummary(
		@GetCurrentUserId() userId: string,
		@Args("data")
		portfolioSummaryInput: PortfolioSummaryInput,
	): Promise<PortfolioSummary> {
		return this.portfoliosService.portfolioSummary(userId, portfolioSummaryInput);
	}
}
