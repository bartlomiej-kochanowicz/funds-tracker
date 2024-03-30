import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@InputType()
export class PortfolioSummaryInput {
	@Field(() => ID, { description: "Account uuid." })
	@IsUUID()
	uuid: string;

	@IsString()
	@Field(() => String, { description: "Time frame." })
	timeFrame: "1d" | "1w" | "1m" | "3m" | "6m" | "1y" | "5y";

	@IsString()
	@Field(() => Date, { description: "From date." })
	from: Date;

	@IsString()
	@Field(() => Date, { description: "To date." })
	to: Date;
}
