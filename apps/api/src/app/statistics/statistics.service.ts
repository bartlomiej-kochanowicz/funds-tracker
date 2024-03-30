import { Injectable } from "@nestjs/common";
import { PortfolioSummary } from "./entities";

@Injectable()
export class StatisticsService {
	portfolioSummary(userId: string, portfolioUuid: string): PortfolioSummary {
		return {
			data: [],
		};
	}
}
