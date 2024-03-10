import { InputType, Field } from "@nestjs/graphql";
import { Currency, InstrumentType } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

@InputType()
export class InstrumentCreateInput {
	@IsString()
	@Field(() => String, { description: "Code" })
	code: string;

	@IsString()
	@Field(() => String, { description: "Exchange" })
	exchange: string;

	@IsString()
	@Field(() => String, { description: "Name" })
	name: string;

	@IsEnum(InstrumentType)
	@Field(() => InstrumentType, { description: "Type" })
	type: InstrumentType;

	@IsEnum(Currency)
	@Field(() => Currency, { description: "Instrument currency" })
	currency: Currency;
}
