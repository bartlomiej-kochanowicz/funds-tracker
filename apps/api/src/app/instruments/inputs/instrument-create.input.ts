import { InputType, Field } from "@nestjs/graphql";
import { InstrumentType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

@InputType()
export class InstrumentCreateInput {
	@IsString()
	@Field(() => String, { description: "Symbol" })
	symbol: string;

	@IsString()
	@Field(() => String, { description: "Name" })
	name: string;

	@IsEnum(InstrumentType)
	@Field(() => InstrumentType, { description: "Type" })
	type: InstrumentType;

	@Field(() => String, { description: "Instrument currency" })
	currency: string;
}
