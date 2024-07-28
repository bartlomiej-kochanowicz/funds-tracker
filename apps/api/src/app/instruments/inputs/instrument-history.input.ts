import { InputType, Field } from "@nestjs/graphql";
import { IsDate, IsOptional, IsString } from "class-validator";

@InputType()
export class InstrumentHistoryInput {
	@IsString()
	@Field(() => String, { description: "Symbol" })
	symbol: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { description: "Period", nullable: true })
	period?: "1d" | "1w" | "1m";

	@IsDate()
	@Field(() => Date, { description: "From" })
	from: Date;

	@IsDate()
	@IsOptional()
	@Field(() => Date, { description: "To", nullable: true })
	to?: Date;
}
