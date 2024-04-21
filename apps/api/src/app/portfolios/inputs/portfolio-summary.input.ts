import { InputType, Field, ID } from "@nestjs/graphql";
import { IsDate, IsUUID } from "class-validator";

@InputType()
export class PortfolioSummaryInput {
	@Field(() => ID, { description: "Account uuid." })
	@IsUUID()
	uuid: string;

	@IsDate()
	@Field(() => Date, { description: "From date." })
	from: Date;

	@IsDate()
	@Field(() => Date, { description: "To date." })
	to: Date;
}
