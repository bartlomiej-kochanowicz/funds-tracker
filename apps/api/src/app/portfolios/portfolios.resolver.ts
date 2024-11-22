import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { IntroductionPortfolios, Portfolio, PortfolioDelete } from "./entities";
import {
	PortfolioCreateInput,
	PortfolioUpdateInput,
	IntroductionPortfolioCreatesInput,
} from "./inputs";
import { PortfoliosService } from "./portfolios.service";

@Resolver(() => Portfolio)
export class PortfoliosResolver {
	constructor(private readonly portfoliosService: PortfoliosService) {}

	@Mutation(() => Portfolio)
	portfolioCreate(
		/* @GetCurrentUserId() userId: string, */
		@Args("data")
		portfolioCreateInput: PortfolioCreateInput,
	) {
		return this.portfoliosService.create("", portfolioCreateInput);
	}

	@Mutation(() => IntroductionPortfolios)
	introductionPortfolioCreates(
		/* @GetCurrentUserId() userId: string, */
		@Args("data")
		introductionPortfolioCreatesInput: IntroductionPortfolioCreatesInput,
	) {
		return this.portfoliosService.introductionPortfolioCreates(
			"",
			introductionPortfolioCreatesInput,
		);
	}

	@Query(() => [Portfolio])
	portfolios(/* @GetCurrentUserId() userId: string */) {
		return this.portfoliosService.findAll("");
	}

	@Query(() => Portfolio)
	portfolio(
		/* @GetCurrentUserId() userId: string, */
		@Args("uuid", { type: () => String }) uuid: string,
	) {
		return this.portfoliosService.findOne("", uuid);
	}

	@Mutation(() => Portfolio)
	portfolioUpdate(
		/* @GetCurrentUserId() userId: string, */
		@Args("uuid", { type: () => String }) uuid: string,
		@Args("data")
		portfolioUpdateInput: PortfolioUpdateInput,
	) {
		return this.portfoliosService.update("", uuid, portfolioUpdateInput);
	}

	@Mutation(() => PortfolioDelete)
	portfolioDelete(
		/* @GetCurrentUserId() userId: string, */
		@Args("uuid", { type: () => String }) uuid: string,
	) {
		return this.portfoliosService.delete("", uuid);
	}

	/* @Query(() => PortfolioSummary, { description: "Get portfolio summary data." })
	portfolioSummary(
		@GetCurrentUserId() userId: string,
		@Args("data")
		portfolioSummaryInput: PortfolioSummaryInput,
	): Promise<PortfolioSummary> {
		return this.portfoliosService.portfolioSummary(userId, portfolioSummaryInput);
	} */
}
