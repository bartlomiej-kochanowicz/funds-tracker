import { InputType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class InstrumentHistoryInput {
	@IsString()
	@Field(() => String, { description: "Code" })
	code: string;

	@IsString()
	@Field(() => String, { description: "Exchange" })
	exchange: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { description: "Period", nullable: true })
	period?: "1d" | "1w" | "1m";

	@IsString()
	@Field(() => String, { description: "From" })
	from: `${string}-${string}-${string}`;

	@IsString()
	@IsOptional()
	@Field(() => String, { description: "To", nullable: true })
	to?: `${string}-${string}-${string}`;
}
