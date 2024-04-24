import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class PortfolioSummaryItem {
	@Field(() => Date, { description: "Date" })
	date: Date;

	@Field(() => Number, { description: "Market value." })
	marketValue: number;

	@Field(() => Number, { description: "Cumulative deposited cash." })
	cumulativeCash: number;
}

@ObjectType()
export class PortfolioSummary {
	@Field(() => [PortfolioSummaryItem], { description: "Portfolio summary data." })
	data: PortfolioSummaryItem[];
}
