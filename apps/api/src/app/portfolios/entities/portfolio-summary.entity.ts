import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class PortfolioSummaryItem {
	@Field(() => String, { description: "Date" })
	date: string;

	@Field(() => Number, { description: "Market value." })
	marketValue: number;

	@Field(() => Number, { description: "Deposited cash." })
	cash: number;
}

@ObjectType()
export class PortfolioSummary {
	@Field(() => [PortfolioSummaryItem], { description: "Portfolio summary data." })
	data: PortfolioSummaryItem[];
}
