import { InputType, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class InstrumentCreateInput {
	@IsString()
	@Field(() => String, { description: "Symbol" })
	symbol: string;

	@IsString()
	@Field(() => String, { description: "Name" })
	name: string;

	@Field(() => String, { description: "Instrument currency" })
	currency: string;
}
