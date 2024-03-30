import { Args, Query, Resolver } from "@nestjs/graphql";
import { StatisticsService } from "./statistics.service";
import { GetCurrentUserId } from "@src/decorators/get-current-user-id.decorator";
import { PortfolioSummary } from "./entities";

@Resolver()
export class StatisticsResolver {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Query(() => PortfolioSummary, { description: "Get portfolio summary data." })
	portfolioSummary(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => String }) uuid: string,
	): PortfolioSummary {
		return this.statisticsService.portfolioSummary(userId, uuid);
	}
}
