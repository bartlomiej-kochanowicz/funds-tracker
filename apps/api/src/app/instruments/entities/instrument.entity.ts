import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Currency, InstrumentType } from "@prisma/client";
import { IsEnum, IsString, IsUUID } from "class-validator";

@ObjectType()
export class Instrument {
	@IsUUID()
	@Field(() => ID, { description: "Instrument uuid." })
	uuid: string;

	@IsString()
	@Field(() => String, { description: "Code" })
	codeExchange: string;

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
