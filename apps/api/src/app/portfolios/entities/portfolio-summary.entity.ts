import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class MarketValueItem {
	@Field(() => String, { description: "Symbol" })
	symbol: string;

	@Field(() => Number, { description: "Cumulative deposited cash." })
	value: number;
}

@ObjectType()
class PortfolioSummaryItem {
	@Field(() => Date, { description: "Date" })
	date: Date;

	@Field(() => [MarketValueItem], { description: "Market values." })
	marketValues: MarketValueItem[];

	@Field(() => Number, { description: "Cumulative deposited cash." })
	cash: number;
}

@ObjectType()
export class PortfolioSummary {
	@Field(() => [PortfolioSummaryItem], { description: "Portfolio summary data." })
	data: PortfolioSummaryItem[];
}
